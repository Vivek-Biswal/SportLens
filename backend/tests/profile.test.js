/**
 * Module 9 — Performance Profile Tests
 */

require('dotenv').config();
const http = require('http');
const app = require('../server');
const { clearUsers } = require('../models/User');
const { athletesStore, Athlete } = require('../models/Athlete');
const { clearAssessments, assessmentsStore, Assessment } = require('../models/Assessment');
const { clearAttempts, attemptsStore, Attempt } = require('../models/Attempt');
const { profilesStore } = require('../models/PerformanceProfile');

const TEST_PORT = 5103;
let server;
let passed = 0;
let failed = 0;
const results = [];

// Tokens & IDs
let athleteToken = '';
let otherAthleteToken = '';
let coachToken = '';
let athleteIdFull = '';
let athleteIdPartial = '';
let athleteIdEmpty = '';

// ─── Test Helpers ────────────────────────────────────────────────────────────

function request(method, path, body = null, token = null) {
  return new Promise((resolve, reject) => {
    const headers = { 'Content-Type': 'application/json' };
    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    }

    const options = {
      hostname: 'localhost',
      port: TEST_PORT,
      path,
      method,
      headers
    };

    const req = http.request(options, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        try {
          resolve({ status: res.statusCode, body: JSON.parse(data) });
        } catch {
          resolve({ status: res.statusCode, body: data });
        }
      });
    });

    req.on('error', reject);
    if (body) req.write(JSON.stringify(body));
    req.end();
  });
}

function assert(testName, condition) {
  if (condition) {
    passed++;
    results.push({ name: testName, status: 'PASS' });
  } else {
    failed++;
    results.push({ name: testName, status: 'FAIL' });
    console.error(`  ✗ FAIL: ${testName}`);
  }
}

// ─── Setup Data Manually ─────────────────────────────────────────────────────

async function setup() {
  clearUsers();
  clearAssessments();
  clearAttempts();
  athletesStore.length = 0;
  profilesStore.length = 0;

  // 1. Auth setup
  const r1 = await request('POST', '/api/auth/register', { name: 'Full Athlete', email: 'full@test.com', password: 'Password123', role: 'ATHLETE' });
  athleteToken = r1.body.token;
  athleteIdFull = r1.body.user.id;
  athletesStore.push(new Athlete({ id: athleteIdFull, name: 'Full Athlete' }));

  const r2 = await request('POST', '/api/auth/register', { name: 'Partial Athlete', email: 'partial@test.com', password: 'Password123', role: 'ATHLETE' });
  otherAthleteToken = r2.body.token;
  athleteIdPartial = r2.body.user.id;
  athletesStore.push(new Athlete({ id: athleteIdPartial, name: 'Partial Athlete' }));

  const r3 = await request('POST', '/api/auth/register', { name: 'Empty Athlete', email: 'empty@test.com', password: 'Password123', role: 'ATHLETE' });
  athleteIdEmpty = r3.body.user.id;
  athletesStore.push(new Athlete({ id: athleteIdEmpty, name: 'Empty Athlete' }));

  const r4 = await request('POST', '/api/auth/register', { name: 'Profile Coach', email: 'coach@test.com', password: 'Password123', role: 'COACH' });
  coachToken = r4.body.token;

  // 2. Setup Assessments & Attempts

  // Full Athlete (Speed: HIGH <3.8, Explosiveness: HIGH >=50, Agility: HIGH <=10.0 -> PROMISING)
  const a1 = new Assessment({ id: 'asm_f_sprint', athleteId: athleteIdFull, testType: 'sprint', status: 'completed' });
  const a2 = new Assessment({ id: 'asm_f_vjump', athleteId: athleteIdFull, testType: 'vertical_jump', status: 'completed' });
  const a3 = new Assessment({ id: 'asm_f_agility', athleteId: athleteIdFull, testType: 'agility', status: 'completed' });
  assessmentsStore.push(a1, a2, a3);
  attemptsStore.push(new Attempt({ id: 'atm_f_1', assessmentId: a1.id, attemptNumber: 1, result: 3.5, confidence: 0.9, status: 'valid' })); // Speed HIGH
  attemptsStore.push(new Attempt({ id: 'atm_f_2', assessmentId: a2.id, attemptNumber: 1, result: 55, confidence: 0.9, status: 'valid' })); // Explosiveness HIGH
  attemptsStore.push(new Attempt({ id: 'atm_f_3', assessmentId: a3.id, attemptNumber: 1, result: 9.5, confidence: 0.9, status: 'valid' })); // Agility HIGH

  // Partial Athlete (Only Sprint)
  const p1 = new Assessment({ id: 'asm_p_sprint', athleteId: athleteIdPartial, testType: 'sprint', status: 'completed' });
  assessmentsStore.push(p1);
  attemptsStore.push(new Attempt({ id: 'atm_p_1', assessmentId: p1.id, attemptNumber: 1, result: 4.0, confidence: 0.8, status: 'valid' })); // Speed MODERATE

  // Empty Athlete has no assessments/attempts.
}

// ─── Test Suites ─────────────────────────────────────────────────────────────

async function testCompleteProfile() {
  console.log('\n── Complete Profile Tests ──');

  const r1 = await request('GET', `/api/athletes/${athleteIdFull}/profile`, null, athleteToken);
  assert('GET /profile returns 200', r1.status === 200);
  assert('Response has success=true', r1.body.success === true);
  
  const profile = r1.body.profile;
  assert('Speed correctly mapped and categorized', profile.speed.value === 3.5 && profile.speed.category === 'HIGH');
  assert('Explosiveness correctly mapped and categorized', profile.explosiveness.value === 55 && profile.explosiveness.category === 'HIGH');
  assert('Agility correctly mapped and categorized', profile.agility.value === 9.5 && profile.agility.category === 'HIGH');
  assert('Overall category is derived as PROMISING', profile.overall_category === 'PROMISING');
  assert('Overall confidence is aggregated', profile.overall_confidence === 0.9);
  assert('Recommendation string is populated', !!profile.recommendation);
  
  // Verify Database Persistence
  assert('Profile is stored in profilesStore', profilesStore.some(p => p.athleteId === athleteIdFull));
}

async function testPartialProfile() {
  console.log('\n── Partial Profile Tests ──');

  const r1 = await request('GET', `/api/athletes/${athleteIdPartial}/profile`, null, otherAthleteToken);
  const profile = r1.body.profile;

  assert('Partial dimension resolved (Speed = MODERATE)', profile.speed.category === 'MODERATE');
  assert('Missing dimension is INSUFFICIENT_DATA (Explosiveness)', profile.explosiveness.category === 'INSUFFICIENT_DATA');
  assert('Missing dimension is INSUFFICIENT_DATA (Agility)', profile.agility.category === 'INSUFFICIENT_DATA');
  
  assert('Overall category protects against partial data -> INSUFFICIENT_DATA', profile.overall_category === 'INSUFFICIENT_DATA');
  assert('Overall confidence scales correctly', profile.overall_confidence === 0.8);
}

async function testEmptyProfile() {
  console.log('\n── Empty Profile Tests ──');

  const r1 = await request('GET', `/api/athletes/${athleteIdEmpty}/profile`, null, coachToken);
  const profile = r1.body.profile;

  assert('Speed is INSUFFICIENT_DATA', profile.speed.category === 'INSUFFICIENT_DATA');
  assert('Explosiveness is INSUFFICIENT_DATA', profile.explosiveness.category === 'INSUFFICIENT_DATA');
  assert('Overall is INSUFFICIENT_DATA', profile.overall_category === 'INSUFFICIENT_DATA');
  assert('Confidence is 0', profile.overall_confidence === 0);
}

async function testAuthorization() {
  console.log('\n── Authorization Tests ──');

  // Cross-athlete
  const r1 = await request('GET', `/api/athletes/${athleteIdFull}/profile`, null, otherAthleteToken);
  assert('Cross-athlete access returns 403', r1.status === 403);
  
  // Unauthenticated
  const r2 = await request('GET', `/api/athletes/${athleteIdFull}/profile`);
  assert('Unauthenticated access returns 401', r2.status === 401);
}

// ─── Runner ──────────────────────────────────────────────────────────────────

async function runTests() {
  server = app.listen(TEST_PORT, async () => {
    console.log(`\n[Test Runner] Server started on port ${TEST_PORT}`);
    
    try {
      await setup();
      await testCompleteProfile();
      await testPartialProfile();
      await testEmptyProfile();
      await testAuthorization();
    } catch (error) {
      console.error('\n[Test Runner] Unexpected error:', error);
      failed++;
    }

    // Summary
    console.log('\n═══════════════════════════════════════════');
    console.log(` Results: ${passed} passed, ${failed} failed, ${passed + failed} total`);
    console.log('═══════════════════════════════════════════');

    if (failed > 0) {
      console.log('\nFailed tests:');
      results.filter(r => r.status === 'FAIL').forEach(r => {
        console.log(`  ✗ ${r.name}`);
      });
    }

    server.close(() => {
      process.exit(failed > 0 ? 1 : 0);
    });
  });
}

runTests();
