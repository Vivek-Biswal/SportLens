/**
 * Assessment Model
 * 
 * Represents an athlete's physical or skill test.
 * Module 4 MVP focuses only on core fields, omitting attempts and results.
 */

const VALID_TEST_TYPES = ['vertical_jump', 'sprint', 'agility'];
const VALID_STATUSES = ['in_progress', 'completed', 'invalid', 'incomplete'];

class Assessment {
  constructor({ id, athleteId, testType, status = 'in_progress', createdAt = new Date(), updatedAt = new Date() }) {
    this.id = id;
    this.athleteId = athleteId;
    this.testType = testType;
    this.status = status;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
  }

  /**
   * Serializes the object for API responses, converting to requested snake_case JSON format.
   */
  toJSON() {
    return {
      id: this.id,
      athlete_id: this.athleteId,
      test_type: this.testType,
      status: this.status,
      created_at: this.createdAt,
      updated_at: this.updatedAt
    };
  }
}

// In-memory data store for structural setup
const assessmentsStore = [];

/**
 * Find an assessment by ID.
 */
function findById(id) {
  return assessmentsStore.find(a => a.id === id) || null;
}

/**
 * Create and store a new assessment.
 */
function createAssessment({ athleteId, testType }) {
  const assessment = new Assessment({
    id: `asm_${Date.now()}_${Math.random().toString(36).substr(2, 4)}`,
    athleteId,
    testType,
    status: 'in_progress',
    createdAt: new Date(),
    updatedAt: new Date()
  });

  assessmentsStore.push(assessment);
  return assessment;
}

/**
 * Find all assessments for a specific athlete.
 */
function findByAthleteId(athleteId) {
  return assessmentsStore.filter(a => a.athleteId === athleteId);
}

/**
 * Return all assessments (for coach/admin access).
 */
function findAll() {
  return [...assessmentsStore];
}

/**
 * Clear store (for tests).
 */
function clearAssessments() {
  assessmentsStore.length = 0;
}

module.exports = {
  Assessment,
  assessmentsStore,
  VALID_TEST_TYPES,
  VALID_STATUSES,
  findById,
  createAssessment,
  findByAthleteId,
  findAll,
  clearAssessments
};
