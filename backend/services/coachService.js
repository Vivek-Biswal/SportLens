/**
 * Coach Service (Modules 3 + 12)
 */

const { Coach, coachesStore } = require('../models/Coach');
const { athletesStore } = require('../models/Athlete');
const { assessmentsStore } = require('../models/Assessment');
const { attemptsStore } = require('../models/Attempt');

// Configurable dashboard limits
const DASHBOARD_CONFIG = {
  RECENT_ASSESSMENTS_LIMIT: 10,
  RECENT_RESULTS_LIMIT: 10
};

class CoachService {

  /**
   * Finds or auto-creates a Coach record linked to the authenticated user.
   * Since the MVP flow is Coach → Login (not public registration),
   * we lazily create the Coach record on first access.
   */
  getOrCreateCoachProfile(user) {
    let coach = coachesStore.find(c => c.userId === user.id);
    if (!coach) {
      coach = new Coach({
        id: `coach_${Date.now()}_${Math.random().toString(36).substr(2, 4)}`,
        userId: user.id,
        name: user.email,
        email: user.email
      });
      coachesStore.push(coach);
    }
    return coach;
  }

  /**
   * Retrieves full dashboard data for the authenticated coach (Module 12).
   */
  getDashboardData(user) {
    const coach = this.getOrCreateCoachProfile(user);

    // ─── Statistics ────────────────────────────────────────────────────
    const totalAthletes = athletesStore.length;
    const totalAssessments = assessmentsStore.length;
    const completedAssessments = assessmentsStore.filter(a => a.status === 'completed').length;
    const inProgressAssessments = assessmentsStore.filter(a => a.status === 'in_progress').length;

    // ─── Recent Assessments (newest first, configurable limit) ────────
    const sortedAssessments = [...assessmentsStore]
      .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
      .slice(0, DASHBOARD_CONFIG.RECENT_ASSESSMENTS_LIMIT);

    const recentAssessments = sortedAssessments.map(asm => {
      const athlete = athletesStore.find(a => a.id === asm.athleteId);
      return {
        assessment_id: asm.id,
        athlete_id: asm.athleteId,
        athlete_name: athlete ? athlete.name : 'Unknown',
        test_type: asm.testType,
        status: asm.status,
        created_at: asm.createdAt
      };
    });

    // ─── Recent Results (final valid attempts, newest first) ──────────
    // Collect final results per assessment using the same logic as Module 8
    // but without calling getFinalResultsForAthlete (which requires a specific athlete)
    const assessmentService = require('./assessmentService');
    const recentResults = this._getRecentFinalResults(assessmentService);

    return {
      coach: coach.toJSON(),
      statistics: {
        total_athletes: totalAthletes,
        total_assessments: totalAssessments,
        completed_assessments: completedAssessments,
        in_progress_assessments: inProgressAssessments
      },
      recent_assessments: recentAssessments,
      recent_results: recentResults
    };
  }

  /**
   * Aggregates recent final results across all assessments.
   * Reuses the same best-attempt selection logic from Module 8's TEST_RESULT_RULES.
   * Avoids N+1 by iterating stores directly.
   */
  _getRecentFinalResults() {
    const TEST_RESULT_RULES = {
      vertical_jump: 'MAX',
      sprint: 'MIN',
      agility: 'MIN'
    };

    const results = [];

    for (const assessment of assessmentsStore) {
      const attempts = attemptsStore.filter(a => a.assessmentId === assessment.id);
      const validAttempts = attempts.filter(a => a.status === 'valid' && a.result !== null && a.result !== undefined);

      if (validAttempts.length === 0) continue;

      const rule = TEST_RESULT_RULES[assessment.testType] || 'MAX';
      let bestAttempt = validAttempts[0];
      for (let i = 1; i < validAttempts.length; i++) {
        if (rule === 'MAX' && validAttempts[i].result > bestAttempt.result) {
          bestAttempt = validAttempts[i];
        } else if (rule === 'MIN' && validAttempts[i].result < bestAttempt.result) {
          bestAttempt = validAttempts[i];
        }
      }

      const athlete = athletesStore.find(a => a.id === assessment.athleteId);

      results.push({
        assessment_id: assessment.id,
        athlete_id: assessment.athleteId,
        athlete_name: athlete ? athlete.name : 'Unknown',
        test_type: assessment.testType,
        result: bestAttempt.result,
        unit: bestAttempt.unit,
        confidence: bestAttempt.confidence,
        status: bestAttempt.status,
        timestamp: bestAttempt.timestamp
      });
    }

    // Sort by timestamp descending, limit
    results.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));
    return results.slice(0, DASHBOARD_CONFIG.RECENT_RESULTS_LIMIT);
  }

  /**
   * Returns the athlete directory for the coach with search, filtering, and pagination.
   * Module 13 implementation.
   */
  getAthletesDirectory(query = {}) {
    const {
      search, sport, age, gender, location,
      speed, explosiveness, agility, overall_category, min_confidence,
      page = 1, limit = 20, sort_by = 'created_at', sort_order = 'desc'
    } = query;

    const profileService = require('./profileService');
    
    // 1. Base query on athletesStore
    let results = [...athletesStore];

    // 2. Profile Filters
    if (search) {
      const s = search.toLowerCase();
      results = results.filter(a => a.name && a.name.toLowerCase().includes(s));
    }
    if (sport) results = results.filter(a => a.sport && a.sport.toLowerCase() === sport.toLowerCase());
    if (age) results = results.filter(a => a.age === Number(age));
    if (gender) results = results.filter(a => a.gender && a.gender.toLowerCase() === gender.toLowerCase());
    if (location) results = results.filter(a => a.location && a.location.toLowerCase() === location.toLowerCase());

    // 3. Attach Performance Profiles and filter by them if needed
    // The blueprint expects `performance_profile` to be embedded if it exists.
    results = results.map(athlete => {
      let profile = null;
      try {
        // profileService.generateProfile(athlete.id) throws if insufficient data, 
        // we'll catch and return null for the profile.
        // Also it needs `user` context for authorization, but since we are executing 
        // as a coach service, we bypass standard auth or mock it.
        const mockCoachContext = { role: 'COACH' };
        profile = profileService.generateProfile(athlete.id, mockCoachContext).toJSON();
      } catch (e) {
        profile = null; // No profile available
      }
      return { ...athlete.toJSON(), performance_profile: profile };
    });

    // 4. Performance Filters
    const hasPerfFilters = speed || explosiveness || agility || overall_category || min_confidence !== undefined;
    if (hasPerfFilters) {
      results = results.filter(athlete => {
        const p = athlete.performance_profile;
        if (!p) return false; // Fails performance filters if no profile

        if (speed && p.speed.category !== speed) return false;
        if (explosiveness && p.explosiveness.category !== explosiveness) return false;
        if (agility && p.agility.category !== agility) return false;
        if (overall_category && p.overall_category !== overall_category) return false;
        if (min_confidence !== undefined && p.overall_confidence < Number(min_confidence)) return false;

        return true;
      });
    }

    // 5. Sorting
    results.sort((a, b) => {
      let valA, valB;
      
      if (sort_by === 'overall_confidence') {
        valA = a.performance_profile ? a.performance_profile.overall_confidence : -1;
        valB = b.performance_profile ? b.performance_profile.overall_confidence : -1;
      } else {
        valA = a[sort_by];
        valB = b[sort_by];
      }

      if (valA < valB) return sort_order.toLowerCase() === 'asc' ? -1 : 1;
      if (valA > valB) return sort_order.toLowerCase() === 'asc' ? 1 : -1;
      return 0;
    });

    // 6. Pagination
    const p = Math.max(1, parseInt(page, 10) || 1);
    const l = Math.min(100, Math.max(1, parseInt(limit, 10) || 20));
    
    const total = results.length;
    const total_pages = Math.ceil(total / l);
    const startIndex = (p - 1) * l;
    
    const paginatedAthletes = results.slice(startIndex, startIndex + l);

    return {
      athletes: paginatedAthletes,
      pagination: {
        page: p,
        limit: l,
        total,
        total_pages
      }
    };
  }

  /**
   * Retrieves a specific athlete's profile by ID.
   */
  getAthleteProfile(athleteId) {
    const athlete = athletesStore.find(a => a.id === athleteId);

    if (!athlete) {
      throw { status: 404, code: 'ATHLETE_NOT_FOUND', message: 'Athlete does not exist.' };
    }

    return athlete;
  }
}

module.exports = new CoachService();
