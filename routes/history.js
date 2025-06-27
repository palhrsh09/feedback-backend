const express = require('express');
const router = express.Router();
const Feedback = require('../models/Feedback');

router.get('/', async (req, res) => {
  try {
    const history = await Feedback.find().sort({ timestamp: -1 });
    res.json(history);
  } catch (error) {
    console.error('Error fetching history:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router;