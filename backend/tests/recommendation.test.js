/**
 * Module 10 — Recommendation Engine Tests
 */

const assert = require('assert');
const recommendationService = require('../services/recommendationService');

let passed = 0;
let failed = 0;
const results = [];

function runTest(testName, testFn) {
  try {
    testFn();
    passed++;
    results.push({ name: testName, status: 'PASS' });
  } catch (error) {
    failed++;
    results.push({ name: testName, status: 'FAIL' });
    console.error(`  ✗ FAIL: ${testName}`);
    console.error(`    ${error.message}`);
  }
}

console.log('\n── Recommendation Engine Logic Tests ──');

// 1. Promising Profile
runTest('Promising profile with high confidence yields safe recommendation', () => {
  const profile = {
    overallCategory: 'PROMISING',
    overallConfidence: 0.90
  };
  
  const rec = recommendationService.generateRecommendation(profile);
  assert.strictEqual(rec, 'Recommended for further assessment.');
});

// 2. Insufficient Data
runTest('Insufficient data profile yields insufficient data recommendation', () => {
  const profile = {
    overallCategory: 'INSUFFICIENT_DATA',
    overallConfidence: 0.90 // Even with high confidence in one metric, overall is insufficient
  };
  
  const rec = recommendationService.generateRecommendation(profile);
  assert.strictEqual(rec, 'Insufficient data for an overall recommendation.');
});

// 3. Null Profile
runTest('Null profile yields insufficient data recommendation', () => {
  const rec = recommendationService.generateRecommendation(null);
  assert.strictEqual(rec, 'Insufficient data for an overall recommendation.');
});

// 4. Low Confidence
runTest('Low confidence profile overrides PROMISING category', () => {
  const profile = {
    overallCategory: 'PROMISING',
    overallConfidence: 0.80 // Below 0.85 config threshold
  };
  
  const rec = recommendationService.generateRecommendation(profile);
  assert.strictEqual(rec, 'Further assessment recommended due to low measurement confidence.');
});

// 5. Average / Needs Development Profiles
runTest('Average profile yields safe evaluation message', () => {
  const profile = {
    overallCategory: 'AVERAGE',
    overallConfidence: 0.95
  };
  
  const rec = recommendationService.generateRecommendation(profile);
  assert.strictEqual(rec, 'Continue assessment and training evaluation.');
});

runTest('Needs Development profile yields safe evaluation message', () => {
  const profile = {
    overallCategory: 'NEEDS_DEVELOPMENT',
    overallConfidence: 0.95
  };
  
  const rec = recommendationService.generateRecommendation(profile);
  assert.strictEqual(rec, 'Continue assessment and training evaluation.');
});

// 6. Safe Wording Verification
runTest('Verify strict absence of deterministic claims', () => {
  const profiles = [
    { overallCategory: 'PROMISING', overallConfidence: 0.99 },
    { overallCategory: 'NEEDS_DEVELOPMENT', overallConfidence: 0.99 },
    { overallCategory: 'AVERAGE', overallConfidence: 0.99 },
    { overallCategory: 'PROMISING', overallConfidence: 0.10 },
    { overallCategory: 'INSUFFICIENT_DATA', overallConfidence: 0.0 }
  ];

  const forbiddenPhrases = [
    'will become professional',
    'guaranteed',
    'national player',
    'success',
    'certain',
    'future career'
  ];

  for (const profile of profiles) {
    const rec = recommendationService.generateRecommendation(profile).toLowerCase();
    for (const phrase of forbiddenPhrases) {
      assert.ok(!rec.includes(phrase), `Recommendation contained forbidden phrase: "${phrase}"`);
    }
  }
});


// ─── Summary ─────────────────────────────────────────────────────────────────

console.log('\n═══════════════════════════════════════════');
console.log(` Results: ${passed} passed, ${failed} failed, ${passed + failed} total`);
console.log('═══════════════════════════════════════════');

if (failed > 0) {
  process.exit(1);
} else {
  process.exit(0);
}
