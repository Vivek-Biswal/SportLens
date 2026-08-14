/**
 * Module 1 — Authentication Tests for SIH25073
 *
 * Comprehensive test suite covering:
 * 1. Registration
 * 2. Login
 * 3. Authentication (token verification)
 * 4. Authorization (role-based access)
 * 5. Current User (/auth/me)
 * 6. Logout
 */

require('dotenv').config();
const http = require('http');
const app = require('../server');
const { clearUsers } = require('../models/User');

const TEST_PORT = 5099;
let server;
let passed = 0;
let failed = 0;
const results = [];

// ─── Test Helpers ────────────────────────────────────────────────────────────

function request(method, path, body = null, headers = {}) {
  return new Promise((resolve, reject) => {
    const options = {
      hostname: 'localhost',
      port: TEST_PORT,
      path,
      method,
      headers: {
        'Content-Type': 'application/json',
        ...headers
      }
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

    if (body) {
      req.write(JSON.stringify(body));
    }

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

// ─── Test Data ───────────────────────────────────────────────────────────────

const validAthlete = {
  name: 'Rahul Sharma',
  email: 'rahul@example.com',
  password: 'SecurePassword123',
  role: 'ATHLETE'
};

const validCoach = {
  name: 'Anjali Coach',
  email: 'anjali@example.com',
  password: 'CoachPass456',
  role: 'COACH'
};

// ─── Test Suites ─────────────────────────────────────────────────────────────

async function testRegistration() {
  console.log('\n── Registration Tests ──');

  // Valid registration
  const r1 = await request('POST', '/api/auth/register', validAthlete);
  assert('Valid registration returns 201', r1.status === 201);
  assert('Valid registration returns success', r1.body.success === true);
  assert('Valid registration returns token', typeof r1.body.token === 'string' && r1.body.token.length > 0);
  assert('Valid registration returns user without password', r1.body.user && !r1.body.user.passwordHash && !r1.body.user.password);
  assert('Valid registration returns correct role', r1.body.user && r1.body.user.role === 'ATHLETE');

  // Register coach too
  const r1b = await request('POST', '/api/auth/register', validCoach);
  assert('Coach registration returns 201', r1b.status === 201);
  assert('Coach registration returns COACH role', r1b.body.user && r1b.body.user.role === 'COACH');

  // Missing name
  const r2 = await request('POST', '/api/auth/register', {
    email: 'test@test.com', password: 'Test1234', role: 'ATHLETE'
  });
  assert('Missing name returns 400', r2.status === 400);

  // Missing email
  const r3 = await request('POST', '/api/auth/register', {
    name: 'Test', password: 'Test1234', role: 'ATHLETE'
  });
  assert('Missing email returns 400', r3.status === 400);

  // Invalid email format
  const r4 = await request('POST', '/api/auth/register', {
    name: 'Test', email: 'notanemail', password: 'Test1234', role: 'ATHLETE'
  });
  assert('Invalid email returns 400', r4.status === 400);

  // Missing password
  const r5 = await request('POST', '/api/auth/register', {
    name: 'Test', email: 'test2@test.com', role: 'ATHLETE'
  });
  assert('Missing password returns 400', r5.status === 400);

  // Weak password (too short)
  const r5b = await request('POST', '/api/auth/register', {
    name: 'Test', email: 'test3@test.com', password: 'Ab1', role: 'ATHLETE'
  });
  assert('Short password returns 400', r5b.status === 400);

  // Weak password (no uppercase)
  const r5c = await request('POST', '/api/auth/register', {
    name: 'Test', email: 'test4@test.com', password: 'alllowercase1', role: 'ATHLETE'
  });
  assert('Password without uppercase returns 400', r5c.status === 400);

  // Duplicate email
  const r6 = await request('POST', '/api/auth/register', validAthlete);
  assert('Duplicate email returns 409', r6.status === 409);
  assert('Duplicate email returns EMAIL_ALREADY_EXISTS', r6.body.error === 'EMAIL_ALREADY_EXISTS');

  // Invalid role
  const r7 = await request('POST', '/api/auth/register', {
    name: 'Test', email: 'newunique@test.com', password: 'Test1234', role: 'ADMIN'
  });
  assert('Invalid role returns 400', r7.status === 400);

  // Missing role
  const r8 = await request('POST', '/api/auth/register', {
    name: 'Test', email: 'another@test.com', password: 'Test1234'
  });
  assert('Missing role returns 400', r8.status === 400);
}

async function testLogin() {
  console.log('\n── Login Tests ──');

  // Correct credentials
  const r1 = await request('POST', '/api/auth/login', {
    email: validAthlete.email,
    password: validAthlete.password
  });
  assert('Correct credentials returns 200', r1.status === 200);
  assert('Correct credentials returns success', r1.body.success === true);
  assert('Correct credentials returns token', typeof r1.body.token === 'string' && r1.body.token.length > 0);
  assert('Correct credentials returns user', r1.body.user && r1.body.user.email === validAthlete.email);
  assert('Login response does not expose password', !r1.body.user.passwordHash && !r1.body.user.password);

  // Incorrect password
  const r2 = await request('POST', '/api/auth/login', {
    email: validAthlete.email,
    password: 'WrongPassword123'
  });
  assert('Wrong password returns 401', r2.status === 401);
  assert('Wrong password returns INVALID_CREDENTIALS', r2.body.error === 'INVALID_CREDENTIALS');

  // Non-existent user
  const r3 = await request('POST', '/api/auth/login', {
    email: 'nobody@example.com',
    password: 'Test1234'
  });
  assert('Non-existent user returns 401', r3.status === 401);
  assert('Non-existent user returns INVALID_CREDENTIALS', r3.body.error === 'INVALID_CREDENTIALS');

  // Missing email
  const r4 = await request('POST', '/api/auth/login', {
    password: 'Test1234'
  });
  assert('Missing email returns 400', r4.status === 400);

  // Missing password
  const r5 = await request('POST', '/api/auth/login', {
    email: 'rahul@example.com'
  });
  assert('Missing password returns 400', r5.status === 400);
}

async function testAuthentication() {
  console.log('\n── Authentication (Token Verification) Tests ──');

  // Get a valid token first
  const loginRes = await request('POST', '/api/auth/login', {
    email: validAthlete.email,
    password: validAthlete.password
  });
  const validToken = loginRes.body.token;

  // Valid token
  const r1 = await request('GET', '/api/auth/me', null, {
    Authorization: `Bearer ${validToken}`
  });
  assert('Valid token returns 200', r1.status === 200);
  assert('Valid token returns user data', r1.body.success === true && r1.body.user);

  // Invalid token
  const r2 = await request('GET', '/api/auth/me', null, {
    Authorization: 'Bearer this.is.not.a.valid.token'
  });
  assert('Invalid token returns 401', r2.status === 401);

  // Missing token
  const r3 = await request('GET', '/api/auth/me');
  assert('Missing token returns 401', r3.status === 401);
  assert('Missing token returns UNAUTHORIZED', r3.body.error === 'UNAUTHORIZED');

  // Malformed Authorization header
  const r4 = await request('GET', '/api/auth/me', null, {
    Authorization: 'NotBearer sometoken'
  });
  assert('Malformed auth header returns 401', r4.status === 401);
}

async function testAuthorization() {
  console.log('\n── Authorization (Role-Based Access) Tests ──');

  // Login as athlete
  const athleteLogin = await request('POST', '/api/auth/login', {
    email: validAthlete.email,
    password: validAthlete.password
  });
  const athleteToken = athleteLogin.body.token;

  // Login as coach
  const coachLogin = await request('POST', '/api/auth/login', {
    email: validCoach.email,
    password: validCoach.password
  });
  const coachToken = coachLogin.body.token;

  // Coach accessing coach-protected endpoint (recommendations)
  const r1 = await request('GET', '/api/coach/recommendations', null, {
    Authorization: `Bearer ${coachToken}`
  });
  assert('Coach accesses coach endpoint successfully', r1.status === 200);

  // Authenticated user can access /auth/me
  const r3 = await request('GET', '/api/auth/me', null, {
    Authorization: `Bearer ${athleteToken}`
  });
  assert('Athlete accesses /auth/me', r3.status === 200 && r3.body.user.role === 'ATHLETE');

  const r4 = await request('GET', '/api/auth/me', null, {
    Authorization: `Bearer ${coachToken}`
  });
  assert('Coach accesses /auth/me', r4.status === 200 && r4.body.user.role === 'COACH');

  // Unauthenticated user denied
  const r5 = await request('GET', '/api/coach/recommendations');
  assert('Unauthenticated denied protected endpoint', r5.status === 401);
}

async function testCurrentUser() {
  console.log('\n── Current User (/auth/me) Tests ──');

  // Authenticated
  const loginRes = await request('POST', '/api/auth/login', {
    email: validAthlete.email,
    password: validAthlete.password
  });
  const token = loginRes.body.token;

  const r1 = await request('GET', '/api/auth/me', null, {
    Authorization: `Bearer ${token}`
  });
  assert('/auth/me authenticated returns 200', r1.status === 200);
  assert('/auth/me returns user object', r1.body.user && r1.body.user.email === validAthlete.email);
  assert('/auth/me does not return passwordHash', !r1.body.user.passwordHash);
  assert('/auth/me does not return password', !r1.body.user.password);
  assert('/auth/me returns role', r1.body.user.role === 'ATHLETE');

  // Unauthenticated
  const r2 = await request('GET', '/api/auth/me');
  assert('/auth/me unauthenticated returns 401', r2.status === 401);
}

async function testLogout() {
  console.log('\n── Logout Tests ──');

  // Login first
  const loginRes = await request('POST', '/api/auth/login', {
    email: validAthlete.email,
    password: validAthlete.password
  });
  const token = loginRes.body.token;

  // Successful logout
  const r1 = await request('POST', '/api/auth/logout', null, {
    Authorization: `Bearer ${token}`
  });
  assert('Logout returns 200', r1.status === 200);
  assert('Logout returns success', r1.body.success === true);

  // Logout without auth
  const r2 = await request('POST', '/api/auth/logout');
  assert('Logout without token returns 401', r2.status === 401);
}

// ─── Runner ──────────────────────────────────────────────────────────────────

async function runTests() {
  server = app.listen(TEST_PORT, async () => {
    console.log(`\n[Test Runner] Server started on port ${TEST_PORT}`);
    console.log('═══════════════════════════════════════════');
    console.log(' SIH25073 — Module 1 Authentication Tests');
    console.log('═══════════════════════════════════════════');

    try {
      await testRegistration();
      await testLogin();
      await testAuthentication();
      await testAuthorization();
      await testCurrentUser();
      await testLogout();
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

    console.log(`\n${failed === 0 ? '✓ ALL TESTS PASSED' : '✗ SOME TESTS FAILED'}\n`);

    server.close(() => {
      process.exit(failed > 0 ? 1 : 0);
    });
  });
}

runTests();
