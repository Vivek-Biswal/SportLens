/**
 * Assessments Routes (Module 4)
 */

const express = require('express');
const router = express.Router();
const { authenticateToken } = require('../middleware/authentication');
const { validatePathId, validateAssessment, validateCVResult } = require('../middleware/validation');
const assessmentService = require('../services/assessmentService');

/**
 * POST /api/assessments
 * Create a new assessment
 */
router.post('/', authenticateToken, validateAssessment, (req, res) => {
  try {
    const { athlete_id, test_type } = req.body;
    const assessment = assessmentService.createAssessment(athlete_id, test_type, req.user);
    
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
 * GET /api/assessments/:id
 * Retrieve assessment by ID (including attempts)
 */
router.get('/:id', authenticateToken, validatePathId, (req, res) => {
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
 * POST /api/assessments/:id/attempt
 * Creates a new attempt for a specific assessment.
 * Module 6 implementation.
 */
router.post('/:id/attempt', authenticateToken, validatePathId, validateCVResult, (req, res) => {
  try {
    const { test_type, result, unit, confidence, status } = req.body;
    const attempt = assessmentService.createAttempt(req.params.id, { result, unit, confidence, status }, req.user);
    
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
