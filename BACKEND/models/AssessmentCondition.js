/**
 * Assessment Condition Model
 */

class AssessmentCondition {
  constructor({ id, temperatureCelsius, altitudeMeters, surfaceType, equipmentUsed, notes = '' }) {
    this.id = id;
    this.temperatureCelsius = temperatureCelsius;
    this.altitudeMeters = altitudeMeters;
    this.surfaceType = surfaceType;
    this.equipmentUsed = equipmentUsed;
    this.notes = notes;
  }
}

const conditionsStore = [];

module.exports = {
  AssessmentCondition,
  conditionsStore
};
