/**
 * Shortlist Service - Business Logic for Coach Shortlisting & Scouting Pools
 */

const { Shortlist, shortlistsStore } = require('../models/Shortlist');

class ShortlistService {
  addToShortlist(coachId, athleteId, notes = '') {
    const existing = shortlistsStore.find(s => s.coachId === coachId && s.athleteId === athleteId);
    if (existing) {
      existing.notes = notes || existing.notes;
      return existing;
    }

    const item = new Shortlist({
      id: `sl_${Date.now()}_${Math.random().toString(36).substr(2, 4)}`,
      coachId,
      athleteId,
      status: 'interested',
      notes
    });

    shortlistsStore.push(item);
    return item;
  }

  getShortlistByCoach(coachId) {
    return shortlistsStore.filter(s => s.coachId === coachId);
  }

  removeFromShortlist(coachId, athleteId) {
    const idx = shortlistsStore.findIndex(s => s.coachId === coachId && s.athleteId === athleteId);
    if (idx !== -1) {
      return shortlistsStore.splice(idx, 1)[0];
    }
    return null;
  }
}

module.exports = new ShortlistService();
