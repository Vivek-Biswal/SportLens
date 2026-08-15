/**
 * SIH25073 SportLens Backend Server Entry Point
 */

require('dotenv').config();
const express = require('express');
const cors = require('cors');

// Import Database Migrations
const migration001 = require('./database/migrations/001_initial_schema');

// Import Routes
const authRoutes = require('./routes/auth');
const athletesRoutes = require('./routes/athletes');
const assessmentsRoutes = require('./routes/assessments');
const resultsRoutes = require('./routes/results');
const profileRoutes = require('./routes/profile');
const coachRoutes = require('./routes/coach');
const shortlistRoutes = require('./routes/shortlist');

const app = express();
const PORT = process.env.PORT || 5000;

// Database Configuration Simulation
const dbUrl = process.env.DATABASE_URL || 'in-memory-mock-store://localhost/sportlens_db';
console.log(`[SportLens Backend] Initializing database connection via: ${dbUrl.split('@').pop()}`);
console.log(`[SportLens Backend] Database Engine Detected: IN_MEMORY_STORE`);

// Initialize Core Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Run Initial Schema Setup
migration001.up();

// Health Check Endpoint
app.get('/api/health', (req, res) => {
  res.json({
    status: 'ok',
    service: 'SIH25073 SportLens Backend',
    timestamp: new Date().toISOString()
  });
});

// Register Module Routes
app.use('/api/auth', authRoutes);
app.use('/api/athletes', athletesRoutes);
app.use('/api/assessments', assessmentsRoutes);
app.use('/api/results', resultsRoutes);
app.use('/api/profile', profileRoutes);
app.use('/api/coach', coachRoutes);
app.use('/api/shortlist', shortlistRoutes);

// Global 404 Handler
app.use((req, res) => {
  res.status(404).json({ error: 'Endpoint not found' });
});

// Start Server if executed directly
if (require.main === module) {
  app.listen(PORT, () => {
    console.log(`[SportLens Backend] Server running on port ${PORT}`);
  });
}

module.exports = app;
