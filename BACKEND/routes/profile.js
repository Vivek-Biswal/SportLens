/**
 * Profile Routes - Performance Profiles
 */

const express = require('express');
const router = express.Router();
const profileService = require('../services/profileService');
const { authenticateToken } = require('../middleware/authentication');

router.get('/:athleteId', (req, res) => {
  const profile = profileService.getProfileByAthleteId(req.params.athleteId);
  res.json({ profile });
});

router.put('/:athleteId', authenticateToken, (req, res) => {
  const updated = profileService.updateProfile(req.params.athleteId, req.body);
  res.json({ message: 'Performance profile updated', profile: updated });
});

module.exports = router;
