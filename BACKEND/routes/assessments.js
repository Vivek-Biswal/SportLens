/**
 * Assessments Routes
 * Target Request Flow:
 * POST /assessments -> routes/assessments -> middleware/authentication -> middleware/validation -> services/assessmentService -> models/Assessment -> database
 */

const express = require('express');
const router = express.Router();
const { authenticateToken } = require('../middleware/authentication');
const { validateAssessment } = require('../middleware/validation');
const assessmentService = require('../services/assessmentService');

router.post('/', authenticateToken, validateAssessment, (req, res) => {
  try {
    const assessment = assessmentService.createAssessment(req.body);
    res.status(201).json({
      message: 'Assessment recorded successfully',
      assessment
    });
  } catch (error) {
    res.status(500).json({ error: error.message || 'Failed to record assessment' });
  }
});

router.get('/', (req, res) => {
  const { athleteId } = req.query;
  if (athleteId) {
    const records = assessmentService.getAssessmentsByAthlete(athleteId);
    return res.json({ assessments: records });
  }
  res.json({ assessments: assessmentService.getAllAssessments() });
});

module.exports = router;
