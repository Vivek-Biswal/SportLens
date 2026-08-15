/**
 * Recommendation Service - Business Logic for Talent Potential & Sport Recommendations
 * (Note: Athlete-to-athlete comparison is explicitly excluded per architectural scope)
 */

const { athletesStore } = require('../models/Athlete');
const profileService = require('./profileService');

class RecommendationService {
  /**
   * Provides a baseline recommendation string for the performance profile.
   * To be expanded in Module 10.
   */
  getRecommendationForProfile({ overallCategory, validDimensionsCount }) {
    if (validDimensionsCount < 2) {
      return 'Complete more assessments to generate a recommendation.';
    }

    switch (overallCategory) {
      case 'PROMISING':
        return 'Recommended for advanced training and competitive shortlisting.';
      case 'NEEDS_DEVELOPMENT':
        return 'Focus on foundational strength and conditioning programs.';
      case 'AVERAGE':
        return 'Maintain current training with isolated focus on weakest metrics.';
      default:
        return 'Assessment complete. Awaiting coach review.';
    }
  }

  getTalentRecommendations(filter = {}) {
    // Legacy mock for compatibility
    return [];
  }
}

module.exports = new RecommendationService();
