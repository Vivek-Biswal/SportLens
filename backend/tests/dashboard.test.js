/**
 * Module 12 — Coach Dashboard Tests
 */

require('dotenv').config();
const http = require('http');
const app = require('../server');
const { clearUsers } = require('../models/User');
const { clearAthletes, athletesStore, Athlete } = require('../models/Athlete');
const { clearAssessments, assessmentsStore, Assessment } = require('../models/Assessment');
const { clearAttempts, attemptsStore, Attempt } = require('../models/Attempt');
const { clearCoaches } = require('../models/Coach');

const TEST_PORT = 5112;
let server;
let passed = 0;
let failed = 0;
const results = [];

// Tokens
let coachToken = '';
let athleteToken = '';

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
  clearAthletes();
  clearCoaches();
  clearAssessments();
  clearAttempts();

  // Register Coach
  const r1 = await request('POST', '/api/auth/register', { name: 'Dashboard Coach', email: 'coach@test.com', password: 'Password123', role: 'COACH' });
  coachToken = r1.body.token;

  // Register Athlete
  const r2 = await request('POST', '/api/auth/register', { name: 'Dashboard Athlete', email: 'athlete@test.com', password: 'Password123', role: 'ATHLETE' });
  athleteToken = r2.body.token;

  const r3 = await request('POST', '/api/athletes', { name: 'Rahul Sharma', age: 15, gender: 'Male', location: 'Gurgaon', sport: 'Athletics' }, athleteToken);
  const athleteId = r3.body.athlete.id;

  // Seed Data: 2 Athletes
  athletesStore.push(new Athlete({ id: 'ath_2', userId: 'usr_2', name: 'Other Athlete', sport: 'Tennis' }));

  // Seed Data: 3 Assessments (2 completed, 1 in progress)
  const asm1 = new Assessment({ id: 'asm_1', athleteId, testType: 'vertical_jump', status: 'completed', createdAt: new Date('2026-08-15T10:00:00Z') });
  const asm2 = new Assessment({ id: 'asm_2', athleteId, testType: 'sprint', status: 'completed', createdAt: new Date('2026-08-15T11:00:00Z') });
  const asm3 = new Assessment({ id: 'asm_3', athleteId: 'ath_2', testType: 'agility', status: 'in_progress', createdAt: new Date('2026-08-15T12:00:00Z') });
  assessmentsStore.push(asm1, asm2, asm3);

  // Seed Data: Attempts for asm1 (vertical_jump -> MAX)
  attemptsStore.push(new Attempt({ id: 'att_1', assessmentId: asm1.id, attemptNumber: 1, result: 40, unit: 'cm', confidence: 0.9, status: 'valid', timestamp: new Date('2026-08-15T10:05:00Z') }));
  attemptsStore.push(new Attempt({ id: 'att_2', assessmentId: asm1.id, attemptNumber: 2, result: 45, unit: 'cm', confidence: 0.9, status: 'valid', timestamp: new Date('2026-08-15T10:10:00Z') }));
  attemptsStore.push(new Attempt({ id: 'att_3', assessmentId: asm1.id, attemptNumber: 3, result: 42, unit: 'cm', confidence: 0.9, status: 'valid', timestamp: new Date('2026-08-15T10:15:00Z') }));

  // Seed Data: Attempts for asm2 (sprint -> MIN)
  attemptsStore.push(new Attempt({ id: 'att_4', assessmentId: asm2.id, attemptNumber: 1, result: 5.5, unit: 'sec', confidence: 0.9, status: 'valid', timestamp: new Date('2026-08-15T11:05:00Z') }));
  attemptsStore.push(new Attempt({ id: 'att_5', assessmentId: asm2.id, attemptNumber: 2, result: 5.2, unit: 'sec', confidence: 0.9, status: 'valid', timestamp: new Date('2026-08-15T11:10:00Z') }));

}

// ─── Tests ───────────────────────────────────────────────────────────────────

async function testDashboardAuthorization() {
  console.log('\n── Dashboard Authorization ──');

  // Unauthenticated
  const r1 = await request('GET', '/api/coach/dashboard');
  assert('Unauthenticated request to /coach/dashboard returns 401', r1.status === 401);

  // Athlete trying coach route
  const r2 = await request('GET', '/api/coach/dashboard', null, athleteToken);
  assert('Athlete token on /coach/dashboard returns 403', r2.status === 403);
  assert('403 error code is FORBIDDEN', r2.body.error === 'FORBIDDEN');
}

async function testDashboardData() {
  console.log('\n── Dashboard Data ──');

  const r1 = await request('GET', '/api/coach/dashboard', null, coachToken);
  assert('Dashboard returns 200', r1.status === 200);
  assert('Dashboard returns success=true', r1.body.success === true);
  
  const db = r1.body.dashboard;
  assert('Dashboard contains stats object', db.statistics !== undefined);
  assert('Total athletes is 2', db.statistics.total_athletes === 2);
  assert('Total assessments is 3', db.statistics.total_assessments === 3);
  assert('Completed assessments is 2', db.statistics.completed_assessments === 2);
  assert('In-progress assessments is 1', db.statistics.in_progress_assessments === 1);

  assert('Recent assessments array exists', Array.isArray(db.recent_assessments));
  assert('Recent assessments returns 3 items', db.recent_assessments.length === 3);
  assert('Recent assessments sorted newest first (asm_3 first)', db.recent_assessments[0].assessment_id === 'asm_3');

  assert('Recent results array exists', Array.isArray(db.recent_results));
  assert('Recent results returns 2 items (only 2 assessments have valid attempts)', db.recent_results.length === 2);
  
  // Vertical Jump should pick MAX (45)
  const vjResult = db.recent_results.find(r => r.test_type === 'vertical_jump');
  assert('Vertical jump picked MAX result (45)', vjResult.result === 45);

  // Sprint should pick MIN (5.2)
  const sprintResult = db.recent_results.find(r => r.test_type === 'sprint');
  assert('Sprint picked MIN result (5.2)', sprintResult.result === 5.2);
}

// ─── Runner ──────────────────────────────────────────────────────────────────

async function runTests() {
  server = app.listen(TEST_PORT, async () => {
    console.log(`\n[Test Runner] Server started on port ${TEST_PORT}`);
    
    try {
      await setup();
      await testDashboardAuthorization();
      await testDashboardData();
    } catch (error) {
      console.error('\n[Test Runner] Unexpected error:', error);
      failed++;
    }

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
