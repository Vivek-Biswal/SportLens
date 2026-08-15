/**
 * Coach Routes (Module 3)
 */

const express = require('express');
const router = express.Router();
const { authenticateToken, requireRole } = require('../middleware/authentication');
const { validatePathId, validateAthleteSearch, validateShortlistQuery, validateShortlistPost } = require('../middleware/validation');
const coachService = require('../services/coachService');
const shortlistService = require('../services/shortlistService');

/**
 * GET /api/coach/dashboard
 * Returns baseline dashboard data for an authenticated coach.
 */
router.get('/dashboard', authenticateToken, requireRole('COACH'), (req, res) => {
  try {
    const data = coachService.getDashboardData(req.user);
    res.status(200).json({
      success: true,
      dashboard: data
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
 * GET /api/coach/athletes
 * Returns the athlete directory for authorized coaches with search and filtering.
 */
router.get('/athletes', authenticateToken, requireRole('COACH'), validateAthleteSearch, (req, res) => {
  try {
    const data = coachService.getAthletesDirectory(req.query);
    res.status(200).json({
      success: true,
      ...data
    });
  } catch (error) {
    res.status(500).json({ success: false, error: 'SERVER_ERROR', message: 'An unexpected error occurred.' });
  }
});

/**
 * GET /api/coach/athletes/:id
 * Returns a specific athlete's profile for an authorized coach.
 */
router.get('/athletes/:id', authenticateToken, requireRole('COACH'), validatePathId, (req, res) => {
  try {
    const athlete = coachService.getAthleteProfile(req.params.id);
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

// ─── Shortlist Routes (Module 15) ──────────────────────────────────────────

/**
 * POST /api/coach/shortlist
 * Adds an athlete to the coach's shortlist
 */
router.post('/shortlist', authenticateToken, requireRole('COACH'), validateShortlistPost, (req, res) => {
  try {
    const shortlistEntry = shortlistService.addAthleteToShortlist(req.body.athlete_id, req.user);
    res.status(201).json({
      success: true,
      shortlist: shortlistEntry.toJSON()
    });
  } catch (error) {
    if (error.code) {
      return res.status(error.status || 400).json({
        success: false,
        error: error.code,
        message: error.message
      });
    }
    console.error('[Shortlist POST Error]', error);
    res.status(500).json({ success: false, error: 'SERVER_ERROR', message: 'An unexpected error occurred.' });
  }
});

/**
 * GET /api/coach/shortlist
 * Retrieves the coach's paginated shortlist
 */
router.get('/shortlist', authenticateToken, requireRole('COACH'), validateShortlistQuery, (req, res) => {
  try {
    const data = shortlistService.getShortlist(req.query, req.user);
    res.status(200).json({
      success: true,
      ...data
    });
  } catch (error) {
    console.error('[Shortlist GET Error]', error);
    res.status(500).json({ success: false, error: 'SERVER_ERROR', message: 'An unexpected error occurred.' });
  }
});

/**
 * DELETE /api/coach/shortlist/:id
 * Removes an athlete from the coach's shortlist. Note: path param :id is the athlete_id
 */
router.delete('/shortlist/:id', authenticateToken, requireRole('COACH'), validatePathId, (req, res) => {
  try {
    shortlistService.removeAthleteFromShortlist(req.params.id, req.user);
    res.status(200).json({
      success: true,
      message: 'Athlete removed from shortlist.'
    });
  } catch (error) {
    if (error.code) {
      return res.status(error.status || 400).json({
        success: false,
        error: error.code,
        message: error.message
      });
    }
    console.error('[Shortlist DELETE Error]', error);
    res.status(500).json({ success: false, error: 'SERVER_ERROR', message: 'An unexpected error occurred.' });
  }
});

module.exports = router;
