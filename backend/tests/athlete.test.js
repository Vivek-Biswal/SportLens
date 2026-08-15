/**
 * Module 2 — Athlete Management Tests
 */

require('dotenv').config();
const http = require('http');
const app = require('../server');
const { clearUsers } = require('../models/User');
const { clearAthletes, athletesStore } = require('../models/Athlete');

const TEST_PORT = 5105;
let server;
let passed = 0;
let failed = 0;
const results = [];

// Tokens & IDs
let athleteToken1 = '';
let userId1 = '';

let athleteToken2 = '';
let userId2 = '';

let coachToken = '';

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

  // Register Athlete 1
  const r1 = await request('POST', '/api/auth/register', { name: 'Ath1', email: 'a1@test.com', password: 'Password123', role: 'ATHLETE' });
  athleteToken1 = r1.body.token;
  userId1 = r1.body.user.id;

  // Register Athlete 2
  const r2 = await request('POST', '/api/auth/register', { name: 'Ath2', email: 'a2@test.com', password: 'Password123', role: 'ATHLETE' });
  athleteToken2 = r2.body.token;
  userId2 = r2.body.user.id;

  // Register Coach
  const r3 = await request('POST', '/api/auth/register', { name: 'Coach', email: 'c@test.com', password: 'Password123', role: 'COACH' });
  coachToken = r3.body.token;
}

// ─── Tests ───────────────────────────────────────────────────────────────────

let createdAthleteId1 = '';

async function testAthleteCreation() {
  console.log('\n── Athlete Creation ──');

  // Valid creation
  const body = { name: 'Rahul Sharma', age: 15, gender: 'Male', location: 'Gurgaon', sport: 'Athletics' };
  const r1 = await request('POST', '/api/athletes', body, athleteToken1);
  
  assert('Athlete created successfully', r1.status === 201);
  assert('Profile is linked to authenticated user', r1.body.athlete.user_id === userId1);
  createdAthleteId1 = r1.body.athlete.id;

  // Duplicate profile prevention
  const r2 = await request('POST', '/api/athletes', body, athleteToken1);
  assert('Prevents duplicate profile per user account', r2.status === 400);
  assert('Duplicate error code is ATHLETE_PROFILE_EXISTS', r2.body.error === 'ATHLETE_PROFILE_EXISTS');

  // Validation integration
  const r3 = await request('POST', '/api/athletes', { name: '' }, athleteToken2);
  assert('Validation layer blocks invalid creation', r3.status === 400 && r3.body.error === 'VALIDATION_ERROR');
}

async function testGetAthlete() {
  console.log('\n── Get Athlete By ID ──');

  // Authorized fetch
  const r1 = await request('GET', `/api/athletes/${createdAthleteId1}`, null, athleteToken1);
  assert('Athlete can fetch their own profile', r1.status === 200);
  assert('Data serialized in snake_case correctly', r1.body.athlete.user_id === userId1);

  // Unauthorized fetch (Athlete 2 trying to read Athlete 1)
  const r2 = await request('GET', `/api/athletes/${createdAthleteId1}`, null, athleteToken2);
  assert('Athlete cannot fetch another athlete\'s profile (403)', r2.status === 403);

  // Coach fetch
  const r3 = await request('GET', `/api/athletes/${createdAthleteId1}`, null, coachToken);
  assert('Coach can fetch any athlete\'s profile', r3.status === 200);
}

async function testGetAllAthletes() {
  console.log('\n── Get All Athletes ──');

  // Setup Athlete 2 profile so there are 2 total profiles
  await request('POST', '/api/athletes', { name: 'Athlete 2', sport: 'Tennis', age: 20 }, athleteToken2);

  // Athlete fetching directory
  const r1 = await request('GET', '/api/athletes', null, athleteToken1);
  assert('Athlete directory restricted to own profile for athletes', r1.body.athletes.length === 1 && r1.body.athletes[0].user_id === userId1);

  // Coach fetching directory
  const r2 = await request('GET', '/api/athletes', null, coachToken);
  assert('Coach directory returns all profiles', r2.body.athletes.length === 2);
}

// ─── Runner ──────────────────────────────────────────────────────────────────

async function runTests() {
  server = app.listen(TEST_PORT, async () => {
    console.log(`\n[Test Runner] Server started on port ${TEST_PORT}`);
    
    try {
      await setup();
      await testAthleteCreation();
      await testGetAthlete();
      await testGetAllAthletes();
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
