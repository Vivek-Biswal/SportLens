/**
 * Recommendation Service - Business Logic for Talent Potential (Module 10)
 * 
 * Safely generates recommendations based on the Performance Profile,
 * avoiding deterministic claims about future success.
 */

// Configurable confidence threshold
const CONFIG = {
  MINIMUM_CONFIDENCE_THRESHOLD: 0.85
};

class RecommendationService {
  
  /**
   * Generates a safe recommendation string based on a PerformanceProfile.
   * Input is expected to contain overallCategory and overallConfidence.
   */
  generateRecommendation(profile) {
    if (!profile) {
      return 'Insufficient data for an overall recommendation.';
    }

    const { overallCategory, overallConfidence } = profile;

    // 1. Check for Insufficient Data
    if (overallCategory === 'INSUFFICIENT_DATA' || !overallCategory) {
      return 'Insufficient data for an overall recommendation.';
    }

    // 2. Check for Low Confidence
    if (overallConfidence < CONFIG.MINIMUM_CONFIDENCE_THRESHOLD) {
      return 'Further assessment recommended due to low measurement confidence.';
    }

    // 3. Generate Safe Recommendation
    switch (overallCategory) {
      case 'PROMISING':
        return 'Recommended for further assessment.';
      case 'NEEDS_DEVELOPMENT':
        return 'Continue assessment and training evaluation.';
      case 'AVERAGE':
        return 'Continue assessment and training evaluation.';
      default:
        return 'Assessment complete. Awaiting coach review.';
    }
  }

  // Exposed for tests or configuration injection if needed
  getConfig() {
    return CONFIG;
  }
}

module.exports = new RecommendationService();
