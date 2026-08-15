/**
 * Performance Profile Model
 * Module 9 Implementation
 */

class PerformanceProfile {
  constructor({ 
    id, 
    athleteId, 
    speedCategory = 'INSUFFICIENT_DATA', 
    explosivenessCategory = 'INSUFFICIENT_DATA', 
    agilityCategory = 'INSUFFICIENT_DATA', 
    overallCategory = 'INSUFFICIENT_DATA',
    overallConfidence = 0.0,
    recommendation = '',
    createdAt = new Date(),
    updatedAt = new Date(),
    // Keep raw data available for payload rendering
    speedData = null,
    explosivenessData = null,
    agilityData = null
  }) {
    this.id = id;
    this.athleteId = athleteId;
    
    this.speedCategory = speedCategory;
    this.explosivenessCategory = explosivenessCategory;
    this.agilityCategory = agilityCategory;
    this.overallCategory = overallCategory;
    this.overallConfidence = overallConfidence;
    this.recommendation = recommendation;
    
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;

    this.speedData = speedData;
    this.explosivenessData = explosivenessData;
    this.agilityData = agilityData;
  }

  toJSON() {
    return {
      athlete_id: this.athleteId,
      speed: {
        value: this.speedData ? this.speedData.result : null,
        unit: this.speedData ? this.speedData.unit : null,
        category: this.speedCategory
      },
      explosiveness: {
        value: this.explosivenessData ? this.explosivenessData.result : null,
        unit: this.explosivenessData ? this.explosivenessData.unit : null,
        category: this.explosivenessCategory
      },
      agility: {
        value: this.agilityData ? this.agilityData.result : null,
        unit: this.agilityData ? this.agilityData.unit : null,
        category: this.agilityCategory
      },
      overall_category: this.overallCategory,
      overall_confidence: this.overallConfidence,
      recommendation: this.recommendation,
      created_at: this.createdAt,
      updated_at: this.updatedAt
    };
  }
}

const profilesStore = [];

function clearProfiles() {
  profilesStore.length = 0;
}

module.exports = {
  PerformanceProfile,
  profilesStore,
  clearProfiles
};
