const mongoose = require('mongoose');

const feedbackSchema = new mongoose.Schema({
  userInput: { type: String, required: true },
  feedback: { type: String, required: true },
  timestamp: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Feedback', feedbackSchema);