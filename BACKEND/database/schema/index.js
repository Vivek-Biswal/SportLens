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
    createdAt: "TIMESTAMP"
  },
  Coach: {
    id: "STRING (PRIMARY KEY)",
    name: "STRING",
    email: "STRING (UNIQUE)",
    organization: "STRING",
    specialization: "STRING",
    createdAt: "TIMESTAMP"
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
    temperatureCelsius: "NUMBER",
    altitudeMeters: "NUMBER",
    surfaceType: "STRING",
    equipmentUsed: "STRING",
    notes: "STRING"
  },
  PerformanceProfile: {
    id: "STRING (PRIMARY KEY)",
    athleteId: "STRING (FOREIGN KEY -> Athlete.id)",
    overallScore: "NUMBER",
    speedRating: "NUMBER",
    enduranceRating: "NUMBER",
    strengthRating: "NUMBER",
    agilityRating: "NUMBER",
    updatedAt: "TIMESTAMP"
  },
  Shortlist: {
    id: "STRING (PRIMARY KEY)",
    coachId: "STRING (FOREIGN KEY -> Coach.id)",
    athleteId: "STRING (FOREIGN KEY -> Athlete.id)",
    status: "STRING",
    notes: "STRING",
    addedAt: "TIMESTAMP"
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
