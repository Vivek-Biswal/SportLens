/**
 * Authentication Routes
 */

const express = require('express');
const router = express.Router();
const { authenticateToken } = require('../middleware/authentication');

router.post('/login', (req, res) => {
  const { email, password } = req.body || {};
  if (!email) {
    return res.status(400).json({ error: 'Email is required' });
  }

  res.json({
    message: 'Authentication successful',
    token: 'mock-jwt-token-sih25073',
    user: {
      id: 'usr_demo_1',
      email,
      role: 'coach'
    }
  });
});

router.post('/register', (req, res) => {
  const { name, email, role } = req.body || {};
  res.status(201).json({
    message: 'User registered successfully',
    user: { id: `usr_${Date.now()}`, name, email, role: role || 'athlete' }
  });
});

router.get('/me', authenticateToken, (req, res) => {
  res.json({ user: req.user });
});

module.exports = router;
