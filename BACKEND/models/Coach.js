/**
 * Coach Model (Module 3)
 */

class Coach {
  constructor({ 
    id, 
    userId, // Foreign key to User
    name, 
    email, 
    organization, 
    specialization, 
    createdAt = new Date(),
    updatedAt = new Date()
  }) {
    this.id = id;
    this.userId = userId;
    this.name = name;
    this.email = email;
    this.organization = organization;
    this.specialization = specialization;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
  }

  toJSON() {
    return {
      id: this.id,
      user_id: this.userId,
      name: this.name,
      email: this.email,
      organization: this.organization,
      specialization: this.specialization,
      created_at: this.createdAt,
      updated_at: this.updatedAt
    };
  }
}

// In-memory data store
const coachesStore = [];

function clearCoaches() {
  coachesStore.length = 0;
}

module.exports = {
  Coach,
  coachesStore,
  clearCoaches
};
