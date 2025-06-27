const express = require("express");
const router = express.Router();
const feedbackController = require("../controllers/feedbackController.js"); // Import the controller

router.post("/", feedbackController.generateAndStoreFeedback);

module.exports = router;