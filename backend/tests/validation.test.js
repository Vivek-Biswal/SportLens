/**
 * Module 17 — Validation Tests
 */

require('dotenv').config();
const http = require('http');
const app = require('../server');

const TEST_PORT = 5104;
let server;
let passed = 0;
let failed = 0;
const results = [];

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

// ─── Shared Token ────────────────────────────────────────────────────────────
let authHeaders = '';
async function setup() {
  const r = await request('POST', '/api/auth/register', { 
    name: 'Val Tester', email: 'val@test.com', password: 'Password123', role: 'ATHLETE' 
  });
  authHeaders = r.body.token;
}

// ─── Test Suites ─────────────────────────────────────────────────────────────

async function testAthleteValidation() {
  console.log('\n── Athlete Validation ──');
  
  const r1 = await request('POST', '/api/athletes', { sport: 'Tennis' }, authHeaders);
  assert('Missing name returns 400', r1.status === 400);
  assert('Has unified VALIDATION_ERROR format', r1.body.error === 'VALIDATION_ERROR');
  assert('Includes name field in details', r1.body.details.some(d => d.field === 'name'));

  const r2 = await request('POST', '/api/athletes', { name: 'Bob', sport: 'Tennis', age: -5 }, authHeaders);
  assert('Negative age is rejected', r2.status === 400);
  assert('Includes age field in details', r2.body.details.some(d => d.field === 'age'));
}

async function testAssessmentValidation() {
  console.log('\n── Assessment Validation ──');
  
  const r1 = await request('POST', '/api/assessments', { athlete_id: '123', test_type: 'football_magic' }, authHeaders);
  assert('Unsupported test_type is rejected', r1.status === 400);
  assert('Includes test_type field in details', r1.body.details.some(d => d.field === 'test_type'));

  const r2 = await request('POST', '/api/assessments', { test_type: 'sprint' }, authHeaders);
  assert('Missing athlete_id is rejected', r2.status === 400);
}

async function testCVResultValidation() {
  console.log('\n── CV Result Validation ──');
  
  // 1. Valid CV Result
  const r1 = await request('POST', '/api/assessments/valid-id/attempt', { 
    test_type: 'sprint', result: 3.5, unit: 'sec', confidence: 0.9, status: 'valid' 
  }, authHeaders);
  // Status will be 404/403/500 if DB fails, but it MUST NOT be 400 from validation
  assert('Valid CV Result passes validation (does not return 400)', r1.status !== 400);

  // 2. NaN Result
  const r2 = await request('POST', '/api/assessments/valid-id/attempt', { 
    test_type: 'sprint', result: NaN, unit: 'sec', confidence: 0.9, status: 'valid' 
  }, authHeaders);
  assert('NaN result is rejected', r2.status === 400);

  // 3. Stringified Result
  const r3 = await request('POST', '/api/assessments/valid-id/attempt', { 
    test_type: 'sprint', result: "3.5", unit: 'sec', confidence: 0.9, status: 'valid' 
  }, authHeaders);
  assert('Stringified result is rejected', r3.status === 400);

  // 4. Invalid Confidence > 1
  const r4 = await request('POST', '/api/assessments/valid-id/attempt', { 
    test_type: 'sprint', result: 3.5, unit: 'sec', confidence: 1.5, status: 'valid' 
  }, authHeaders);
  assert('Confidence > 1 is rejected', r4.status === 400);
  assert('Identifies confidence field', r4.body.details.some(d => d.field === 'confidence'));

  // 5. Invalid Unit
  const r5 = await request('POST', '/api/assessments/valid-id/attempt', { 
    test_type: 'vertical_jump', result: 45, unit: 'sec', confidence: 0.9, status: 'valid' 
  }, authHeaders);
  assert('Mismatched unit is rejected (vertical_jump expects cm)', r5.status === 400);
  assert('Identifies unit field', r5.body.details.some(d => d.field === 'unit'));
}

async function testPathParameterValidation() {
  console.log('\n── Path Parameter Validation ──');
  
  const r1 = await request('GET', '/api/assessments/%20%20%20', null, authHeaders); // encoded whitespace ID
  assert('Whitespace path ID is caught by validatePathId', r1.status === 400);
  assert('Includes id field in details', r1.body.details.some(d => d.field === 'id'));
}

// ─── Runner ──────────────────────────────────────────────────────────────────

async function runTests() {
  server = app.listen(TEST_PORT, async () => {
    console.log(`\n[Test Runner] Server started on port ${TEST_PORT}`);
    
    try {
      await setup();
      await testAthleteValidation();
      await testAssessmentValidation();
      await testCVResultValidation();
      await testPathParameterValidation();
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
