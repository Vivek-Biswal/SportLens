/**
 * Assessment Model
 */

class Assessment {
  constructor({ id, athleteId, testType, rawScore, unit, conditionId, assessedAt = new Date() }) {
    this.id = id;
    this.athleteId = athleteId;
    this.testType = testType;
    this.rawScore = rawScore;
    this.unit = unit;
    this.conditionId = conditionId;
    this.assessedAt = assessedAt;
  }
}

const assessmentsStore = [];

module.exports = {
  Assessment,
  assessmentsStore
};
