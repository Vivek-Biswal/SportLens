/**
 * Module 4 — Assessment Management Tests
 */

require('dotenv').config();
const http = require('http');
const app = require('../server');
const { clearUsers } = require('../models/User');
const { athletesStore, Athlete } = require('../models/Athlete');
const { clearAssessments } = require('../models/Assessment');

const TEST_PORT = 5100;
let server;
let passed = 0;
let failed = 0;
const results = [];

// Tokens
let athleteToken = '';
let coachToken = '';

// Ids
let athleteUserId = '';
let coachUserId = '';
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
  athletesStore.length = 0;

  // Register Athlete User
  const r1 = await request('POST', '/api/auth/register', {
    name: 'Test Athlete', email: 'athlete@test.com', password: 'Password123', role: 'ATHLETE'
  });
  athleteToken = r1.body.token;
  athleteUserId = r1.body.user.id;

  // Register Coach User
  const r2 = await request('POST', '/api/auth/register', {
    name: 'Test Coach', email: 'coach@test.com', password: 'Password123', role: 'COACH'
  });
  coachToken = r2.body.token;
  coachUserId = r2.body.user.id;

  // Create Athlete Profile linking to Athlete User
  const athleteProfile = new Athlete({
    id: athleteUserId,
    name: 'Test Athlete',
    email: 'athlete@test.com',
    sport: 'Football'
  });
  athletesStore.push(athleteProfile);
}

// ─── Test Suites ─────────────────────────────────────────────────────────────

async function testCreateAssessment() {
  console.log('\n── Create Assessment Tests ──');

  // Valid athlete + valid test
  const r1 = await request('POST', '/api/assessments', {
    athlete_id: athleteUserId,
    test_type: 'vertical_jump'
  }, athleteToken);
  assert('Create valid assessment returns 201', r1.status === 201);
  assert('Create valid assessment has success=true', r1.body.success === true);
  assert('Status is in_progress', r1.body.assessment.status === 'in_progress');
  assert('Returns correct test_type', r1.body.assessment.test_type === 'vertical_jump');
  assert('Has created_at field', !!r1.body.assessment.created_at);
  
  assessmentId = r1.body.assessment.id;

  // Athlete does not exist
  const r2 = await request('POST', '/api/assessments', {
    athlete_id: 'fake_athlete_id',
    test_type: 'sprint'
  }, athleteToken);
  assert('Non-existent athlete returns 404', r2.status === 404);
  assert('Returns ATHLETE_NOT_FOUND', r2.body.error === 'ATHLETE_NOT_FOUND');

  // Invalid test type
  const r3 = await request('POST', '/api/assessments', {
    athlete_id: athleteUserId,
    test_type: 'random_test'
  }, athleteToken);
  assert('Invalid test type returns 400', r3.status === 400);
  assert('Returns INVALID_TEST error', r3.body.error === 'INVALID_TEST');

  // Missing athlete ID
  const r4 = await request('POST', '/api/assessments', {
    test_type: 'agility'
  }, athleteToken);
  assert('Missing athlete ID returns 400', r4.status === 400);
  
  // Missing test type
  const r5 = await request('POST', '/api/assessments', {
    athlete_id: athleteUserId
  }, athleteToken);
  assert('Missing test type returns 400', r5.status === 400);

  // Unauthenticated request
  const r6 = await request('POST', '/api/assessments', {
    athlete_id: athleteUserId,
    test_type: 'sprint'
  });
  assert('Unauthenticated returns 401', r6.status === 401);
}

async function testGetAssessments() {
  console.log('\n── Get Assessments Tests ──');

  // Add another assessment for testing list
  await request('POST', '/api/assessments', {
    athlete_id: athleteUserId,
    test_type: 'sprint'
  }, athleteToken);

  // Authenticated athlete
  const r1 = await request('GET', '/api/assessments', null, athleteToken);
  assert('Athlete fetches their own assessments', r1.status === 200 && r1.body.assessments.length === 2);

  // Authorized coach (sees all)
  const r2 = await request('GET', '/api/assessments', null, coachToken);
  assert('Coach fetches assessments', r2.status === 200 && r2.body.assessments.length === 2);

  // Unauthenticated
  const r3 = await request('GET', '/api/assessments');
  assert('Unauthenticated list returns 401', r3.status === 401);
}

async function testGetAssessmentById() {
  console.log('\n── Get Assessment By ID Tests ──');

  // Existing assessment
  const r1 = await request('GET', `/api/assessments/${assessmentId}`, null, athleteToken);
  assert('Athlete fetches their own assessment by ID', r1.status === 200 && r1.body.assessment.id === assessmentId);

  // Non-existent assessment
  const r2 = await request('GET', `/api/assessments/fake_id_123`, null, athleteToken);
  assert('Non-existent assessment returns 404', r2.status === 404);
  assert('Returns ASSESSMENT_NOT_FOUND', r2.body.error === 'ASSESSMENT_NOT_FOUND');

  // Coach fetching assessment
  const r3 = await request('GET', `/api/assessments/${assessmentId}`, null, coachToken);
  assert('Coach fetches assessment by ID', r3.status === 200 && r3.body.assessment.id === assessmentId);

  // Unauthorized data access (cross-athlete)
  // Let's create a second athlete user and try to access the first athlete's assessment
  const r4 = await request('POST', '/api/auth/register', {
    name: 'Another Athlete', email: 'another@test.com', password: 'Password123', role: 'ATHLETE'
  });
  const anotherToken = r4.body.token;
  
  const r5 = await request('GET', `/api/assessments/${assessmentId}`, null, anotherToken);
  assert('Cross-athlete access returns 403', r5.status === 403);
  assert('Returns FORBIDDEN', r5.body.error === 'FORBIDDEN');

  // Unauthenticated
  const r6 = await request('GET', `/api/assessments/${assessmentId}`);
  assert('Unauthenticated fetch by ID returns 401', r6.status === 401);
}

// ─── Runner ──────────────────────────────────────────────────────────────────

async function runTests() {
  server = app.listen(TEST_PORT, async () => {
    console.log(`\n[Test Runner] Server started on port ${TEST_PORT}`);
    
    try {
      await setup();
      await testCreateAssessment();
      await testGetAssessments();
      await testGetAssessmentById();
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
