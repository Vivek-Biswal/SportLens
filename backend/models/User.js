/**
 * User Model — Authentication Entity for SIH25073
 *
 * Supports ATHLETE and COACH roles.
 * Stores hashed passwords only — never plain text.
 */

const VALID_ROLES = ['ATHLETE', 'COACH'];

class User {
  constructor({ id, name, email, passwordHash, role, createdAt = new Date(), updatedAt = new Date() }) {
    this.id = id;
    this.name = name;
    this.email = email;
    this.passwordHash = passwordHash;
    this.role = role;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
  }

  /**
   * Returns a safe representation of the user (no password hash or secrets).
   */
  toSafeObject() {
    return {
      id: this.id,
      name: this.name,
      email: this.email,
      role: this.role,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt
    };
  }
}

// In-memory data store (consistent with existing model pattern)
const usersStore = [];

/**
 * Find a user by email (case-insensitive).
 */
function findByEmail(email) {
  return usersStore.find(u => u.email.toLowerCase() === email.toLowerCase()) || null;
}

/**
 * Find a user by ID.
 */
function findById(id) {
  return usersStore.find(u => u.id === id) || null;
}

/**
 * Create and store a new user.
 */
function createUser({ name, email, passwordHash, role }) {
  const user = new User({
    id: `usr_${Date.now()}_${Math.random().toString(36).substr(2, 6)}`,
    name,
    email: email.toLowerCase(),
    passwordHash,
    role,
    createdAt: new Date(),
    updatedAt: new Date()
  });

  usersStore.push(user);
  return user;
}

/**
 * Clear all users (used in tests).
 */
function clearUsers() {
  usersStore.length = 0;
}

module.exports = {
  User,
  usersStore,
  findByEmail,
  findById,
  createUser,
  clearUsers,
  VALID_ROLES
};
