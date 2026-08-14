/**
 * Recommendation Service - Business Logic for Talent Potential & Sport Recommendations
 * (Note: Athlete-to-athlete comparison is explicitly excluded per architectural scope)
 */

const { athletesStore } = require('../models/Athlete');
const profileService = require('./profileService');

class RecommendationService {
  getTalentRecommendations(filter = {}) {
    const { sport, minScore = 0 } = filter;

    return athletesStore
      .map(athlete => {
        const profile = profileService.getProfileByAthleteId(athlete.id);
        return {
          athlete,
          profile,
          matchScore: Math.min(100, Math.round((profile.overallScore || 70) * 1.1))
        };
      })
      .filter(item => {
        if (sport && item.athlete.sport !== sport) return false;
        if (item.profile.overallScore < minScore) return false;
        return true;
      });
  }
}

module.exports = new RecommendationService();
