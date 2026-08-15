/**
 * Assessment Condition Service (Module 7)
 */

const { AssessmentCondition, conditionsStore } = require('../models/AssessmentCondition');
const assessmentService = require('./assessmentService');

class AssessmentConditionService {

  /**
   * Creates or updates assessment conditions for a given assessment.
   * Enforces one condition record per assessment (upsert).
   */
  upsertConditions(assessmentId, data, user) {
    // 1. Verify the assessment exists and user is authorized
    // getByIdAuthorized throws ASSESSMENT_NOT_FOUND or FORBIDDEN
    assessmentService.getByIdAuthorized(assessmentId, user, false);

    // 2. Check for existing condition record
    let condition = conditionsStore.find(c => c.assessmentId === assessmentId);

    if (condition) {
      // Update existing
      if (data.device !== undefined) condition.device = data.device;
      if (data.lighting !== undefined) condition.lighting = data.lighting;
      if (data.camera_position !== undefined) condition.cameraPosition = data.camera_position;
      if (data.surface !== undefined) condition.surface = data.surface;
      if (data.footwear !== undefined) condition.footwear = data.footwear;
      condition.updatedAt = new Date();
    } else {
      // Create new
      condition = new AssessmentCondition({
        id: `cond_${Date.now()}_${Math.random().toString(36).substr(2, 4)}`,
        assessmentId,
        device: data.device,
        lighting: data.lighting,
        cameraPosition: data.camera_position,
        surface: data.surface,
        footwear: data.footwear
      });
      conditionsStore.push(condition);
    }

    return condition;
  }

  /**
   * Retrieves conditions for an assessment.
   */
  getConditions(assessmentId, user) {
    // 1. Verify the assessment exists and user is authorized
    assessmentService.getByIdAuthorized(assessmentId, user, false);

    // 2. Find condition record
    const condition = conditionsStore.find(c => c.assessmentId === assessmentId);

    if (!condition) {
      throw { status: 404, code: 'CONDITIONS_NOT_FOUND', message: 'No conditions recorded for this assessment.' };
    }

    return condition;
  }
}

module.exports = new AssessmentConditionService();
