/**
 * Assessments Routes (Module 4)
 */

const express = require('express');
const router = express.Router();
const { authenticateToken } = require('../middleware/authentication');
const { validateAssessment } = require('../middleware/validation');
const assessmentService = require('../services/assessmentService');

/**
 * POST /assessments
 * Create a new assessment
 */
router.post('/', authenticateToken, validateAssessment, (req, res) => {
  try {
    const { athlete_id, test_type } = req.body;
    
    const assessment = assessmentService.create({
      athleteId: athlete_id,
      testType: test_type
    });

    res.status(201).json({
      success: true,
      assessment: assessment.toJSON()
    });
  } catch (error) {
    if (error.code) {
      return res.status(error.status || 400).json({
        success: false,
        error: error.code,
        message: error.message
      });
    }
    
    console.error('[Assessment Create Error]', error);
    res.status(500).json({
      success: false,
      error: 'SERVER_ERROR',
      message: 'An unexpected error occurred.'
    });
  }
});

/**
 * GET /assessments
 * List authorized assessments
 */
router.get('/', authenticateToken, (req, res) => {
  try {
    const assessments = assessmentService.getAllAuthorized(req.user);
    
    res.status(200).json({
      success: true,
      assessments: assessments.map(a => a.toJSON())
    });
  } catch (error) {
    console.error('[Assessment List Error]', error);
    res.status(500).json({
      success: false,
      error: 'SERVER_ERROR',
      message: 'An unexpected error occurred.'
    });
  }
});

/**
 * GET /assessments/:id
 * Retrieve specific assessment by ID (including its attempts)
 */
router.get('/:id', authenticateToken, (req, res) => {
  try {
    const { assessment, attempts } = assessmentService.getByIdAuthorized(req.params.id, req.user);
    
    res.status(200).json({
      success: true,
      assessment: assessment.toJSON(attempts)
    });
  } catch (error) {
    if (error.code) {
      return res.status(error.status || 400).json({
        success: false,
        error: error.code,
        message: error.message
      });
    }
    
    console.error('[Assessment Get Error]', error);
    res.status(500).json({
      success: false,
      error: 'SERVER_ERROR',
      message: 'An unexpected error occurred.'
    });
  }
});

/**
 * POST /assessments/:id/attempt
 * Reserve a new attempt for this assessment
 */
router.post('/:id/attempt', authenticateToken, (req, res) => {
  try {
    const attempt = assessmentService.createAttempt(req.params.id, req.user);

    res.status(201).json({
      success: true,
      attempt: attempt.toJSON()
    });
  } catch (error) {
    if (error.code) {
      return res.status(error.status || 400).json({
        success: false,
        error: error.code,
        message: error.message
      });
    }
    
    console.error('[Attempt Create Error]', error);
    res.status(500).json({
      success: false,
      error: 'SERVER_ERROR',
      message: 'An unexpected error occurred.'
    });
  }
});

module.exports = router;
