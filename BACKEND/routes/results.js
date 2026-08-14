/**
 * Results Routes - Aggregated Assessment Scores & Analytics
 */

const express = require('express');
const router = express.Router();
const assessmentService = require('../services/assessmentService');

router.get('/:athleteId', (req, res) => {
  const { athleteId } = req.params;
  const records = assessmentService.getAssessmentsByAthlete(athleteId);

  const totalScore = records.reduce((acc, curr) => acc + (curr.rawScore || 0), 0);
  const averageScore = records.length > 0 ? (totalScore / records.length).toFixed(2) : 0;

  res.json({
    athleteId,
    totalAssessments: records.length,
    averageScore: Number(averageScore),
    records
  });
});

module.exports = router;
