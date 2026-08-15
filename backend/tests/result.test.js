/**
 * Module 8 — Final Test Result Tests
 */

require('dotenv').config();
const http = require('http');
const app = require('../server');
const { clearUsers } = require('../models/User');
const { athletesStore, Athlete } = require('../models/Athlete');
const { clearAssessments, assessmentsStore, Assessment } = require('../models/Assessment');
const { clearAttempts, attemptsStore, Attempt } = require('../models/Attempt');

const TEST_PORT = 5102;
let server;
let passed = 0;
let failed = 0;
const results = [];

// Tokens & IDs
let athleteToken = '';
let otherAthleteToken = '';
let coachToken = '';
let athleteUserId = '';

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

  // 1. Auth setup
  const r1 = await request('POST', '/api/auth/register', {
    name: 'Result Athlete', email: 'result_athlete@test.com', password: 'Password123', role: 'ATHLETE'
  });
  athleteToken = r1.body.token;
  athleteUserId = r1.body.user.id;

  const r2 = await request('POST', '/api/auth/register', {
    name: 'Other Athlete', email: 'other_result@test.com', password: 'Password123', role: 'ATHLETE'
  });
  otherAthleteToken = r2.body.token;

  const r3 = await request('POST', '/api/auth/register', {
    name: 'Result Coach', email: 'result_coach@test.com', password: 'Password123', role: 'COACH'
  });
  coachToken = r3.body.token;

  athletesStore.push(new Athlete({ id: athleteUserId, name: 'Result Athlete', email: 'result_athlete@test.com', sport: 'Football' }));

  // 2. Setup Assessments & Attempts Manually for strict testing

  // A. Vertical Jump (MAX rule: 42, 45, 43 -> Expect 45)
  const asm1 = new Assessment({ id: 'asm_vjump', athleteId: athleteUserId, testType: 'vertical_jump', status: 'completed' });
  assessmentsStore.push(asm1);
  attemptsStore.push(new Attempt({ id: 'atm_1_1', assessmentId: asm1.id, attemptNumber: 1, result: 42, status: 'valid' }));
  attemptsStore.push(new Attempt({ id: 'atm_1_2', assessmentId: asm1.id, attemptNumber: 2, result: 45, status: 'valid' }));
  attemptsStore.push(new Attempt({ id: 'atm_1_3', assessmentId: asm1.id, attemptNumber: 3, result: 43, status: 'valid' }));

  // B. Sprint (MIN rule: 3.80, 3.52, 3.65 -> Expect 3.52)
  const asm2 = new Assessment({ id: 'asm_sprint', athleteId: athleteUserId, testType: 'sprint', status: 'completed' });
  assessmentsStore.push(asm2);
  attemptsStore.push(new Attempt({ id: 'atm_2_1', assessmentId: asm2.id, attemptNumber: 1, result: 3.80, status: 'valid' }));
  attemptsStore.push(new Attempt({ id: 'atm_2_2', assessmentId: asm2.id, attemptNumber: 2, result: 3.52, status: 'valid' }));
  attemptsStore.push(new Attempt({ id: 'atm_2_3', assessmentId: asm2.id, attemptNumber: 3, result: 3.65, status: 'valid' }));

  // C. Invalid attempts handling (MAX rule: 40(invalid), 43(valid), 41(valid) -> Expect 43)
  const asm3 = new Assessment({ id: 'asm_invalid_vjump', athleteId: athleteUserId, testType: 'vertical_jump', status: 'completed' });
  assessmentsStore.push(asm3);
  attemptsStore.push(new Attempt({ id: 'atm_3_1', assessmentId: asm3.id, attemptNumber: 1, result: 40, status: 'invalid' })); // better but invalid
  attemptsStore.push(new Attempt({ id: 'atm_3_2', assessmentId: asm3.id, attemptNumber: 2, result: 43, status: 'valid' }));
  attemptsStore.push(new Attempt({ id: 'atm_3_3', assessmentId: asm3.id, attemptNumber: 3, result: 41, status: 'valid' }));

  // D. No valid attempts (All invalid -> Expect no final result)
  const asm4 = new Assessment({ id: 'asm_no_valid', athleteId: athleteUserId, testType: 'sprint', status: 'completed' });
  assessmentsStore.push(asm4);
  attemptsStore.push(new Attempt({ id: 'atm_4_1', assessmentId: asm4.id, attemptNumber: 1, result: 3.0, status: 'invalid' }));
  attemptsStore.push(new Attempt({ id: 'atm_4_2', assessmentId: asm4.id, attemptNumber: 2, result: 3.1, status: 'invalid' }));

  // E. Partial attempts (42 valid -> Expect 42)
  const asm5 = new Assessment({ id: 'asm_partial', athleteId: athleteUserId, testType: 'agility', status: 'in_progress' });
  assessmentsStore.push(asm5);
  attemptsStore.push(new Attempt({ id: 'atm_5_1', assessmentId: asm5.id, attemptNumber: 1, result: 42, status: 'valid' }));
}

// ─── Test Suites ─────────────────────────────────────────────────────────────

async function testFinalResultsExtraction() {
  console.log('\n── Final Results Extraction Tests ──');

  const r1 = await request('GET', `/api/athletes/${athleteUserId}/results`, null, athleteToken);
  assert('GET /athletes/:id/results returns 200', r1.status === 200);
  assert('Response has success=true', r1.body.success === true);
  
  const resultsArr = r1.body.results;
  
  // Note: Only 4 assessments should yield results because one (asm_no_valid) has 0 valid attempts.
  assert('Only assessments with valid attempts yield final results', resultsArr.length === 4);

  const resVJump = resultsArr.find(r => r.assessment_id === 'asm_vjump');
  assert('Vertical Jump applies MAX rule correctly (45)', resVJump && resVJump.result === 45 && resVJump.attempt_number === 2);

  const resSprint = resultsArr.find(r => r.assessment_id === 'asm_sprint');
  assert('Sprint applies MIN rule correctly (3.52)', resSprint && resSprint.result === 3.52 && resSprint.attempt_number === 2);

  const resInvalidHandling = resultsArr.find(r => r.assessment_id === 'asm_invalid_vjump');
  assert('Invalid attempts are ignored (43)', resInvalidHandling && resInvalidHandling.result === 43 && resInvalidHandling.attempt_number === 2);

  const resPartial = resultsArr.find(r => r.assessment_id === 'asm_partial');
  assert('Partial attempts work correctly (42)', resPartial && resPartial.result === 42 && resPartial.attempt_number === 1);
}

async function testAuthorization() {
  console.log('\n── Authorization & Error Tests ──');

  // Cross-athlete access
  const r1 = await request('GET', `/api/athletes/${athleteUserId}/results`, null, otherAthleteToken);
  assert('Cross-athlete access returns 403', r1.status === 403);
  assert('Cross-athlete returns FORBIDDEN', r1.body.error === 'FORBIDDEN');

  // Coach access
  const r2 = await request('GET', `/api/athletes/${athleteUserId}/results`, null, coachToken);
  assert('Coach can access athlete results', r2.status === 200 && r2.body.success === true);

  // Unauthenticated
  const r3 = await request('GET', `/api/athletes/${athleteUserId}/results`);
  assert('Unauthenticated access returns 401', r3.status === 401);

  // Non-existent athlete
  const r4 = await request('GET', `/api/athletes/fake_athlete_99/results`, null, coachToken);
  assert('Non-existent athlete returns 404', r4.status === 404);
  assert('Returns ATHLETE_NOT_FOUND', r4.body.error === 'ATHLETE_NOT_FOUND');
}

// ─── Runner ──────────────────────────────────────────────────────────────────

async function runTests() {
  server = app.listen(TEST_PORT, async () => {
    console.log(`\n[Test Runner] Server started on port ${TEST_PORT}`);
    
    try {
      await setup();
      await testFinalResultsExtraction();
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
