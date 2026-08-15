/**
 * Module 14 — Athlete History Tests
 */

require('dotenv').config();
const http = require('http');
const app = require('../server');
const { clearUsers } = require('../models/User');
const { clearAthletes, athletesStore, Athlete } = require('../models/Athlete');
const { clearAssessments, assessmentsStore, Assessment } = require('../models/Assessment');
const { clearAttempts, attemptsStore, Attempt } = require('../models/Attempt');
const { clearConditions, conditionsStore, AssessmentCondition } = require('../models/AssessmentCondition');
const { clearCoaches } = require('../models/Coach');

const TEST_PORT = 5114;
let server;
let passed = 0;
let failed = 0;
const results = [];

let coachToken = '';
let athleteToken = '';
let otherAthleteToken = '';
let targetAthleteId = 'a1';

// ─── Test Helpers ────────────────────────────────────────────────────────────

function request(method, path, body = null, token = null) {
  return new Promise((resolve, reject) => {
    const headers = { 'Content-Type': 'application/json' };
    if (token) headers['Authorization'] = `Bearer ${token}`;

    const options = { hostname: 'localhost', port: TEST_PORT, path, method, headers };
    const req = http.request(options, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        try { resolve({ status: res.statusCode, body: JSON.parse(data) }); }
        catch { resolve({ status: res.statusCode, body: data }); }
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

// ─── Setup ───────────────────────────────────────────────────────────────────

async function setup() {
  clearUsers();
  clearAthletes();
  clearCoaches();
  clearAssessments();
  clearAttempts();
  clearConditions();

  // Register Coach
  const resCoach = await request('POST', '/api/auth/register', { name: 'Coach', email: 'c@test.com', password: 'Password123', role: 'COACH' });
  coachToken = resCoach.body.token;

  // Register Athlete 1
  const resAth1 = await request('POST', '/api/auth/register', { name: 'Athlete 1', email: 'a1@test.com', password: 'Password123', role: 'ATHLETE' });
  athleteToken = resAth1.body.token;
  targetAthleteId = resAth1.body.user.id;
  athletesStore.push(new Athlete({ id: targetAthleteId, userId: targetAthleteId, name: 'Athlete 1', sport: 'Athletics' }));

  // Register Athlete 2
  const resAth2 = await request('POST', '/api/auth/register', { name: 'Athlete 2', email: 'a2@test.com', password: 'Password123', role: 'ATHLETE' });
  otherAthleteToken = resAth2.body.token;
  athletesStore.push(new Athlete({ id: resAth2.body.user.id, userId: resAth2.body.user.id, name: 'Athlete 2', sport: 'Tennis' }));

  // Seed Data: 3 Assessments for Athlete 1
  // Oldest -> Newest
  const asm1 = new Assessment({ id: 'asm_vj_old', athleteId: targetAthleteId, testType: 'vertical_jump', status: 'completed', createdAt: new Date('2026-08-01') });
  const asm2 = new Assessment({ id: 'asm_vj_new', athleteId: targetAthleteId, testType: 'vertical_jump', status: 'completed', createdAt: new Date('2026-08-02') });
  const asm3 = new Assessment({ id: 'asm_sprint', athleteId: targetAthleteId, testType: 'sprint', status: 'completed', createdAt: new Date('2026-08-03') });
  
  assessmentsStore.push(asm1, asm2, asm3);

  // Attempts for asm_vj_new (Should pick MAX)
  attemptsStore.push(new Attempt({ id: 'att1', assessmentId: asm2.id, attemptNumber: 1, result: 40, unit: 'cm', confidence: 0.9, status: 'invalid' })); // invalid
  attemptsStore.push(new Attempt({ id: 'att2', assessmentId: asm2.id, attemptNumber: 2, result: 42, unit: 'cm', confidence: 0.9, status: 'valid' })); // valid
  attemptsStore.push(new Attempt({ id: 'att3', assessmentId: asm2.id, attemptNumber: 3, result: 45, unit: 'cm', confidence: 0.9, status: 'valid' })); // valid best

  // Attempts for asm_sprint (Should pick MIN)
  attemptsStore.push(new Attempt({ id: 'att4', assessmentId: asm3.id, attemptNumber: 1, result: 5.5, unit: 'sec', confidence: 0.9, status: 'valid' })); // valid
  attemptsStore.push(new Attempt({ id: 'att5', assessmentId: asm3.id, attemptNumber: 2, result: 5.1, unit: 'sec', confidence: 0.9, status: 'valid' })); // valid best

  // Condition for asm3
  conditionsStore.push(new AssessmentCondition({ id: 'cond1', assessmentId: asm3.id, device: 'Galaxy S24', surface: 'Track' }));
}

// ─── Tests ───────────────────────────────────────────────────────────────────

async function testHistoryStructureAndOrdering() {
  console.log('\n── Structure & Ordering ──');

  const r1 = await request('GET', `/api/athletes/${targetAthleteId}/history`, null, athleteToken);
  assert('History returns 200', r1.status === 200);
  assert('Returns success=true', r1.body.success === true);
  
  const history = r1.body.history;
  assert('History contains 3 assessments', history.length === 3);
  
  // Newest first check
  assert('Sorted newest first (sprint is first)', history[0].test_type === 'sprint');
  assert('Second is new vertical jump', history[1].assessment_id === 'asm_vj_new');
  assert('Third is old vertical jump', history[2].assessment_id === 'asm_vj_old');

  // Verify Performance Profile root inclusion
  assert('Includes performance_profile', r1.body.performance_profile !== undefined);
  assert('Pagination is included', r1.body.pagination.total === 3);
}

async function testFinalResultsAndAttempts() {
  console.log('\n── Final Results & Attempts ──');

  const r1 = await request('GET', `/api/athletes/${targetAthleteId}/history`, null, coachToken);
  const history = r1.body.history;

  const sprint = history.find(h => h.test_type === 'sprint');
  assert('Sprint picks MIN final result (5.1)', sprint.final_result.result === 5.1);
  assert('Sprint has condition data', sprint.conditions.device === 'Galaxy S24');

  const vjNew = history.find(h => h.assessment_id === 'asm_vj_new');
  assert('Vertical jump picks MAX valid result (45)', vjNew.final_result.result === 45);
  
  const invalidAttempt = vjNew.attempts.find(a => a.status === 'invalid');
  assert('Invalid attempt preserved in history', invalidAttempt.result === 40);

  const vjOld = history.find(h => h.assessment_id === 'asm_vj_old');
  assert('Assessment with no attempts has null final_result', vjOld.final_result === null);
  assert('Assessment with no conditions has null conditions', vjOld.conditions === null);
}

async function testFiltersAndPagination() {
  console.log('\n── Filters & Pagination ──');

  // Test type filter
  const r1 = await request('GET', `/api/athletes/${targetAthleteId}/history?test_type=vertical_jump`, null, coachToken);
  assert('Filter by vertical_jump returns 2 items', r1.body.pagination.total === 2);

  // Pagination
  const r2 = await request('GET', `/api/athletes/${targetAthleteId}/history?page=1&limit=2`, null, coachToken);
  assert('Pagination respects limit', r2.body.history.length === 2);
  assert('Pagination calculates total_pages', r2.body.pagination.total_pages === 2);
}

async function testAuthorizationAndValidation() {
  console.log('\n── Authorization & Validation ──');

  // Auth checks
  const r1 = await request('GET', `/api/athletes/${targetAthleteId}/history`, null, otherAthleteToken);
  assert('Athlete accessing another athlete history returns 403', r1.status === 403);

  const r2 = await request('GET', `/api/athletes/${targetAthleteId}/history`, null);
  assert('Unauthenticated access returns 401', r2.status === 401);

  // Empty history
  const r3 = await request('GET', `/api/athletes/nonexistent_athlete/history`, null, coachToken);
  assert('Non-existent athlete returns 404', r3.status === 404 && r3.body.error === 'ATHLETE_NOT_FOUND');
}

// ─── Runner ──────────────────────────────────────────────────────────────────

async function runTests() {
  server = app.listen(TEST_PORT, async () => {
    console.log(`\n[Test Runner] Server started on port ${TEST_PORT}`);
    
    try {
      await setup();
      await testHistoryStructureAndOrdering();
      await testFinalResultsAndAttempts();
      await testFiltersAndPagination();
      await testAuthorizationAndValidation();
    } catch (error) {
      console.error('\n[Test Runner] Unexpected error:', error);
      failed++;
    }

    console.log('\n═══════════════════════════════════════════');
    console.log(` Results: ${passed} passed, ${failed} failed, ${passed + failed} total`);
    console.log('═══════════════════════════════════════════');

    server.close(() => process.exit(failed > 0 ? 1 : 0));
  });
}

runTests();
