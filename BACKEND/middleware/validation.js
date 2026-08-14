/**
 * Validation Middleware
 */

function validateAssessment(req, res, next) {
  const { athleteId, testType, rawScore } = req.body || {};

  if (!athleteId || typeof athleteId !== 'string') {
    return res.status(400).json({ error: 'Validation Error: athleteId is required and must be a string' });
  }

  if (!testType || typeof testType !== 'string') {
    return res.status(400).json({ error: 'Validation Error: testType is required and must be a string' });
  }

  if (rawScore === undefined || typeof rawScore !== 'number') {
    return res.status(400).json({ error: 'Validation Error: rawScore is required and must be a number' });
  }

  next();
}

function validateAthlete(req, res, next) {
  const { name, sport } = req.body || {};

  if (!name || typeof name !== 'string') {
    return res.status(400).json({ error: 'Validation Error: name is required' });
  }

  if (!sport || typeof sport !== 'string') {
    return res.status(400).json({ error: 'Validation Error: sport is required' });
  }

  next();
}

function validateShortlist(req, res, next) {
  const { athleteId } = req.body || {};

  if (!athleteId || typeof athleteId !== 'string') {
    return res.status(400).json({ error: 'Validation Error: athleteId is required' });
  }

  next();
}

module.exports = {
  validateAssessment,
  validateAthlete,
  validateShortlist
};
