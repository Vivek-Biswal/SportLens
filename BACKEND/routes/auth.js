/**
 * Authentication Routes — SIH25073 Module 1
 *
 * POST /register  — Register a new ATHLETE or COACH
 * POST /login     — Authenticate and receive JWT
 * POST /logout    — Logout (stateless JWT — client discards token)
 * GET  /me        — Get current authenticated user
 */

const express = require('express');
const router = express.Router();
const { authenticateToken } = require('../middleware/authentication');
const { validateRegistration, validateLogin } = require('../middleware/validation');
const authService = require('../services/authService');

/**
 * POST /api/auth/register
 */
router.post('/register', validateRegistration, async (req, res) => {
  try {
    const { name, email, password, role } = req.body;
    const result = await authService.register({ name, email, password, role });
    return res.status(result.status).json(result.body);
  } catch (error) {
    console.error('[Auth Register Error]', error.message);
    return res.status(500).json({
      success: false,
      error: 'SERVER_ERROR',
      message: 'An unexpected error occurred. Please try again.'
    });
  }
});

/**
 * POST /api/auth/login
 */
router.post('/login', validateLogin, async (req, res) => {
  try {
    const { email, password } = req.body;
    const result = await authService.login({ email, password });
    return res.status(result.status).json(result.body);
  } catch (error) {
    console.error('[Auth Login Error]', error.message);
    return res.status(500).json({
      success: false,
      error: 'SERVER_ERROR',
      message: 'An unexpected error occurred. Please try again.'
    });
  }
});

/**
 * POST /api/auth/logout
 *
 * For stateless JWT: the server acknowledges the logout request.
 * The client is responsible for discarding the token.
 */
router.post('/logout', authenticateToken, (req, res) => {
  return res.status(200).json({
    success: true,
    message: 'Logout successful.'
  });
});

/**
 * GET /api/auth/me
 */
router.get('/me', authenticateToken, (req, res) => {
  try {
    const result = authService.getCurrentUser(req.user.id);
    return res.status(result.status).json(result.body);
  } catch (error) {
    console.error('[Auth Me Error]', error.message);
    return res.status(500).json({
      success: false,
      error: 'SERVER_ERROR',
      message: 'An unexpected error occurred. Please try again.'
    });
  }
});

module.exports = router;
