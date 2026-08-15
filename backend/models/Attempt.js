/**
 * Attempt Model
 * 
 * Represents a single attempt within an assessment.
 * Integrated with Module 5 (CV) for handling results.
 */

class Attempt {
  constructor({ id, assessmentId, attemptNumber, result = null, unit = null, confidence = null, status = 'pending', timestamp = new Date() }) {
    this.id = id;
    this.assessmentId = assessmentId;
    this.attemptNumber = attemptNumber;
    this.result = result;
    this.unit = unit;
    this.confidence = confidence;
    this.status = status;
    this.timestamp = timestamp;
  }

  /**
   * Serializes the object for API responses (snake_case JSON format).
   */
  toJSON() {
    return {
      id: this.id,
      attempt_number: this.attemptNumber,
      result: this.result,
      unit: this.unit,
      confidence: this.confidence,
      status: this.status,
      timestamp: this.timestamp
    };
  }
}

// In-memory data store for structural setup
const attemptsStore = [];

/**
 * Find attempts by assessment ID.
 */
function findByAssessmentId(assessmentId) {
  return attemptsStore.filter(a => String(a.assessmentId) === String(assessmentId));
}

/**
 * Create and store a new attempt.
 */
function createAttempt({ assessmentId, attemptNumber }) {
  const attempt = new Attempt({
    id: `atm_${Date.now()}_${Math.random().toString(36).substr(2, 4)}`,
    assessmentId: String(assessmentId),
    attemptNumber,
    status: 'pending', // Initial status before CV integration processes it
    timestamp: new Date()
  });

  attemptsStore.push(attempt);
  return attempt;
}

/**
 * Clear store (for tests).
 */
function clearAttempts() {
  attemptsStore.length = 0;
}

module.exports = {
  Attempt,
  attemptsStore,
  findByAssessmentId,
  createAttempt,
  clearAttempts
};
