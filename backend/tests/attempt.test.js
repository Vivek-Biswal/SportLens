/**
 * Module 6 — Attempt Management Tests
 */

require('dotenv').config();
const http = require('http');
const app = require('../server');
const { clearUsers } = require('../models/User');
const { athletesStore, Athlete } = require('../models/Athlete');
const { clearAssessments } = require('../models/Assessment');
const { clearAttempts } = require('../models/Attempt');

const TEST_PORT = 5101;
let server;
let passed = 0;
let failed = 0;
const results = [];

// Tokens
let athleteToken = '';
let otherAthleteToken = '';
let coachToken = '';

// Ids
let athleteUserId = '';
let assessmentId = '';

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

// ─── Setup ───────────────────────────────────────────────────────────────────

async function setup() {
  clearUsers();
  clearAssessments();
  clearAttempts();
  athletesStore.length = 0;

  // 1. Register Athlete
  const r1 = await request('POST', '/api/auth/register', {
    name: 'Attempt Athlete', email: 'attempt_athlete@test.com', password: 'Password123', role: 'ATHLETE'
  });
  athleteToken = r1.body.token;
  athleteUserId = r1.body.user.id;

  // 2. Register Second Athlete (for auth tests)
  const r2 = await request('POST', '/api/auth/register', {
    name: 'Other Athlete', email: 'other_athlete@test.com', password: 'Password123', role: 'ATHLETE'
  });
  otherAthleteToken = r2.body.token;

  // 3. Register Coach
  const r3 = await request('POST', '/api/auth/register', {
    name: 'Attempt Coach', email: 'attempt_coach@test.com', password: 'Password123', role: 'COACH'
  });
  coachToken = r3.body.token;

  // 4. Create Athlete Profile
  athletesStore.push(new Athlete({
    id: athleteUserId, name: 'Attempt Athlete', email: 'attempt_athlete@test.com', sport: 'Football'
  }));

  // 5. Create Assessment
  const r4 = await request('POST', '/api/assessments', {
    athlete_id: athleteUserId,
    test_type: 'vertical_jump'
  }, athleteToken);
  assessmentId = r4.body.assessment.id;
}

// ─── Test Suites ─────────────────────────────────────────────────────────────

async function testAttemptCreationLimits() {
  console.log('\n── Attempt Creation & Limit Tests ──');

  // Attempt 1
  const r1 = await request('POST', `/api/assessments/${assessmentId}/attempt`, null, athleteToken);
  assert('Create Attempt 1 returns 201', r1.status === 201);
  assert('Attempt 1 has attempt_number 1', r1.body.attempt && r1.body.attempt.attempt_number === 1);
  assert('Attempt 1 status is pending', r1.body.attempt && r1.body.attempt.status === 'pending');

  // Attempt 2
  const r2 = await request('POST', `/api/assessments/${assessmentId}/attempt`, null, athleteToken);
  assert('Create Attempt 2 returns 201', r2.status === 201);
  assert('Attempt 2 has attempt_number 2', r2.body.attempt && r2.body.attempt.attempt_number === 2);

  // Attempt 3
  const r3 = await request('POST', `/api/assessments/${assessmentId}/attempt`, null, athleteToken);
  assert('Create Attempt 3 returns 201', r3.status === 201);
  assert('Attempt 3 has attempt_number 3', r3.body.attempt && r3.body.attempt.attempt_number === 3);

  // Attempt 4 (Should be rejected)
  const r4 = await request('POST', `/api/assessments/${assessmentId}/attempt`, null, athleteToken);
  assert('Attempt 4 is rejected with 409 Conflict', r4.status === 409);
  assert('Attempt 4 returns MAX_ATTEMPTS_REACHED', r4.body.error === 'MAX_ATTEMPTS_REACHED');
}

async function testAttemptAuthorizationAndErrors() {
  console.log('\n── Attempt Authorization & Error Tests ──');

  // Create a new fresh assessment to test other errors without hitting the max limit
  const asmRes = await request('POST', '/api/assessments', {
    athlete_id: athleteUserId,
    test_type: 'sprint'
  }, athleteToken);
  const newAssessmentId = asmRes.body.assessment.id;

  // Unauthenticated
  const r1 = await request('POST', `/api/assessments/${newAssessmentId}/attempt`);
  assert('Unauthenticated attempt creation returns 401', r1.status === 401);

  // Unauthorized Athlete (Cross-athlete access)
  const r2 = await request('POST', `/api/assessments/${newAssessmentId}/attempt`, null, otherAthleteToken);
  assert('Cross-athlete attempt creation returns 403', r2.status === 403);
  assert('Cross-athlete returns FORBIDDEN', r2.body.error === 'FORBIDDEN');

  // Coach creating attempt (valid based on current rules, coach can access all assessments)
  const r3 = await request('POST', `/api/assessments/${newAssessmentId}/attempt`, null, coachToken);
  assert('Coach can create attempt (authorized)', r3.status === 201);

  // Invalid Assessment ID
  const r4 = await request('POST', `/api/assessments/fake_id_123/attempt`, null, athleteToken);
  assert('Invalid assessment ID returns 404', r4.status === 404);
}

async function testGetAssessmentWithAttempts() {
  console.log('\n── Get Assessment With Attempts Tests ──');

  // Get the first assessment (which has 3 attempts)
  const r1 = await request('GET', `/api/assessments/${assessmentId}`, null, athleteToken);
  
  assert('GET assessment returns 200', r1.status === 200);
  assert('GET assessment includes attempts array', Array.isArray(r1.body.assessment.attempts));
  assert('GET assessment returns exactly 3 attempts', r1.body.assessment.attempts.length === 3);
  assert('Attempts contain attempt_number', r1.body.assessment.attempts[0].attempt_number === 1);
  assert('Attempts contain status', r1.body.assessment.attempts[0].status === 'pending');
}

// ─── Runner ──────────────────────────────────────────────────────────────────

async function runTests() {
  server = app.listen(TEST_PORT, async () => {
    console.log(`\n[Test Runner] Server started on port ${TEST_PORT}`);
    
    try {
      await setup();
      await testAttemptCreationLimits();
      await testAttemptAuthorizationAndErrors();
      await testGetAssessmentWithAttempts();
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
