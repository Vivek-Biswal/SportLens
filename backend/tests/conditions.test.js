/**
 * Module 7 — Assessment Conditions Tests
 */

require('dotenv').config();
const http = require('http');
const app = require('../server');
const { clearUsers } = require('../models/User');
const { clearAthletes, Athlete, athletesStore } = require('../models/Athlete');
const { clearAssessments, assessmentsStore, Assessment } = require('../models/Assessment');
const { clearConditions, conditionsStore } = require('../models/AssessmentCondition');

const TEST_PORT = 5107;
let server;
let passed = 0;
let failed = 0;
const results = [];

let athleteToken = '';
let coachToken = '';
let otherAthleteToken = '';
let assessmentId = '';

// ─── Test Helpers ────────────────────────────────────────────────────────────

function request(method, path, body = null, token = null) {
  return new Promise((resolve, reject) => {
    const headers = { 'Content-Type': 'application/json' };
    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    }
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
  clearAssessments();
  clearConditions();

  // Athlete 1
  const r1 = await request('POST', '/api/auth/register', { name: 'Cond Athlete', email: 'cond@test.com', password: 'Password123', role: 'ATHLETE' });
  athleteToken = r1.body.token;
  const athleteUserId = r1.body.user.id;
  athletesStore.push(new Athlete({ id: athleteUserId, userId: athleteUserId, name: 'Cond Athlete', sport: 'Athletics' }));

  // Athlete 2
  const r2 = await request('POST', '/api/auth/register', { name: 'Other Athlete', email: 'other@test.com', password: 'Password123', role: 'ATHLETE' });
  otherAthleteToken = r2.body.token;

  // Coach
  const r3 = await request('POST', '/api/auth/register', { name: 'Cond Coach', email: 'condcoach@test.com', password: 'Password123', role: 'COACH' });
  coachToken = r3.body.token;

  // Create an assessment linked to athlete 1
  const asm = new Assessment({ id: 'asm_cond_1', athleteId: athleteUserId, testType: 'sprint', status: 'in_progress' });
  assessmentsStore.push(asm);
  assessmentId = asm.id;
}

// ─── Tests ───────────────────────────────────────────────────────────────────

async function testCreateConditions() {
  console.log('\n── Create/Update Conditions ──');

  const body = {
    device: 'Samsung Galaxy S24',
    lighting: 'Indoor',
    camera_position: 'Side',
    surface: 'Wooden floor',
    footwear: 'Sports shoes'
  };

  // Valid creation
  const r1 = await request('PUT', `/api/assessments/${assessmentId}/conditions`, body, athleteToken);
  assert('PUT conditions returns 200', r1.status === 200);
  assert('Returns success=true', r1.body.success === true);
  assert('Conditions contain device', r1.body.conditions.device === 'Samsung Galaxy S24');
  assert('Conditions contain camera_position', r1.body.conditions.camera_position === 'Side');
  assert('Conditions linked to assessment', r1.body.conditions.assessment_id === assessmentId);

  // Upsert (update) — no duplicate
  const r2 = await request('PUT', `/api/assessments/${assessmentId}/conditions`, { lighting: 'Outdoor' }, athleteToken);
  assert('Update returns 200', r2.status === 200);
  assert('Lighting updated to Outdoor', r2.body.conditions.lighting === 'Outdoor');
  assert('Device preserved after partial update', r2.body.conditions.device === 'Samsung Galaxy S24');
  assert('No duplicate condition records created', conditionsStore.filter(c => c.assessmentId === assessmentId).length === 1);
}

async function testGetConditions() {
  console.log('\n── Get Conditions ──');

  // Existing conditions
  const r1 = await request('GET', `/api/assessments/${assessmentId}/conditions`, null, athleteToken);
  assert('GET conditions returns 200', r1.status === 200);
  assert('Response contains correct assessment_id', r1.body.conditions.assessment_id === assessmentId);

  // No conditions for non-existent assessment
  const r2 = await request('GET', '/api/assessments/nonexistent/conditions', null, coachToken);
  assert('Non-existent assessment returns 404', r2.status === 404);

  // Coach can access
  const r3 = await request('GET', `/api/assessments/${assessmentId}/conditions`, null, coachToken);
  assert('Coach can access conditions', r3.status === 200);
}

async function testAuthorization() {
  console.log('\n── Authorization ──');

  // Unauthenticated
  const r1 = await request('PUT', `/api/assessments/${assessmentId}/conditions`, { device: 'Test' });
  assert('Unauthenticated PUT returns 401', r1.status === 401);

  // Other athlete (forbidden)
  const r2 = await request('PUT', `/api/assessments/${assessmentId}/conditions`, { device: 'Hack' }, otherAthleteToken);
  assert('Other athlete PUT returns 403', r2.status === 403);

  const r3 = await request('GET', `/api/assessments/${assessmentId}/conditions`, null, otherAthleteToken);
  assert('Other athlete GET returns 403', r3.status === 403);
}

async function testValidation() {
  console.log('\n── Validation ──');

  const r1 = await request('PUT', `/api/assessments/${assessmentId}/conditions`, { device: 123 }, athleteToken);
  assert('Non-string device is rejected', r1.status === 400);
  assert('Has VALIDATION_ERROR format', r1.body.error === 'VALIDATION_ERROR');
}

// ─── Runner ──────────────────────────────────────────────────────────────────

async function runTests() {
  server = app.listen(TEST_PORT, async () => {
    console.log(`\n[Test Runner] Server started on port ${TEST_PORT}`);
    try {
      await setup();
      await testCreateConditions();
      await testGetConditions();
      await testAuthorization();
      await testValidation();
    } catch (error) {
      console.error('\n[Test Runner] Unexpected error:', error);
      failed++;
    }

    console.log('\n═══════════════════════════════════════════');
    console.log(` Results: ${passed} passed, ${failed} failed, ${passed + failed} total`);
    console.log('═══════════════════════════════════════════');

    if (failed > 0) {
      console.log('\nFailed tests:');
      results.filter(r => r.status === 'FAIL').forEach(r => console.log(`  ✗ ${r.name}`));
    }

    server.close(() => process.exit(failed > 0 ? 1 : 0));
  });
}

runTests();
