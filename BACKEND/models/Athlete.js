/**
 * Athlete Model (Module 2)
 */

class Athlete {
  constructor({ 
    id, 
    userId, // Foreign key to User
    name, 
    age, 
    gender, 
    location, 
    sport, 
    createdAt = new Date(),
    updatedAt = new Date()
  }) {
    this.id = id;
    this.userId = userId;
    this.name = name;
    this.age = age;
    this.gender = gender;
    this.location = location;
    this.sport = sport;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
  }

  toJSON() {
    return {
      id: this.id,
      user_id: this.userId,
      name: this.name,
      age: this.age,
      gender: this.gender,
      location: this.location,
      sport: this.sport,
      created_at: this.createdAt,
      updated_at: this.updatedAt
    };
  }
}

// In-memory data store
const athletesStore = [];

function clearAthletes() {
  athletesStore.length = 0;
}

module.exports = {
  Athlete,
  athletesStore,
  clearAthletes
};
