/**
 * Shortlist Routes
 */

const express = require('express');
const router = express.Router();
const { authenticateToken } = require('../middleware/authentication');
const { validateShortlist } = require('../middleware/validation');
const shortlistService = require('../services/shortlistService');

router.post('/', authenticateToken, validateShortlist, (req, res) => {
  const coachId = req.user ? req.user.id : 'demo-coach-id';
  const { athleteId, notes } = req.body;

  const item = shortlistService.addToShortlist(coachId, athleteId, notes);
  res.status(201).json({ message: 'Athlete shortlisted successfully', shortlist: item });
});

router.get('/', authenticateToken, (req, res) => {
  const coachId = req.user ? req.user.id : 'demo-coach-id';
  const list = shortlistService.getShortlistByCoach(coachId);
  res.json({ shortlist: list });
});

router.delete('/:athleteId', authenticateToken, (req, res) => {
  const coachId = req.user ? req.user.id : 'demo-coach-id';
  const removed = shortlistService.removeFromShortlist(coachId, req.params.athleteId);
  if (!removed) {
    return res.status(404).json({ error: 'Shortlist entry not found' });
  }
  res.json({ message: 'Athlete removed from shortlist', shortlist: removed });
});

module.exports = router;
