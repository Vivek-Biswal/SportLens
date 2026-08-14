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

// ─── Authentication Validators (Module 1) ───────────────────────────────────

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PASSWORD_MIN_LENGTH = 8;
const PASSWORD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).+$/;
const VALID_ROLES = ['ATHLETE', 'COACH'];

function validateRegistration(req, res, next) {
  const { name, email, password, role } = req.body || {};

  if (!name || typeof name !== 'string' || name.trim().length === 0) {
    return res.status(400).json({
      success: false,
      error: 'VALIDATION_ERROR',
      message: 'Name is required.'
    });
  }

  if (!email || typeof email !== 'string') {
    return res.status(400).json({
      success: false,
      error: 'VALIDATION_ERROR',
      message: 'Email is required.'
    });
  }

  if (!EMAIL_REGEX.test(email)) {
    return res.status(400).json({
      success: false,
      error: 'VALIDATION_ERROR',
      message: 'A valid email address is required.'
    });
  }

  if (!password || typeof password !== 'string') {
    return res.status(400).json({
      success: false,
      error: 'VALIDATION_ERROR',
      message: 'Password is required.'
    });
  }

  if (password.length < PASSWORD_MIN_LENGTH) {
    return res.status(400).json({
      success: false,
      error: 'VALIDATION_ERROR',
      message: `Password must be at least ${PASSWORD_MIN_LENGTH} characters long.`
    });
  }

  if (!PASSWORD_REGEX.test(password)) {
    return res.status(400).json({
      success: false,
      error: 'VALIDATION_ERROR',
      message: 'Password must contain at least one uppercase letter, one lowercase letter, and one digit.'
    });
  }

  if (!role || !VALID_ROLES.includes((role || '').toUpperCase())) {
    return res.status(400).json({
      success: false,
      error: 'VALIDATION_ERROR',
      message: `Role must be one of: ${VALID_ROLES.join(', ')}.`
    });
  }

  next();
}

function validateLogin(req, res, next) {
  const { email, password } = req.body || {};

  if (!email || typeof email !== 'string') {
    return res.status(400).json({
      success: false,
      error: 'VALIDATION_ERROR',
      message: 'Email is required.'
    });
  }

  if (!password || typeof password !== 'string') {
    return res.status(400).json({
      success: false,
      error: 'VALIDATION_ERROR',
      message: 'Password is required.'
    });
  }

  next();
}

module.exports = {
  validateAssessment,
  validateAthlete,
  validateShortlist,
  validateRegistration,
  validateLogin
};
