/**
 * Module 3 — Coach Management Tests
 */

require('dotenv').config();
const http = require('http');
const app = require('../server');
const { clearUsers } = require('../models/User');
const { clearAthletes, athletesStore } = require('../models/Athlete');
const { clearCoaches } = require('../models/Coach');

const TEST_PORT = 5106;
let server;
let passed = 0;
let failed = 0;
const results = [];

// Tokens
let coachToken = '';
let athleteToken = '';
let createdAthleteId = '';

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

  // Register Coach
  const r1 = await request('POST', '/api/auth/register', { name: 'Test Coach', email: 'coach@test.com', password: 'Password123', role: 'COACH' });
  coachToken = r1.body.token;

  // Register Athlete and create profile
  const r2 = await request('POST', '/api/auth/register', { name: 'Test Athlete', email: 'athlete@test.com', password: 'Password123', role: 'ATHLETE' });
  athleteToken = r2.body.token;

  const r3 = await request('POST', '/api/athletes', { name: 'Rahul Sharma', age: 15, gender: 'Male', location: 'Gurgaon', sport: 'Athletics' }, athleteToken);
  createdAthleteId = r3.body.athlete.id;
}

// ─── Tests ───────────────────────────────────────────────────────────────────

async function testCoachAuthorization() {
  console.log('\n── Coach Authorization ──');

  // Unauthenticated
  const r1 = await request('GET', '/api/coach/dashboard');
  assert('Unauthenticated request to /coach/dashboard returns 401', r1.status === 401);

  // Athlete trying coach route
  const r2 = await request('GET', '/api/coach/dashboard', null, athleteToken);
  assert('Athlete token on /coach/dashboard returns 403', r2.status === 403);
  assert('403 error code is FORBIDDEN', r2.body.error === 'FORBIDDEN');

  // Coach accessing
  const r3 = await request('GET', '/api/coach/dashboard', null, coachToken);
  assert('Coach token on /coach/dashboard returns 200', r3.status === 200);
}

async function testCoachDashboard() {
  console.log('\n── Coach Dashboard ──');

  const r1 = await request('GET', '/api/coach/dashboard', null, coachToken);
  assert('Dashboard returns success=true', r1.body.success === true);
  assert('Dashboard contains stats object', r1.body.dashboard && r1.body.dashboard.stats !== undefined);
  assert('Dashboard reports total_athletes', r1.body.dashboard.stats.total_athletes >= 1);
  assert('Dashboard contains coach profile', r1.body.dashboard.coach && r1.body.dashboard.coach.user_id !== undefined);
}

async function testCoachAthletesDirectory() {
  console.log('\n── Coach Athletes Directory ──');

  // Coach access
  const r1 = await request('GET', '/api/coach/athletes', null, coachToken);
  assert('Coach can access athlete directory', r1.status === 200);
  assert('Directory returns athletes array', Array.isArray(r1.body.athletes));
  assert('Directory contains at least one athlete', r1.body.athletes.length >= 1);

  // Athlete access (forbidden)
  const r2 = await request('GET', '/api/coach/athletes', null, athleteToken);
  assert('Athlete cannot access coach directory', r2.status === 403);
}

async function testCoachAthleteProfile() {
  console.log('\n── Coach Athlete Profile ──');

  // Existing athlete
  const r1 = await request('GET', `/api/coach/athletes/${createdAthleteId}`, null, coachToken);
  assert('Coach can fetch athlete profile', r1.status === 200);
  assert('Profile returns correct athlete data', r1.body.athlete && r1.body.athlete.name === 'Rahul Sharma');
  assert('Profile does not expose password/hash', !r1.body.athlete.password && !r1.body.athlete.passwordHash);

  // Non-existent athlete
  const r2 = await request('GET', '/api/coach/athletes/nonexistent_id', null, coachToken);
  assert('Non-existent athlete returns 404', r2.status === 404);
  assert('404 error code is ATHLETE_NOT_FOUND', r2.body.error === 'ATHLETE_NOT_FOUND');

  // Athlete trying coach athlete route
  const r3 = await request('GET', `/api/coach/athletes/${createdAthleteId}`, null, athleteToken);
  assert('Athlete cannot use coach athlete route', r3.status === 403);
}

// ─── Runner ──────────────────────────────────────────────────────────────────

async function runTests() {
  server = app.listen(TEST_PORT, async () => {
    console.log(`\n[Test Runner] Server started on port ${TEST_PORT}`);
    
    try {
      await setup();
      await testCoachAuthorization();
      await testCoachDashboard();
      await testCoachAthletesDirectory();
      await testCoachAthleteProfile();
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
