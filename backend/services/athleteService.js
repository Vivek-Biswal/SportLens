/**
 * Athlete Service (Module 2)
 */

const { Athlete, athletesStore } = require('../models/Athlete');

class AthleteService {

  /**
   * Creates a new athlete profile linked to the authenticated user.
   * Prevents duplicate profiles for the same user.
   */
  createAthlete(data, user) {
    if (!user || !user.id) {
      throw { status: 401, code: 'UNAUTHORIZED', message: 'User is not authenticated.' };
    }

    // Check for duplicate profile
    const existingProfile = athletesStore.find(a => a.userId === user.id);
    if (existingProfile) {
      throw { status: 400, code: 'ATHLETE_PROFILE_EXISTS', message: 'An athlete profile already exists for this account.' };
    }

    const newAthlete = new Athlete({
      id: `ath_${Date.now()}_${Math.random().toString(36).substr(2, 4)}`,
      userId: user.id,
      name: data.name,
      age: data.age,
      gender: data.gender,
      location: data.location,
      sport: data.sport
    });

    athletesStore.push(newAthlete);
    return newAthlete;
  }

  /**
   * Retrieves an athlete by ID with authorization checks.
   */
  getAthleteById(athleteId, user) {
    const athlete = athletesStore.find(a => a.id === athleteId);
    
    if (!athlete) {
      throw { status: 404, code: 'ATHLETE_NOT_FOUND', message: 'Athlete does not exist.' };
    }

    // Authorization: Athlete can only view their own profile. Coach can view any.
    if (user.role === 'ATHLETE' && athlete.userId !== user.id) {
      throw { status: 403, code: 'FORBIDDEN', message: 'You do not have permission to view this profile.' };
    }

    return athlete;
  }

  /**
   * Retrieves all athletes.
   * For athletes, returns only their own profile.
   * For coaches, returns all profiles.
   */
  getAllAthletes(user) {
    if (user.role === 'ATHLETE') {
      return athletesStore.filter(a => a.userId === user.id);
    }
    
    // Coaches can view the whole directory
    return athletesStore;
  }

}

module.exports = new AthleteService();
