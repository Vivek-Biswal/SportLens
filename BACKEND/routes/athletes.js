/**
 * Athletes Routes
 */

const express = require('express');
const router = express.Router();
const { Athlete, athletesStore } = require('../models/Athlete');
const { authenticateToken } = require('../middleware/authentication');
const { validateAthlete } = require('../middleware/validation');

router.get('/', (req, res) => {
  res.json({ athletes: athletesStore });
});

router.post('/', authenticateToken, validateAthlete, (req, res) => {
  const { name, email, sport, age, gender, heightCm, weightKg } = req.body;
  const athlete = new Athlete({
    id: `ath_${Date.now()}`,
    name,
    email,
    sport,
    age,
    gender,
    heightCm,
    weightKg
  });

  athletesStore.push(athlete);
  res.status(201).json({ message: 'Athlete profile created', athlete });
});

router.get('/:id', (req, res) => {
  const athlete = athletesStore.find(a => a.id === req.params.id);
  if (!athlete) {
    return res.status(404).json({ error: 'Athlete not found' });
  }
  res.json({ athlete });
});

module.exports = router;
