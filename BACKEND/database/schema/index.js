/**
 * Database Schema Definitions for SIH25073 (SportLens)
 */

const schemas = {
  Athlete: {
    id: "STRING (PRIMARY KEY)",
    name: "STRING",
    email: "STRING (UNIQUE)",
    sport: "STRING",
    age: "INTEGER",
    gender: "STRING",
    heightCm: "NUMBER",
    weightKg: "NUMBER",
    createdAt: "TIMESTAMP",
    _constraints: "UNIQUE(userId)"
  },
  Coach: {
    id: "STRING (PRIMARY KEY)",
    name: "STRING",
    email: "STRING (UNIQUE)",
    organization: "STRING",
    specialization: "STRING",
    createdAt: "TIMESTAMP",
    _constraints: "UNIQUE(userId)"
  },
  Assessment: {
    id: "STRING (PRIMARY KEY)",
    athleteId: "STRING (FOREIGN KEY -> Athlete.id)",
    testType: "STRING",
    status: "STRING",
    createdAt: "TIMESTAMP",
    updatedAt: "TIMESTAMP"
  },
  AssessmentCondition: {
    id: "STRING (PRIMARY KEY)",
    assessmentId: "STRING (FOREIGN KEY -> Assessment.id, UNIQUE)",
    device: "STRING",
    lighting: "STRING",
    cameraPosition: "STRING",
    surface: "STRING",
    footwear: "STRING",
    createdAt: "TIMESTAMP",
    updatedAt: "TIMESTAMP",
    _constraints: "UNIQUE(assessmentId)"
  },
  PerformanceProfile: {
    id: "STRING (PRIMARY KEY)",
    athleteId: "STRING (FOREIGN KEY -> Athlete.id)",
    speedCategory: "STRING",
    explosivenessCategory: "STRING",
    agilityCategory: "STRING",
    overallCategory: "STRING",
    overallConfidence: "NUMBER",
    recommendation: "STRING",
    createdAt: "TIMESTAMP",
    updatedAt: "TIMESTAMP",
    _constraints: "UNIQUE(athleteId)"
  },
  Shortlist: {
    id: "STRING (PRIMARY KEY)",
    coachId: "STRING (FOREIGN KEY -> Coach.id)",
    athleteId: "STRING (FOREIGN KEY -> Athlete.id)",
    status: "STRING",
    notes: "STRING",
    addedAt: "TIMESTAMP",
    _constraints: "UNIQUE(coachId, athleteId)"
  },
  Attempt: {
    id: "STRING (PRIMARY KEY)",
    assessmentId: "STRING (FOREIGN KEY -> Assessment.id)",
    attemptNumber: "INTEGER",
    result: "NUMBER",
    unit: "STRING",
    confidence: "NUMBER",
    status: "STRING",
    timestamp: "TIMESTAMP",
    _constraints: "UNIQUE(assessmentId, attemptNumber)"
  },
  User: {
    id: "STRING (PRIMARY KEY)",
    name: "STRING",
    email: "STRING (UNIQUE)",
    passwordHash: "STRING",
    role: "STRING (ATHLETE | COACH)",
    createdAt: "TIMESTAMP",
    updatedAt: "TIMESTAMP"
  }
};

module.exports = {
  schemas
};
