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

class AssessmentService {
  
  /**
   * Creates a new assessment after validating athlete existence.
   */
  create({ athleteId, testType }) {
    // 1. Verify Athlete exists
    // Since athleteId could be a number in JSON but a string in models, loose check or string conversion helps, 
    // but we will do a strict check by converting input to string to match string IDs.
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
   */
  getByIdAuthorized(id, user) {
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

    return assessment;
  }
}

module.exports = new AssessmentService();
