/**
 * Authentication Service — Business Logic for SIH25073 Auth Module
 *
 * Handles registration, login, and current-user retrieval.
 * Uses bcryptjs for password hashing and jsonwebtoken for JWT.
 */

const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { findByEmail, findById, createUser, VALID_ROLES } = require('../models/User');

const BCRYPT_SALT_ROUNDS = 12;

/**
 * Register a new user.
 * @returns {{ success, user, token } | { success, error, message }}
 */
async function register({ name, email, password, role }) {
  // Normalize role to uppercase
  const normalizedRole = (role || '').toUpperCase();

  // Validate role
  if (!VALID_ROLES.includes(normalizedRole)) {
    return {
      status: 400,
      body: {
        success: false,
        error: 'INVALID_ROLE',
        message: `Role must be one of: ${VALID_ROLES.join(', ')}.`
      }
    };
  }

  // Check for duplicate email
  const existing = findByEmail(email);
  if (existing) {
    return {
      status: 409,
      body: {
        success: false,
        error: 'EMAIL_ALREADY_EXISTS',
        message: 'An account with this email already exists.'
      }
    };
  }

  // Hash password
  const passwordHash = await bcrypt.hash(password, BCRYPT_SALT_ROUNDS);

  // Create user
  const user = createUser({
    name,
    email,
    passwordHash,
    role: normalizedRole
  });

  // Generate JWT
  const token = generateToken(user);

  return {
    status: 201,
    body: {
      success: true,
      message: 'User registered successfully.',
      user: user.toSafeObject(),
      token
    }
  };
}

/**
 * Authenticate a user with email and password.
 * @returns {{ success, user, token } | { success, error, message }}
 */
async function login({ email, password }) {
  // Find user
  const user = findByEmail(email);
  if (!user) {
    return {
      status: 401,
      body: {
        success: false,
        error: 'INVALID_CREDENTIALS',
        message: 'Invalid email or password.'
      }
    };
  }

  // Verify password
  const isValidPassword = await bcrypt.compare(password, user.passwordHash);
  if (!isValidPassword) {
    return {
      status: 401,
      body: {
        success: false,
        error: 'INVALID_CREDENTIALS',
        message: 'Invalid email or password.'
      }
    };
  }

  // Generate JWT
  const token = generateToken(user);

  return {
    status: 200,
    body: {
      success: true,
      message: 'Login successful.',
      user: user.toSafeObject(),
      token
    }
  };
}

/**
 * Get current authenticated user by ID.
 */
function getCurrentUser(userId) {
  const user = findById(userId);
  if (!user) {
    return {
      status: 404,
      body: {
        success: false,
        error: 'USER_NOT_FOUND',
        message: 'User not found.'
      }
    };
  }

  return {
    status: 200,
    body: {
      success: true,
      user: user.toSafeObject()
    }
  };
}

/**
 * Generate a JWT for a user.
 */
function generateToken(user) {
  const secret = process.env.JWT_SECRET || 'sih25073_default_dev_secret';
  const expiresIn = process.env.JWT_EXPIRES_IN || '24h';

  return jwt.sign(
    {
      id: user.id,
      email: user.email,
      role: user.role
    },
    secret,
    { expiresIn }
  );
}

module.exports = {
  register,
  login,
  getCurrentUser,
  generateToken
};
