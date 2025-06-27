const feedbackService = require("../services/feedbackService.js");
require("dotenv").config();

const GEMINI_API_KEY = process.env.GEMINI_API_KEY || "";
const GEMINI_API_BASE_URL = process.env.GEMINI_API_BASE_URL;

exports.generateAndStoreFeedback = async (req, res) => {
    const { user_input } = req.body;

    if (!user_input) {
        return res.status(400).json({ error: "Missing user_input in request body." });
    }

    if (!GEMINI_API_KEY && typeof __initial_auth_token === 'undefined') {
        console.warn("GEMINI_API_KEY is empty. Ensure you are running in an environment that provides it (like Canvas) or set it in your .env file for local testing.");
    }

    if (!GEMINI_API_BASE_URL) {
        console.error("GEMINI_API_BASE_URL is not defined in .env");
        return res.status(500).json({ error: "Gemini API URL is not configured." });
    }

    try {
        const feedbackText = await feedbackService.getAndSaveFeedback(user_input, GEMINI_API_KEY, GEMINI_API_BASE_URL);
        res.json({ feedback: feedbackText });
    } catch (err) {
        console.error("Server-side Error in Controller:", err.message);
        console.error("Full Error Details:", JSON.stringify(err, Object.getOwnPropertyNames(err), 2));
        res.status(500).json({ error: "Failed to process feedback request.", details: err.message });
    }
};