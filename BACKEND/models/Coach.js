/**
 * Coach Model
 */

class Coach {
  constructor({ id, name, email, organization, specialization, createdAt = new Date() }) {
    this.id = id;
    this.name = name;
    this.email = email;
    this.organization = organization;
    this.specialization = specialization;
    this.createdAt = createdAt;
  }
}

const coachesStore = [];

module.exports = {
  Coach,
  coachesStore
};
