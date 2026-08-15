/**
 * Athletes Routes
 */

const express = require('express');
const router = express.Router();
const { Athlete, athletesStore } = require('../models/Athlete');
const { authenticateToken } = require('../middleware/authentication');
const { validateAthlete } = require('../middleware/validation');

router.get('/', (req, res) => {
  res.json({ athletes: athletesStore });
});

router.post('/', authenticateToken, validateAthlete, (req, res) => {
  const { name, email, sport, age, gender, heightCm, weightKg } = req.body;
  const athlete = new Athlete({
    id: `ath_${Date.now()}`,
    name,
    email,
    sport,
    age,
    gender,
    heightCm,
    weightKg
  });

  athletesStore.push(athlete);
  res.status(201).json({ message: 'Athlete profile created', athlete });
});

router.get('/:id', (req, res) => {
  const athlete = athletesStore.find(a => a.id === req.params.id);
  if (!athlete) {
    return res.status(404).json({ error: 'Athlete not found' });
  }
  res.json({ athlete });
});

/**
 * GET /athletes/:id/results
 * Returns the final test results history for the athlete.
 * Module 8 implementation.
 */
router.get('/:id/results', authenticateToken, (req, res) => {
  try {
    const assessmentService = require('../services/assessmentService');
    const results = assessmentService.getFinalResultsForAthlete(req.params.id, req.user);
    
    res.status(200).json({
      success: true,
      athlete_id: req.params.id,
      results
    });
  } catch (error) {
    if (error.code) {
      return res.status(error.status || 400).json({
        success: false,
        error: error.code,
        message: error.message
      });
    }
    
    console.error('[Results Get Error]', error);
    res.status(500).json({
      success: false,
      error: 'SERVER_ERROR',
      message: 'An unexpected error occurred.'
    });
  }
});

module.exports = router;
