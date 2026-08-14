/**
 * Performance Profile Model
 */

class PerformanceProfile {
  constructor({ id, athleteId, overallScore = 0, speedRating = 0, enduranceRating = 0, strengthRating = 0, agilityRating = 0, updatedAt = new Date() }) {
    this.id = id;
    this.athleteId = athleteId;
    this.overallScore = overallScore;
    this.speedRating = speedRating;
    this.enduranceRating = enduranceRating;
    this.strengthRating = strengthRating;
    this.agilityRating = agilityRating;
    this.updatedAt = updatedAt;
  }
}

const profilesStore = [];

module.exports = {
  PerformanceProfile,
  profilesStore
};
