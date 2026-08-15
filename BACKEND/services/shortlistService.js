/**
 * Shortlist Service (Module 15)
 */

const { Shortlist, shortlistsStore } = require('../models/Shortlist');
const coachService = require('./coachService');
const athleteService = require('./athleteService');
const profileService = require('./profileService');

class ShortlistService {

  /**
   * Adds an athlete to the authenticated coach's shortlist.
   */
  addAthleteToShortlist(athleteId, user) {
    // 1. Resolve Coach ID
    const coach = coachService.getOrCreateCoachProfile(user);
    
    // 2. Validate Athlete Exists
    // If athlete doesn't exist, this throws ATHLETE_NOT_FOUND (404)
    athleteService.getAthleteById(athleteId, user);
    
    // 3. Prevent Duplicates
    const existingEntry = shortlistsStore.find(s => s.coachId === coach.id && s.athleteId === athleteId);
    if (existingEntry) {
      throw { status: 400, code: 'ATHLETE_ALREADY_SHORTLISTED', message: 'This athlete is already on your shortlist.' };
    }
    
    // 4. Create Shortlist Entry
    const newEntry = new Shortlist({
      id: `shortlist_${Date.now()}_${Math.random().toString(36).substr(2, 4)}`,
      coachId: coach.id,
      athleteId: athleteId
    });
    
    shortlistsStore.push(newEntry);
    
    return newEntry;
  }

  /**
   * Retrieves the authenticated coach's paginated shortlist.
   */
  getShortlist(query, user) {
    // 1. Resolve Coach ID
    const coach = coachService.getOrCreateCoachProfile(user);
    
    const { page = 1, limit = 20, sort_order = 'desc' } = query;
    
    // 2. Fetch coach's shortlist records
    const coachShortlist = shortlistsStore.filter(s => s.coachId === coach.id);
    
    // 3. Sort by created_at (addedAt)
    coachShortlist.sort((a, b) => {
      const diff = new Date(b.addedAt) - new Date(a.addedAt);
      return sort_order.toLowerCase() === 'asc' ? -diff : diff;
    });
    
    // 4. Paginate
    const p = Math.max(1, parseInt(page, 10) || 1);
    const l = Math.min(100, Math.max(1, parseInt(limit, 10) || 20));
    
    const total = coachShortlist.length;
    const total_pages = Math.ceil(total / l);
    const startIndex = (p - 1) * l;
    
    const paginatedRecords = coachShortlist.slice(startIndex, startIndex + l);
    
    // 5. Hydrate with Athlete & Profile data
    const hydratedShortlist = paginatedRecords.map(record => {
      // We know athlete exists if they are in the shortlist, but let's safely fetch
      let athleteJson = null;
      try {
        athleteJson = athleteService.getAthleteById(record.athleteId, user).toJSON();
      } catch (e) {
        athleteJson = { id: record.athleteId, name: 'Unknown', error: 'Athlete data missing' };
      }
      
      let profileJson = null;
      try {
        profileJson = profileService.generateProfile(record.athleteId, user).toJSON();
      } catch (e) {
        profileJson = null;
      }
      
      return {
        id: record.id,
        athlete: athleteJson,
        performance_profile: profileJson,
        created_at: record.addedAt
      };
    });
    
    return {
      shortlist: hydratedShortlist,
      pagination: {
        page: p,
        limit: l,
        total,
        total_pages
      }
    };
  }

  /**
   * Removes an athlete from the authenticated coach's shortlist.
   */
  removeAthleteFromShortlist(athleteId, user) {
    // 1. Resolve Coach ID
    const coach = coachService.getOrCreateCoachProfile(user);
    
    // 2. Find exact index matching coachId AND athleteId
    const index = shortlistsStore.findIndex(s => s.coachId === coach.id && s.athleteId === athleteId);
    
    // 3. Remove or Throw
    if (index === -1) {
      throw { status: 404, code: 'SHORTLIST_ENTRY_NOT_FOUND', message: 'Athlete is not on your shortlist.' };
    }
    
    shortlistsStore.splice(index, 1);
    return true;
  }
}

module.exports = new ShortlistService();
