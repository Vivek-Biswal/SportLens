/**
 * Assessment Service - Handles Business Logic for Physical & Skill Assessments
 */

const { Assessment, assessmentsStore } = require('../models/Assessment');
const { AssessmentCondition, conditionsStore } = require('../models/AssessmentCondition');

class AssessmentService {
  createAssessment(data) {
    const { athleteId, testType, rawScore, unit, condition } = data;

    let conditionId = null;
    if (condition) {
      const condObj = new AssessmentCondition({
        id: `cond_${Date.now()}`,
        temperatureCelsius: condition.temperatureCelsius || 25,
        altitudeMeters: condition.altitudeMeters || 0,
        surfaceType: condition.surfaceType || 'standard',
        equipmentUsed: condition.equipmentUsed || 'standard',
        notes: condition.notes || ''
      });
      conditionsStore.push(condObj);
      conditionId = condObj.id;
    }

    const assessmentObj = new Assessment({
      id: `asm_${Date.now()}_${Math.random().toString(36).substr(2, 4)}`,
      athleteId,
      testType,
      rawScore,
      unit: unit || 'score',
      conditionId,
      assessedAt: new Date()
    });

    assessmentsStore.push(assessmentObj);
    return assessmentObj;
  }

  getAssessmentsByAthlete(athleteId) {
    return assessmentsStore.filter(a => a.athleteId === athleteId);
  }

  getAllAssessments() {
    return assessmentsStore;
  }
}

module.exports = new AssessmentService();
