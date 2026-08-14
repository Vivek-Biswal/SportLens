/**
 * Shortlist Model
 */

class Shortlist {
  constructor({ id, coachId, athleteId, status = 'interested', notes = '', addedAt = new Date() }) {
    this.id = id;
    this.coachId = coachId;
    this.athleteId = athleteId;
    this.status = status;
    this.notes = notes;
    this.addedAt = addedAt;
  }
}

const shortlistsStore = [];

module.exports = {
  Shortlist,
  shortlistsStore
};
