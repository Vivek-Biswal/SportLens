/**
 * Assessment Condition Model (Module 7)
 */

class AssessmentCondition {
  constructor({ 
    id, 
    assessmentId, 
    device, 
    lighting, 
    cameraPosition, 
    surface, 
    footwear, 
    createdAt = new Date(),
    updatedAt = new Date()
  }) {
    this.id = id;
    this.assessmentId = assessmentId;
    this.device = device;
    this.lighting = lighting;
    this.cameraPosition = cameraPosition;
    this.surface = surface;
    this.footwear = footwear;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
  }

  toJSON() {
    return {
      id: this.id,
      assessment_id: this.assessmentId,
      device: this.device,
      lighting: this.lighting,
      camera_position: this.cameraPosition,
      surface: this.surface,
      footwear: this.footwear,
      created_at: this.createdAt,
      updated_at: this.updatedAt
    };
  }
}

// In-memory data store
const conditionsStore = [];

function clearConditions() {
  conditionsStore.length = 0;
}

module.exports = {
  AssessmentCondition,
  conditionsStore,
  clearConditions
};
