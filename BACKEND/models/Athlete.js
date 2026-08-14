/**
 * Athlete Model
 */

class Athlete {
  constructor({ id, name, email, sport, age, gender, heightCm, weightKg, createdAt = new Date() }) {
    this.id = id;
    this.name = name;
    this.email = email;
    this.sport = sport;
    this.age = age;
    this.gender = gender;
    this.heightCm = heightCm;
    this.weightKg = weightKg;
    this.createdAt = createdAt;
  }
}

// In-memory data store for structural setup
const athletesStore = [];

module.exports = {
  Athlete,
  athletesStore
};
