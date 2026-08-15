/**
 * Module 16 — Database Integrity Tests
 * 
 * Verifies that the mock in-memory stores and services enforce DB-level constraints
 * such as uniqueness, 1-to-1 relationships, max attempts, and orphan protection.
 */

const { clearUsers, usersStore, createUser, findByEmail } = require('../models/User');
const { clearAthletes, athletesStore, Athlete } = require('../models/Athlete');
const { clearCoaches, coachesStore } = require('../models/Coach');
const { clearAssessments, assessmentsStore } = require('../models/Assessment');
const { clearAttempts, attemptsStore } = require('../models/Attempt');
const { clearConditions, conditionsStore, AssessmentCondition } = require('../models/AssessmentCondition');
const { clearProfiles, profilesStore } = require('../models/PerformanceProfile');
const { clearShortlists, shortlistsStore } = require('../models/Shortlist');

const authService = require('../services/authService');
const athleteService = require('../services/athleteService');
const coachService = require('../services/coachService');
const assessmentService = require('../services/assessmentService');
const assessmentConditionService = require('../services/assessmentConditionService');
const profileService = require('../services/profileService');
const shortlistService = require('../services/shortlistService');

let passed = 0;
let failed = 0;

// ─── Test Helpers ────────────────────────────────────────────────────────────

function assert(testName, condition) {
  if (condition) {
    passed++;
  } else {
    failed++;
    console.error(`  ✗ FAIL: ${testName}`);
  }
}

function expectToThrow(testName, fn, expectedErrorCode) {
  try {
    fn();
    failed++;
    console.error(`  ✗ FAIL: ${testName} (Did not throw)`);
  } catch (error) {
    if (error.code === expectedErrorCode) {
      passed++;
    } else {
      failed++;
      console.error(`  ✗ FAIL: ${testName} (Threw wrong error: ${error.code || error.message}, expected: ${expectedErrorCode})`);
    }
  }
}

// ─── Setup ───────────────────────────────────────────────────────────────────

function setup() {
  clearUsers();
  clearAthletes();
  clearCoaches();
  clearAssessments();
  clearAttempts();
  clearConditions();
  clearProfiles();
  clearShortlists();
}

// ─── Tests ───────────────────────────────────────────────────────────────────

async function testUserConstraints() {
  console.log('\n── User Constraints ──');
  
  const res1 = await authService.register({ name: 'A', email: 'u1@test.com', password: 'Password123', role: 'ATHLETE' });
  assert('User created successfully', res1.status === 201 && usersStore.length === 1);

  // Duplicate email check - authService returns a response object, does NOT throw
  const res2 = await authService.register({ name: 'B', email: 'u1@test.com', password: 'Password123', role: 'COACH' });
  assert('Duplicate email rejected', res2.status === 409 && res2.body.error === 'EMAIL_ALREADY_EXISTS');
  assert('Duplicate email did not create second user', usersStore.length === 1);
  
  // Password never stored in plaintext
  assert('Password stored as hash, not plaintext', usersStore[0].passwordHash !== 'Password123');
  
  // toSafeObject does not expose passwordHash
  const safeObj = usersStore[0].toSafeObject();
  assert('toSafeObject does not expose passwordHash', safeObj.passwordHash === undefined);
}

async function testAthleteConstraints() {
  console.log('\n── Athlete Constraints ──');
  const userA = usersStore[0];

  // 1-to-1 enforcement
  const ath1 = athleteService.createAthlete({ name: 'Ath A', age: 15, gender: 'Male', sport: 'Tennis' }, userA);
  assert('Athlete created', athletesStore.length === 1);
  assert('Athlete linked to correct user', ath1.userId === userA.id);

  expectToThrow('Duplicate athlete profile prevented (one-per-user)', () => {
    athleteService.createAthlete({ name: 'Ath A2', age: 16, gender: 'Male', sport: 'Tennis' }, userA);
  }, 'ATHLETE_PROFILE_EXISTS');

  // Patch athlete ID to match user ID for downstream authorization compatibility
  // (This matches the convention used by the API routes where athlete.id === user.id)
  ath1.id = userA.id;
}

async function testCoachConstraints() {
  console.log('\n── Coach Constraints ──');
  const userC = await authService.register({ name: 'C', email: 'c1@test.com', password: 'Password123', role: 'COACH' });
  const coachUser = usersStore.find(u => u.email === 'c1@test.com');

  // 1-to-1 enforcement
  const coach1 = coachService.getOrCreateCoachProfile(coachUser);
  assert('Coach created', coachesStore.length === 1);

  // Getting again should NOT create a duplicate
  const coach2 = coachService.getOrCreateCoachProfile(coachUser);
  assert('Duplicate coach profile prevented (idempotent getOrCreate)', coachesStore.length === 1);
  assert('Same coach object returned', coach1.id === coach2.id);
}

async function testAssessmentConstraints() {
  console.log('\n── Assessment Constraints ──');
  
  expectToThrow('Invalid athlete relationship rejected', () => {
    assessmentService.create({ athleteId: 'invalid_id', testType: 'sprint' });
  }, 'ATHLETE_NOT_FOUND');

  // Use the user.id which now equals athlete.id for authorization compat
  const athId = usersStore[0].id;
  const asm = assessmentService.create({ athleteId: athId, testType: 'sprint' });
  assert('Assessment persists correctly', assessmentsStore.length === 1);
  assert('Assessment linked to correct athlete', asm.athleteId === athId);
}

async function testAttemptConstraints() {
  console.log('\n── Attempt Constraints ──');
  const asmId = assessmentsStore[0].id;
  const userA = usersStore[0]; // user.id === athlete.id after our patch

  // Fill up to max
  assessmentService.createAttempt(asmId, userA);
  assessmentService.createAttempt(asmId, userA);
  const att3 = assessmentService.createAttempt(asmId, userA);

  assert('Attempt belongs to correct assessment', att3.assessmentId === asmId);
  assert('Attempt increments sequentially', att3.attemptNumber === 3);

  expectToThrow('Maximum-attempt logic remains compatible', () => {
    assessmentService.createAttempt(asmId, userA);
  }, 'MAX_ATTEMPTS_REACHED');
  
  // Verify attempt numbers are unique within an assessment
  const attemptNumbers = attemptsStore.filter(a => a.assessmentId === asmId).map(a => a.attemptNumber);
  const uniqueNumbers = new Set(attemptNumbers);
  assert('Duplicate (assessment_id, attempt_number) prevented by sequential logic', uniqueNumbers.size === attemptNumbers.length);
}

async function testAssessmentConditionConstraints() {
  console.log('\n── Assessment Condition Constraints ──');
  const asmId = assessmentsStore[0].id;
  const userA = usersStore[0];

  assessmentConditionService.upsertConditions(asmId, { device: 'Cam1' }, userA);
  assert('Condition created', conditionsStore.length === 1);

  // Upsert overwrites, it doesn't duplicate
  assessmentConditionService.upsertConditions(asmId, { device: 'Cam2' }, userA);
  assert('Duplicate conditions prevented (one-per-assessment via upsert)', conditionsStore.length === 1);
  assert('Condition updated correctly', conditionsStore[0].device === 'Cam2');
}

async function testPerformanceProfileConstraints() {
  console.log('\n── Performance Profile Constraints ──');
  const athId = athletesStore[0].id;
  const userA = usersStore[0];

  profileService.generateProfile(athId, userA);
  assert('Profile generated', profilesStore.length === 1);

  // Generate again should overwrite/update, not duplicate
  profileService.generateProfile(athId, userA);
  assert('Duplicate current profile prevented (upsert)', profilesStore.length === 1);
}

async function testShortlistConstraints() {
  console.log('\n── Shortlist Constraints ──');
  const athId = athletesStore[0].id;
  const coachUser = usersStore.find(u => u.role === 'COACH');

  shortlistService.addAthleteToShortlist(athId, coachUser);
  assert('Shortlist created', shortlistsStore.length === 1);

  expectToThrow('Duplicate (coach_id, athlete_id) rejected', () => {
    shortlistService.addAthleteToShortlist(athId, coachUser);
  }, 'ATHLETE_ALREADY_SHORTLISTED');

  // Deletion logic
  shortlistService.removeAthleteFromShortlist(athId, coachUser);
  assert('Shortlist removed', shortlistsStore.length === 0);

  // Verify deletion does NOT cascade destructively
  assert('Shortlist deletion does not delete athlete', athletesStore.length === 1);
  assert('Shortlist deletion does not delete assessments', assessmentsStore.length === 1);
  assert('Shortlist deletion does not delete attempts', attemptsStore.length === 3);
  assert('Shortlist deletion does not delete profile', profilesStore.length === 1);
  assert('Shortlist deletion does not delete conditions', conditionsStore.length === 1);
}

async function testForeignKeyRelationships() {
  console.log('\n── Foreign Key Relationships ──');
  
  // User -> Athlete
  const athlete = athletesStore[0];
  const userForAthlete = usersStore.find(u => u.id === athlete.userId);
  assert('Athlete.userId → User.id relationship valid', userForAthlete !== undefined);
  
  // User -> Coach
  const coach = coachesStore[0];
  const userForCoach = usersStore.find(u => u.id === coach.userId);
  assert('Coach.userId → User.id relationship valid', userForCoach !== undefined);
  
  // Athlete -> Assessment
  const asm = assessmentsStore[0];
  const athleteForAsm = athletesStore.find(a => a.id === asm.athleteId);
  assert('Assessment.athleteId → Athlete.id relationship valid', athleteForAsm !== undefined);
  
  // Assessment -> Attempt
  const att = attemptsStore[0];
  const asmForAtt = assessmentsStore.find(a => a.id === att.assessmentId);
  assert('Attempt.assessmentId → Assessment.id relationship valid', asmForAtt !== undefined);
  
  // Assessment -> Condition
  const cond = conditionsStore[0];
  const asmForCond = assessmentsStore.find(a => a.id === cond.assessmentId);
  assert('AssessmentCondition.assessmentId → Assessment.id relationship valid', asmForCond !== undefined);
  
  // Athlete -> Profile
  const prof = profilesStore[0];
  const athleteForProf = athletesStore.find(a => a.id === prof.athleteId);
  assert('PerformanceProfile.athleteId → Athlete.id relationship valid', athleteForProf !== undefined);
}

// ─── Runner ──────────────────────────────────────────────────────────────────

async function runTests() {
  console.log('\n[Test Runner] Database Integrity Tests');
  try {
    setup();
    await testUserConstraints();
    await testAthleteConstraints();
    await testCoachConstraints();
    await testAssessmentConstraints();
    await testAttemptConstraints();
    await testAssessmentConditionConstraints();
    await testPerformanceProfileConstraints();
    await testShortlistConstraints();
    await testForeignKeyRelationships();
  } catch (error) {
    console.error('\n[Test Runner] Unexpected error:', error);
    failed++;
  }

  console.log('\n═══════════════════════════════════════════');
  console.log(` Results: ${passed} passed, ${failed} failed, ${passed + failed} total`);
  console.log('═══════════════════════════════════════════');

  process.exit(failed > 0 ? 1 : 0);
}

runTests();
