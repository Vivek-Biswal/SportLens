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
  toJSON() {
    return {
      id: this.id,
      coach_id: this.coachId,
      athlete_id: this.athleteId,
      status: this.status,
      notes: this.notes,
      created_at: this.addedAt
    };
  }
}

const shortlistsStore = [];

function clearShortlists() {
  shortlistsStore.length = 0;
}

module.exports = {
  Shortlist,
  shortlistsStore,
  clearShortlists
};
