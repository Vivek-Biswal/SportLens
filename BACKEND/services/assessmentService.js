/**
 * Assessment Service
 * Handles Business Logic for Assessments (Module 4)
 */

const { athletesStore } = require('../models/Athlete');
const {
  createAssessment,
  findByAthleteId,
  findAll,
  findById
} = require('../models/Assessment');
const {
  findByAssessmentId,
  createAttempt
} = require('../models/Attempt');

const MAX_ATTEMPTS = 3;

class AssessmentService {
  
  /**
   * Creates a new assessment after validating athlete existence.
   */
  create({ athleteId, testType }) {
    // 1. Verify Athlete exists
    const athlete = athletesStore.find(a => String(a.id) === String(athleteId));
    if (!athlete) {
      const error = new Error('Athlete does not exist.');
      error.code = 'ATHLETE_NOT_FOUND';
      error.status = 404;
      throw error;
    }

    // 2. Create Assessment
    const assessment = createAssessment({
      athleteId: String(athleteId),
      testType
    });

    return assessment;
  }

  /**
   * Creates a new attempt for a given assessment, enforcing the max limit.
   */
  createAttempt(assessmentId, user) {
    // 1. Validate and fetch assessment (throws if unauthorized or not found)
    const assessment = this.getByIdAuthorized(assessmentId, user, false);

    // 2. Check if assessment is active
    if (assessment.status !== 'in_progress') {
      const error = new Error('This assessment is no longer active.');
      error.code = 'ASSESSMENT_NOT_ACTIVE';
      error.status = 400; // Bad request
      throw error;
    }

    // 3. Fetch existing attempts and check limit
    const existingAttempts = findByAssessmentId(assessmentId);
    if (existingAttempts.length >= MAX_ATTEMPTS) {
      const error = new Error(`Maximum of ${MAX_ATTEMPTS} attempts has been reached for this assessment.`);
      error.code = 'MAX_ATTEMPTS_REACHED';
      error.status = 409; // Conflict
      throw error;
    }

    // 4. Create new attempt
    const attemptNumber = existingAttempts.length + 1;
    const attempt = createAttempt({
      assessmentId,
      attemptNumber
    });

    return attempt;
  }

  /**
   * Retrieve all assessments the user is authorized to view.
   */
  getAllAuthorized(user) {
    if (!user) return [];

    if (user.role === 'ATHLETE') {
      return findByAthleteId(user.id);
    }

    if (user.role === 'COACH') {
      return findAll();
    }

    return [];
  }

  /**
   * Retrieve a specific assessment if authorized.
   * Can optionally attach attempts array to the returned object.
   */
  getByIdAuthorized(id, user, attachAttempts = true) {
    const assessment = findById(id);
    
    if (!assessment) {
      const error = new Error('Assessment does not exist.');
      error.code = 'ASSESSMENT_NOT_FOUND';
      error.status = 404;
      throw error;
    }

    // Authorization check
    if (user.role === 'ATHLETE' && assessment.athleteId !== user.id) {
      const error = new Error('You do not have permission to access this resource.');
      error.code = 'FORBIDDEN';
      error.status = 403;
      throw error;
    }

    // Attach attempts if requested
    if (attachAttempts) {
      const attempts = findByAssessmentId(assessment.id);
      return { assessment, attempts };
    }

    return assessment;
  }
}

module.exports = new AssessmentService();
