/**
 * Athlete History Service (Module 14)
 */

const athleteService = require('./athleteService');
const assessmentService = require('./assessmentService');
const profileService = require('./profileService');
const { conditionsStore } = require('../models/AssessmentCondition');

class AthleteHistoryService {

  /**
   * Retrieves the paginated history of assessments and results for an athlete.
   */
  getHistory(athleteId, query, user) {
    // 1. Authorize: Ensure athlete exists and user is allowed to view them
    athleteService.getAthleteById(athleteId, user);

    const { page = 1, limit = 20, test_type } = query;

    // 2. Fetch all assessments for this athlete
    // We bypass the user check here since we already authorized the user for this athlete
    const { assessmentsStore } = require('../models/Assessment');
    let assessments = assessmentsStore.filter(a => a.athleteId === athleteId);

    // 3. Filter by test_type if provided
    if (test_type) {
      assessments = assessments.filter(a => a.testType === test_type);
    }

    // 4. Sort chronologically (newest first)
    assessments.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

    // 5. Paginate
    const p = Math.max(1, parseInt(page, 10) || 1);
    const l = Math.min(100, Math.max(1, parseInt(limit, 10) || 20));
    
    const total = assessments.length;
    const total_pages = Math.ceil(total / l);
    const startIndex = (p - 1) * l;
    
    const paginatedAssessments = assessments.slice(startIndex, startIndex + l);

    // 6. Aggregate data for the paginated slice
    const { attemptsStore } = require('../models/Attempt');
    
    const history = paginatedAssessments.map(asm => {
      // Get attempts
      const attempts = attemptsStore.filter(att => att.assessmentId === asm.id)
        .map(att => att.toJSON());

      // Get conditions
      const conditionRecord = conditionsStore.find(c => c.assessmentId === asm.id);
      
      let conditionJson = null;
      if (conditionRecord) {
        const c = conditionRecord.toJSON();
        conditionJson = {
          device: c.device,
          lighting: c.lighting,
          camera_position: c.camera_position,
          surface: c.surface,
          footwear: c.footwear
        };
      }

      // Calculate final result using Module 8 logic
      let finalResultJson = null;
      if (asm.status === 'completed') {
        // Module 8 logic: MAX for vertical_jump, MIN for sprint/agility
        const TEST_RESULT_RULES = {
          vertical_jump: 'MAX',
          sprint: 'MIN',
          agility: 'MIN'
        };
        const rule = TEST_RESULT_RULES[asm.testType] || 'MAX';
        
        const validAttempts = attempts.filter(a => a.status === 'valid' && a.result !== null && a.result !== undefined);
        
        if (validAttempts.length > 0) {
          let best = validAttempts[0];
          for (let i = 1; i < validAttempts.length; i++) {
            if (rule === 'MAX' && validAttempts[i].result > best.result) {
              best = validAttempts[i];
            } else if (rule === 'MIN' && validAttempts[i].result < best.result) {
              best = validAttempts[i];
            }
          }

          finalResultJson = {
            result: best.result,
            unit: best.unit,
            confidence: best.confidence,
            attempt_number: best.attempt_number || best.attemptNumber
          };
        }
      }

      return {
        assessment_id: asm.id,
        test_type: asm.testType,
        status: asm.status,
        final_result: finalResultJson,
        attempts: attempts,
        conditions: conditionJson,
        created_at: asm.createdAt,
        updated_at: asm.updatedAt
      };
    });

    // 7. Get the current performance profile for the athlete
    let profileJson = null;
    try {
      // Pass the actual user so the service can authorize appropriately
      profileJson = profileService.generateProfile(athleteId, user).toJSON();
    } catch (error) {
      // If INSUFFICIENT_DATA or other error, profile remains null
      profileJson = null;
    }

    return {
      athlete_id: athleteId,
      history,
      performance_profile: profileJson,
      pagination: {
        page: p,
        limit: l,
        total,
        total_pages
      }
    };
  }

}

module.exports = new AthleteHistoryService();
