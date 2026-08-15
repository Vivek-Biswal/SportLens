/**
 * Module 15 — Shortlist Tests
 */

require('dotenv').config();
const http = require('http');
const app = require('../server');
const { clearUsers } = require('../models/User');
const { clearAthletes, athletesStore, Athlete } = require('../models/Athlete');
const { clearCoaches, coachesStore, Coach } = require('../models/Coach');
const { clearShortlists, shortlistsStore, Shortlist } = require('../models/Shortlist');

const TEST_PORT = 5115;
let server;
let passed = 0;
let failed = 0;
const results = [];

let coach1Token = '';
let coach2Token = '';
let athleteToken = '';

let coach1Id = '';
let coach2Id = '';
let targetAthleteId = 'a1';
let otherAthleteId = 'a2';

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
  clearShortlists();

  // Register Coach 1
  const resCoach1 = await request('POST', '/api/auth/register', { name: 'Coach One', email: 'c1@test.com', password: 'Password123', role: 'COACH' });
  coach1Token = resCoach1.body.token;
  coach1Id = resCoach1.body.user.id;

  // Register Coach 2
  const resCoach2 = await request('POST', '/api/auth/register', { name: 'Coach Two', email: 'c2@test.com', password: 'Password123', role: 'COACH' });
  coach2Token = resCoach2.body.token;
  coach2Id = resCoach2.body.user.id;

  // Register Athlete 1
  const resAth1 = await request('POST', '/api/auth/register', { name: 'Athlete 1', email: 'a1@test.com', password: 'Password123', role: 'ATHLETE' });
  athleteToken = resAth1.body.token;
  targetAthleteId = resAth1.body.user.id;
  athletesStore.push(new Athlete({ id: targetAthleteId, userId: targetAthleteId, name: 'Athlete 1', sport: 'Athletics' }));

  // Register Athlete 2
  const resAth2 = await request('POST', '/api/auth/register', { name: 'Athlete 2', email: 'a2@test.com', password: 'Password123', role: 'ATHLETE' });
  otherAthleteId = resAth2.body.user.id;
  athletesStore.push(new Athlete({ id: otherAthleteId, userId: otherAthleteId, name: 'Athlete 2', sport: 'Tennis' }));
}

// ─── Tests ───────────────────────────────────────────────────────────────────

async function testShortlistCreation() {
  console.log('\n── Creation & Duplicates ──');

  // Add athlete to coach1's shortlist
  const r1 = await request('POST', '/api/coach/shortlist', { athlete_id: targetAthleteId }, coach1Token);
  assert('Can add athlete to shortlist', r1.status === 201 && r1.body.success === true);
  assert('Shortlist entry has coach and athlete IDs', r1.body.shortlist.coach_id !== undefined && r1.body.shortlist.athlete_id === targetAthleteId);

  // Duplicate prevention
  const r2 = await request('POST', '/api/coach/shortlist', { athlete_id: targetAthleteId }, coach1Token);
  assert('Duplicate addition returns ATHLETE_ALREADY_SHORTLISTED', r2.status === 400 && r2.body.error === 'ATHLETE_ALREADY_SHORTLISTED');

  // Add to coach2 (should succeed because it's a different coach)
  const r3 = await request('POST', '/api/coach/shortlist', { athlete_id: targetAthleteId }, coach2Token);
  assert('Another coach can shortlist the same athlete', r3.status === 201);

  // Non-existent athlete
  const r4 = await request('POST', '/api/coach/shortlist', { athlete_id: 'fake_athlete' }, coach1Token);
  assert('Adding non-existent athlete returns ATHLETE_NOT_FOUND', r4.status === 404 && r4.body.error === 'ATHLETE_NOT_FOUND');
}

async function testShortlistRetrieval() {
  console.log('\n── Retrieval & Hydration ──');

  // Coach 1 adds second athlete to verify sorting/pagination
  await request('POST', '/api/coach/shortlist', { athlete_id: otherAthleteId }, coach1Token);

  const r1 = await request('GET', '/api/coach/shortlist?sort_order=desc', null, coach1Token);
  assert('Get shortlist returns 200', r1.status === 200);
  
  const shortlist = r1.body.shortlist;
  assert('Shortlist contains correct number of items', shortlist.length === 2);
  assert('Newest item is first (descending)', shortlist[0].athlete.id === otherAthleteId);
  assert('Older item is second', shortlist[1].athlete.id === targetAthleteId);

  // Verify hydration
  assert('Shortlist hydrates athlete data', shortlist[0].athlete.name === 'Athlete 2');
  assert('Shortlist includes performance_profile (even if null)', shortlist[0].performance_profile !== undefined);
  assert('Pagination object included', r1.body.pagination.total === 2);
}

async function testShortlistDeletionAndOwnership() {
  console.log('\n── Deletion & Ownership ──');

  // Coach 2 tries to delete Coach 1's shortlist item
  // Note: Coach 2 also has targetAthleteId on their shortlist. If Coach 2 calls delete on otherAthleteId, it should fail 
  // because Coach 2 doesn't have otherAthleteId on their shortlist, even though Coach 1 does.
  const r1 = await request('DELETE', `/api/coach/shortlist/${otherAthleteId}`, null, coach2Token);
  assert('Cannot delete another coach\'s shortlist entry', r1.status === 404 && r1.body.error === 'SHORTLIST_ENTRY_NOT_FOUND');

  // Coach 1 deletes successfully
  const r2 = await request('DELETE', `/api/coach/shortlist/${otherAthleteId}`, null, coach1Token);
  assert('Can delete own shortlist entry', r2.status === 200 && r2.body.success === true);

  // Verify athlete still exists
  const r3 = await request('GET', `/api/coach/athletes/${otherAthleteId}`, null, coach1Token);
  assert('Athlete profile is NOT deleted when removed from shortlist', r3.status === 200 && r3.body.athlete.id === otherAthleteId);
}

async function testAuthorizationAndValidation() {
  console.log('\n── Authorization & Validation ──');

  const r1 = await request('POST', '/api/coach/shortlist', { athlete_id: targetAthleteId }, athleteToken);
  assert('Athlete cannot POST to shortlist', r1.status === 403);

  const r2 = await request('GET', '/api/coach/shortlist', null, athleteToken);
  assert('Athlete cannot GET shortlist', r2.status === 403);

  const r3 = await request('DELETE', `/api/coach/shortlist/${targetAthleteId}`, null, athleteToken);
  assert('Athlete cannot DELETE shortlist', r3.status === 403);

  const r4 = await request('POST', '/api/coach/shortlist', {}, coach1Token);
  assert('Missing athlete_id fails validation', r4.status === 400 && r4.body.error === 'VALIDATION_ERROR');

  const r5 = await request('GET', '/api/coach/shortlist?sort_by=invalid', null, coach1Token);
  assert('Invalid sort_by fails validation', r5.status === 400 && r5.body.error === 'VALIDATION_ERROR');
}

// ─── Runner ──────────────────────────────────────────────────────────────────

async function runTests() {
  server = app.listen(TEST_PORT, async () => {
    console.log(`\n[Test Runner] Server started on port ${TEST_PORT}`);
    
    try {
      await setup();
      await testShortlistCreation();
      await testShortlistRetrieval();
      await testShortlistDeletionAndOwnership();
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
