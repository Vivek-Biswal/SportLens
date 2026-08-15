/**
 * Validation Middleware (Module 17)
 */

const { VALID_TEST_TYPES } = require('../models/Assessment');

// ─── Core Validation Helper ────────────────────────────────────────────────

function sendValidationError(res, details) {
  return res.status(400).json({
    success: false,
    error: 'VALIDATION_ERROR',
    message: 'Request validation failed.',
    details
  });
}

// ─── Path Parameters Validation ──────────────────────────────────────────────

function validatePathId(req, res, next) {
  const { id } = req.params;
  const errors = [];

  if (!id || typeof id !== 'string' || id.trim().length === 0) {
    errors.push({ field: 'id', message: 'Path ID is missing or malformed.' });
  }

  if (errors.length > 0) {
    return sendValidationError(res, errors);
  }
  next();
}

// ─── Athlete Validation ──────────────────────────────────────────────────────

function validateAthlete(req, res, next) {
  const { name, age, gender, location, sport } = req.body || {};
  const errors = [];

  if (!name || typeof name !== 'string' || name.trim().length === 0) {
    errors.push({ field: 'name', message: 'Name must be a non-empty string.' });
  }

  if (age !== undefined) {
    if (typeof age !== 'number' || !Number.isInteger(age) || age < 0) {
      errors.push({ field: 'age', message: 'Age must be a positive integer.' });
    }
  }

  if (gender !== undefined && typeof gender !== 'string') {
    errors.push({ field: 'gender', message: 'Gender must be a string.' });
  }

  if (location !== undefined && typeof location !== 'string') {
    errors.push({ field: 'location', message: 'Location must be a string.' });
  }

  if (!sport || typeof sport !== 'string' || sport.trim().length === 0) {
    errors.push({ field: 'sport', message: 'Sport must be a non-empty string.' });
  }

  if (errors.length > 0) {
    return sendValidationError(res, errors);
  }
  next();
}

// ─── Assessment Validation ───────────────────────────────────────────────────

function validateAssessment(req, res, next) {
  const { athlete_id, test_type } = req.body || {};
  const errors = [];

  if (!athlete_id || typeof athlete_id !== 'string') {
    errors.push({ field: 'athlete_id', message: 'athlete_id is required.' });
  }

  if (!test_type || typeof test_type !== 'string') {
    errors.push({ field: 'test_type', message: 'test_type is required.' });
  } else if (!VALID_TEST_TYPES.includes(test_type)) {
    errors.push({ field: 'test_type', message: `Invalid test_type. Allowed values are: ${VALID_TEST_TYPES.join(', ')}` });
  }

  if (errors.length > 0) {
    return sendValidationError(res, errors);
  }
  next();
}

// ─── CV Result Validation ────────────────────────────────────────────────────

const UNIT_MAP = {
  vertical_jump: 'cm',
  sprint: 'sec',
  agility: 'sec'
};

function validateCVResult(req, res, next) {
  const { test_type, result, unit, confidence, status } = req.body || {};
  const errors = [];

  // test_type
  if (!test_type || typeof test_type !== 'string') {
    errors.push({ field: 'test_type', message: 'test_type is required.' });
  } else if (!VALID_TEST_TYPES.includes(test_type)) {
    errors.push({ field: 'test_type', message: `Invalid test_type. Allowed values are: ${VALID_TEST_TYPES.join(', ')}` });
  }

  // result
  if (result === undefined || result === null || typeof result !== 'number' || Number.isNaN(result)) {
    errors.push({ field: 'result', message: 'Result must be a valid number.' });
  }

  // unit
  if (test_type && VALID_TEST_TYPES.includes(test_type)) {
    const expectedUnit = UNIT_MAP[test_type];
    if (unit !== expectedUnit) {
      errors.push({ field: 'unit', message: `Unit for ${test_type} must be '${expectedUnit}'.` });
    }
  }

  // confidence
  if (confidence === undefined || confidence === null || typeof confidence !== 'number' || Number.isNaN(confidence) || confidence < 0 || confidence > 1) {
    errors.push({ field: 'confidence', message: 'Confidence must be a number between 0 and 1.' });
  }

  // status
  if (!status || (status !== 'valid' && status !== 'invalid')) {
    errors.push({ field: 'status', message: 'Status must be either "valid" or "invalid".' });
  }

  if (errors.length > 0) {
    return sendValidationError(res, errors);
  }
  next();
}

// ─── Shortlist Validation ────────────────────────────────────────────────────

function validateShortlist(req, res, next) {
  const { athleteId } = req.body || {};
  const errors = [];

  if (!athleteId || typeof athleteId !== 'string') {
    errors.push({ field: 'athleteId', message: 'athleteId is required.' });
  }

  if (errors.length > 0) {
    return sendValidationError(res, errors);
  }
  next();
}

// ─── Authentication Validators (Module 1) ────────────────────────────────────

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PASSWORD_MIN_LENGTH = 8;
const PASSWORD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).+$/;
const VALID_ROLES = ['ATHLETE', 'COACH'];

function validateRegistration(req, res, next) {
  const { name, email, password, role } = req.body || {};
  const errors = [];

  if (!name || typeof name !== 'string' || name.trim().length === 0) {
    errors.push({ field: 'name', message: 'Name is required.' });
  }

  if (!email || typeof email !== 'string' || !EMAIL_REGEX.test(email)) {
    errors.push({ field: 'email', message: 'A valid email address is required.' });
  }

  if (!password || typeof password !== 'string') {
    errors.push({ field: 'password', message: 'Password is required.' });
  } else if (password.length < PASSWORD_MIN_LENGTH) {
    errors.push({ field: 'password', message: `Password must be at least ${PASSWORD_MIN_LENGTH} characters long.` });
  } else if (!PASSWORD_REGEX.test(password)) {
    errors.push({ field: 'password', message: 'Password must contain at least one uppercase letter, one lowercase letter, and one digit.' });
  }

  if (!role || !VALID_ROLES.includes((role || '').toUpperCase())) {
    errors.push({ field: 'role', message: `Role must be one of: ${VALID_ROLES.join(', ')}.` });
  }

  if (errors.length > 0) {
    return sendValidationError(res, errors);
  }
  next();
}

function validateLogin(req, res, next) {
  const { email, password } = req.body || {};
  const errors = [];

  if (!email || typeof email !== 'string') {
    errors.push({ field: 'email', message: 'Email is required.' });
  }

  if (!password || typeof password !== 'string') {
    errors.push({ field: 'password', message: 'Password is required.' });
  }

  if (errors.length > 0) {
    return sendValidationError(res, errors);
  }
  next();
}

// ─── Assessment Conditions Validation (Module 7) ─────────────────────────────

function validateConditions(req, res, next) {
  const { device, lighting, camera_position, surface, footwear } = req.body || {};
  const errors = [];

  if (device !== undefined && typeof device !== 'string') {
    errors.push({ field: 'device', message: 'Device must be a string.' });
  }

  if (lighting !== undefined && typeof lighting !== 'string') {
    errors.push({ field: 'lighting', message: 'Lighting must be a string.' });
  }

  if (camera_position !== undefined && typeof camera_position !== 'string') {
    errors.push({ field: 'camera_position', message: 'Camera position must be a string.' });
  }

  if (surface !== undefined && typeof surface !== 'string') {
    errors.push({ field: 'surface', message: 'Surface must be a string.' });
  }

  if (footwear !== undefined && typeof footwear !== 'string') {
    errors.push({ field: 'footwear', message: 'Footwear must be a string.' });
  }

  if (errors.length > 0) {
    return sendValidationError(res, errors);
  }
  next();
}

// ─── Athlete Search Validation (Module 13) ─────────────────────────────────

function validateAthleteSearch(req, res, next) {
  const { page, limit, min_confidence, sort_by, sort_order } = req.query;
  const errors = [];

  if (page !== undefined) {
    const p = parseInt(page, 10);
    if (isNaN(p) || p < 1) errors.push({ field: 'page', message: 'Page must be an integer >= 1' });
  }

  if (limit !== undefined) {
    const l = parseInt(limit, 10);
    if (isNaN(l) || l < 1 || l > 100) errors.push({ field: 'limit', message: 'Limit must be an integer between 1 and 100' });
  }

  if (min_confidence !== undefined) {
    const c = parseFloat(min_confidence);
    if (isNaN(c) || c < 0 || c > 1) errors.push({ field: 'min_confidence', message: 'min_confidence must be between 0 and 1' });
  }

  const validSortFields = ['name', 'age', 'created_at', 'overall_confidence'];
  if (sort_by !== undefined && !validSortFields.includes(sort_by)) {
    errors.push({ field: 'sort_by', message: `sort_by must be one of: ${validSortFields.join(', ')}` });
  }

  if (sort_order !== undefined && !['asc', 'desc'].includes(sort_order.toLowerCase())) {
    errors.push({ field: 'sort_order', message: 'sort_order must be asc or desc' });
  }

  if (errors.length > 0) {
    return sendValidationError(res, errors);
  }
  
  next();
}

// ─── Athlete History Validation (Module 14) ────────────────────────────────

function validateHistoryQuery(req, res, next) {
  const { page, limit, test_type } = req.query;
  const errors = [];

  if (page !== undefined) {
    const p = parseInt(page, 10);
    if (isNaN(p) || p < 1) errors.push({ field: 'page', message: 'Page must be an integer >= 1' });
  }

  if (limit !== undefined) {
    const l = parseInt(limit, 10);
    if (isNaN(l) || l < 1 || l > 100) errors.push({ field: 'limit', message: 'Limit must be an integer between 1 and 100' });
  }

  if (test_type !== undefined) {
    const validTypes = ['vertical_jump', 'sprint', 'agility'];
    if (!validTypes.includes(test_type)) {
      errors.push({ field: 'test_type', message: `test_type must be one of: ${validTypes.join(', ')}` });
    }
  }

  if (errors.length > 0) {
    return sendValidationError(res, errors);
  }
  
  next();
}

// ─── Shortlist Validation (Module 15) ──────────────────────────────────────

function validateShortlistQuery(req, res, next) {
  const { page, limit, sort_by, sort_order } = req.query;
  const errors = [];

  if (page !== undefined) {
    const p = parseInt(page, 10);
    if (isNaN(p) || p < 1) errors.push({ field: 'page', message: 'Page must be an integer >= 1' });
  }

  if (limit !== undefined) {
    const l = parseInt(limit, 10);
    if (isNaN(l) || l < 1 || l > 100) errors.push({ field: 'limit', message: 'Limit must be an integer between 1 and 100' });
  }

  const validSortFields = ['created_at'];
  if (sort_by !== undefined && !validSortFields.includes(sort_by)) {
    errors.push({ field: 'sort_by', message: `sort_by must be one of: ${validSortFields.join(', ')}` });
  }

  if (sort_order !== undefined && !['asc', 'desc'].includes(sort_order.toLowerCase())) {
    errors.push({ field: 'sort_order', message: 'sort_order must be asc or desc' });
  }

  if (errors.length > 0) {
    return sendValidationError(res, errors);
  }
  
  next();
}

function validateShortlistPost(req, res, next) {
  const { athlete_id } = req.body || {};
  if (!athlete_id) {
    return sendValidationError(res, [{ field: 'athlete_id', message: 'athlete_id is required' }]);
  }
  next();
}

module.exports = {
  validatePathId,
  validateAssessment,
  validateCVResult,
  validateAthlete,
  validateShortlist,
  validateConditions,
  validateAthleteSearch,
  validateHistoryQuery,
  validateShortlistQuery,
  validateShortlistPost,
  validateRegistration,
  validateLogin
};


