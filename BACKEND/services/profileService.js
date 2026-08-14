/**
 * Profile Service - Business Logic for Performance Profiles & Metrics Aggregation
 */

const { PerformanceProfile, profilesStore } = require('../models/PerformanceProfile');
const { athletesStore } = require('../models/Athlete');

class ProfileService {
  getProfileByAthleteId(athleteId) {
    let profile = profilesStore.find(p => p.athleteId === athleteId);
    if (!profile) {
      profile = new PerformanceProfile({
        id: `prof_${Date.now()}`,
        athleteId,
        overallScore: 75,
        speedRating: 80,
        enduranceRating: 70,
        strengthRating: 75,
        agilityRating: 78
      });
      profilesStore.push(profile);
    }
    return profile;
  }

  updateProfile(athleteId, updates) {
    const profile = this.getProfileByAthleteId(athleteId);
    Object.assign(profile, updates, { updatedAt: new Date() });
    return profile;
  }
}

module.exports = new ProfileService();
