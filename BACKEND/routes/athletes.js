/**
 * Athletes Routes
 */

const express = require('express');
const router = express.Router();
const { authenticateToken } = require('../middleware/authentication');
const { validateAthlete, validatePathId, validateHistoryQuery } = require('../middleware/validation');
const { Athlete, athletesStore } = require('../models/Athlete');

const athleteService = require('../services/athleteService');

/**
 * GET /api/athletes
 * Retrieve athlete directory
 */
router.get('/', authenticateToken, (req, res) => {
  try {
    const athletes = athleteService.getAllAthletes(req.user);
    res.status(200).json({
      success: true,
      athletes: athletes.map(a => a.toJSON())
    });
  } catch (error) {
    res.status(500).json({ success: false, error: 'SERVER_ERROR', message: 'An unexpected error occurred.' });
  }
});

/**
 * POST /api/athletes
 * Create a new athlete profile (Module 2)
 */
router.post('/', authenticateToken, validateAthlete, (req, res) => {
  try {
    const athlete = athleteService.createAthlete(req.body, req.user);
    res.status(201).json({ 
      success: true, 
      message: 'Athlete profile created', 
      athlete: athlete.toJSON() 
    });
  } catch (error) {
    if (error.code) {
      return res.status(error.status || 400).json({
        success: false,
        error: error.code,
        message: error.message
      });
    }
    res.status(500).json({ success: false, error: 'SERVER_ERROR', message: 'An unexpected error occurred.' });
  }
});

/**
 * GET /api/athletes/:id
 * Retrieve specific athlete (Module 2)
 */
router.get('/:id', authenticateToken, validatePathId, (req, res) => {
  try {
    const athlete = athleteService.getAthleteById(req.params.id, req.user);
    res.status(200).json({
      success: true,
      athlete: athlete.toJSON()
    });
  } catch (error) {
    if (error.code) {
      return res.status(error.status || 400).json({
        success: false,
        error: error.code,
        message: error.message
      });
    }
    res.status(500).json({ success: false, error: 'SERVER_ERROR', message: 'An unexpected error occurred.' });
  }
});

/**
 * GET /athletes/:id/results
 * Returns the final test results history for the athlete.
 * Module 8 implementation.
 */
router.get('/:id/results', authenticateToken, validatePathId, (req, res) => {
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

/**
 * GET /athletes/:id/profile
 * Returns the dynamically calculated performance profile for the athlete.
 * Module 9 implementation.
 */
router.get('/:id/profile', authenticateToken, validatePathId, (req, res) => {
  try {
    const profileService = require('../services/profileService');
    const profile = profileService.generateProfile(req.params.id, req.user);
    
    res.status(200).json({
      success: true,
      profile: profile.toJSON()
    });
  } catch (error) {
    if (error.code) {
      return res.status(error.status || 400).json({
        success: false,
        error: error.code,
        message: error.message
      });
    }
    
    console.error('[Profile Get Error]', error);
    res.status(500).json({
      success: false,
      error: 'SERVER_ERROR',
      message: 'An unexpected error occurred.'
    });
  }
});

/**
 * GET /athletes/:id/history
 * Returns the chronological assessment history for the athlete.
 * Module 14 implementation.
 */
router.get('/:id/history', authenticateToken, validatePathId, validateHistoryQuery, (req, res) => {
  try {
    const historyService = require('../services/athleteHistoryService');
    const history = historyService.getHistory(req.params.id, req.query, req.user);
    
    res.status(200).json({
      success: true,
      ...history
    });
  } catch (error) {
    if (error.code) {
      return res.status(error.status || 400).json({
        success: false,
        error: error.code,
        message: error.message
      });
    }
    
    console.error('[History Get Error]', error);
    res.status(500).json({
      success: false,
      error: 'SERVER_ERROR',
      message: 'An unexpected error occurred.'
    });
  }
});

module.exports = router;
