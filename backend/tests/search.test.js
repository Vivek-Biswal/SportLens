/**
 * Module 13 — Athlete Search & Filtering Tests
 */

require('dotenv').config();
const http = require('http');
const app = require('../server');
const { clearUsers } = require('../models/User');
const { clearAthletes, athletesStore, Athlete } = require('../models/Athlete');
const { clearAssessments, assessmentsStore, Assessment } = require('../models/Assessment');
const { clearAttempts, attemptsStore, Attempt } = require('../models/Attempt');
const { clearCoaches } = require('../models/Coach');

const TEST_PORT = 5113;
let server;
let passed = 0;
let failed = 0;
const results = [];

let coachToken = '';
let athleteToken = '';

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

  // Register Coach
  const resCoach = await request('POST', '/api/auth/register', { name: 'Coach', email: 'c@test.com', password: 'Password123', role: 'COACH' });
  coachToken = resCoach.body.token;

  // Register Athlete
  const resAth = await request('POST', '/api/auth/register', { name: 'Athlete', email: 'a@test.com', password: 'Password123', role: 'ATHLETE' });
  athleteToken = resAth.body.token;

  // Seed Athletes
  const ath1 = new Athlete({ id: 'a1', userId: 'u1', name: 'Rahul Sharma', age: 15, gender: 'Male', location: 'Gurgaon', sport: 'Athletics', createdAt: new Date('2026-08-01') });
  const ath2 = new Athlete({ id: 'a2', userId: 'u2', name: 'Rahul Kumar', age: 16, gender: 'Male', location: 'Delhi', sport: 'Football', createdAt: new Date('2026-08-02') });
  const ath3 = new Athlete({ id: 'a3', userId: 'u3', name: 'Rakesh Singh', age: 15, gender: 'Male', location: 'Gurgaon', sport: 'Athletics', createdAt: new Date('2026-08-03') });
  const ath4 = new Athlete({ id: 'a4', userId: 'u4', name: 'Anita Desai', age: 14, gender: 'Female', location: 'Mumbai', sport: 'Tennis', createdAt: new Date('2026-08-04') });
  
  athletesStore.push(ath1, ath2, ath3, ath4);

  // Seed Assessments and Attempts to give ath1 a high performance profile
  const asm = new Assessment({ id: 'asm1', athleteId: 'a1', testType: 'sprint', status: 'completed' });
  assessmentsStore.push(asm);
  const att = new Attempt({ id: 'att1', assessmentId: 'asm1', attemptNumber: 1, result: 4.5, unit: 'sec', confidence: 0.95, status: 'valid' });
  attemptsStore.push(att);
}

// ─── Tests ───────────────────────────────────────────────────────────────────

async function testSearch() {
  console.log('\n── Search & Filters ──');

  // Name Search
  const r1 = await request('GET', '/api/coach/athletes?search=Rahul', null, coachToken);
  assert('Name search finds 2 athletes', r1.status === 200 && r1.body.pagination.total === 2);

  // Exact Match Filters
  const r2 = await request('GET', '/api/coach/athletes?sport=Athletics&age=15&gender=Male', null, coachToken);
  assert('Combined profile filters (Sport, Age, Gender)', r2.body.pagination.total === 2);

  // Performance Filters
  // Debug to see the profile
  const r2_debug = await request('GET', '/api/coach/athletes', null, coachToken);
  // console.log('Athletes returned:', JSON.stringify(r2_debug.body.athletes, null, 2));

  // ath1 has a 4.5s sprint -> LOW speed, INSUFFICIENT_DATA overall (due to missing jump/agility)
  const r3 = await request('GET', '/api/coach/athletes?speed=LOW&min_confidence=0.9', null, coachToken);
  assert('Performance filters match correct athlete', r3.body.pagination.total === 1 && r3.body.athletes[0].name === 'Rahul Sharma');
  
  const r4 = await request('GET', '/api/coach/athletes?speed=HIGH', null, coachToken);
  assert('Performance filters exclude non-matching athletes', r4.body.pagination.total === 0);
}

async function testPaginationAndSorting() {
  console.log('\n── Pagination & Sorting ──');

  const r1 = await request('GET', '/api/coach/athletes?page=1&limit=2&sort_by=name&sort_order=asc', null, coachToken);
  assert('Pagination respects limit', r1.body.athletes.length === 2);
  assert('Total pages calculated correctly', r1.body.pagination.total_pages === 2);
  assert('Sorting by name ascending works', r1.body.athletes[0].name === 'Anita Desai');

  const r2 = await request('GET', '/api/coach/athletes?sort_by=created_at&sort_order=desc', null, coachToken);
  assert('Sorting by created_at descending works', r2.body.athletes[0].name === 'Anita Desai'); // newest
}

async function testValidationAndSecurity() {
  console.log('\n── Validation & Security ──');

  // Validation
  const r1 = await request('GET', '/api/coach/athletes?limit=-5', null, coachToken);
  assert('Invalid limit rejected', r1.status === 400 && r1.body.error === 'VALIDATION_ERROR');

  const r2 = await request('GET', '/api/coach/athletes?sort_by=invalid_field', null, coachToken);
  assert('Invalid sort_by rejected', r1.status === 400);

  // Security
  const r3 = await request('GET', '/api/coach/athletes', null, athleteToken);
  assert('Athlete accessing endpoint returns 403', r3.status === 403);
}

// ─── Runner ──────────────────────────────────────────────────────────────────

async function runTests() {
  server = app.listen(TEST_PORT, async () => {
    console.log(`\n[Test Runner] Server started on port ${TEST_PORT}`);
    try {
      await setup();
      await testSearch();
      await testPaginationAndSorting();
      await testValidationAndSecurity();
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
