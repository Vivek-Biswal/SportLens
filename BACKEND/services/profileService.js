/**
 * Profile Service - Business Logic for Performance Profiles (Module 9)
 */

const { PerformanceProfile, profilesStore } = require('../models/PerformanceProfile');
const assessmentService = require('./assessmentService');

// TEST TO DIMENSION MAPPING
const TEST_TO_DIMENSION = {
  vertical_jump: 'explosiveness',
  sprint: 'speed',
  agility: 'agility'
};

// CATEGORY CONFIGURATIONS (Provisional, Configurable)
const CATEGORY_THRESHOLDS = {
  speed: { // based on sprint (seconds, MIN is better)
    HIGH: val => val <= 3.8,
    MODERATE: val => val > 3.8 && val <= 4.2,
    LOW: val => val > 4.2
  },
  explosiveness: { // based on vertical jump (cm, MAX is better)
    HIGH: val => val >= 50,
    MODERATE: val => val >= 40 && val < 50,
    LOW: val => val < 40
  },
  agility: { // based on agility test (seconds, MIN is better)
    HIGH: val => val <= 10.0,
    MODERATE: val => val > 10.0 && val <= 12.0,
    LOW: val => val > 12.0
  }
};

/**
 * Calculates a category based on the configurable thresholds.
 */
function calculateCategory(dimension, value) {
  if (value === null || value === undefined) return 'INSUFFICIENT_DATA';
  const thresholds = CATEGORY_THRESHOLDS[dimension];
  if (!thresholds) return 'INSUFFICIENT_DATA';

  if (thresholds.HIGH(value)) return 'HIGH';
  if (thresholds.MODERATE(value)) return 'MODERATE';
  if (thresholds.LOW(value)) return 'LOW';
  
  return 'INSUFFICIENT_DATA';
}

class ProfileService {
  
  /**
   * Generates or updates a Performance Profile dynamically based on final test results.
   */
  generateProfile(athleteId, user) {
    // 1. Fetch final results from Module 8 (throws if unauthorized or athlete not found)
    const finalResults = assessmentService.getFinalResultsForAthlete(athleteId, user);
    
    // 2. Initialize profile data
    let speedData = null;
    let explosivenessData = null;
    let agilityData = null;

    let validDimensionsCount = 0;
    let totalConfidence = 0.0;

    // 3. Map tests to dimensions
    for (const result of finalResults) {
      const dimension = TEST_TO_DIMENSION[result.test_type];
      
      if (dimension === 'speed') speedData = result;
      if (dimension === 'explosiveness') explosivenessData = result;
      if (dimension === 'agility') agilityData = result;
    }

    // 4. Calculate Individual Categories & Aggregate Confidence
    const speedCategory = calculateCategory('speed', speedData?.result);
    const explosivenessCategory = calculateCategory('explosiveness', explosivenessData?.result);
    const agilityCategory = calculateCategory('agility', agilityData?.result);

    if (speedData && speedData.confidence) {
      totalConfidence += speedData.confidence;
      validDimensionsCount++;
    }
    if (explosivenessData && explosivenessData.confidence) {
      totalConfidence += explosivenessData.confidence;
      validDimensionsCount++;
    }
    if (agilityData && agilityData.confidence) {
      totalConfidence += agilityData.confidence;
      validDimensionsCount++;
    }

    const overallConfidence = validDimensionsCount > 0 ? Number((totalConfidence / validDimensionsCount).toFixed(2)) : 0.0;

    // 5. Determine Overall Category (Protect against partial data)
    let overallCategory = 'INSUFFICIENT_DATA';
    
    // Partial data rule: must have at least 2 dimensions to form an overall category
    if (validDimensionsCount >= 2) {
      const highs = [speedCategory, explosivenessCategory, agilityCategory].filter(c => c === 'HIGH').length;
      const lows = [speedCategory, explosivenessCategory, agilityCategory].filter(c => c === 'LOW').length;

      if (highs >= 2) {
        overallCategory = 'PROMISING';
      } else if (lows >= 2) {
        overallCategory = 'NEEDS_DEVELOPMENT';
      } else {
        overallCategory = 'AVERAGE';
      }
    }

    // 6. Integrate with Recommendation Service (Module 10)
    const recommendationService = require('./recommendationService');
    const recommendation = recommendationService.generateRecommendation({ 
      overallCategory, 
      overallConfidence 
    });

    // 7. Upsert to Data Store
    let profile = profilesStore.find(p => p.athleteId === athleteId);
    if (!profile) {
      profile = new PerformanceProfile({
        id: `prof_${Date.now()}_${Math.random().toString(36).substr(2,4)}`,
        athleteId
      });
      profilesStore.push(profile);
    }

    // Update fields
    profile.speedCategory = speedCategory;
    profile.explosivenessCategory = explosivenessCategory;
    profile.agilityCategory = agilityCategory;
    profile.overallCategory = overallCategory;
    profile.overallConfidence = overallConfidence;
    profile.recommendation = recommendation;
    profile.speedData = speedData;
    profile.explosivenessData = explosivenessData;
    profile.agilityData = agilityData;
    profile.updatedAt = new Date();

    return profile;
  }

}

module.exports = new ProfileService();
