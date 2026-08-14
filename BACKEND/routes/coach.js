/**
 * Coach Routes - Talent Discovery & Recommendations
 */

const express = require('express');
const router = express.Router();
const { authenticateToken } = require('../middleware/authentication');
const recommendationService = require('../services/recommendationService');

router.get('/recommendations', authenticateToken, (req, res) => {
  const { sport, minScore } = req.query;
  const recommendations = recommendationService.getTalentRecommendations({
    sport,
    minScore: minScore ? Number(minScore) : 0
  });

  res.json({ recommendations });
});

module.exports = router;
