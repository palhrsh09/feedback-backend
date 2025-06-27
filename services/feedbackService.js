const Feedback = require("../models/Feedback");

exports.getAndSaveFeedback = async (user_input, apiKey, apiBaseUrl) => {
    try {
        const prompt = `Give constructive feedback on the following input: "${user_input}"`;

        const chatHistory = [{ role: "user", parts: [{ text: prompt }] }];
        const payload = { contents: chatHistory };

        const apiUrl = `${apiBaseUrl}?key=${apiKey}`;

        const response = await fetch(apiUrl, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload)
        });

        if (!response.ok) {
            const errorData = await response.json();
            console.error("Gemini API Error Response:", JSON.stringify(errorData, null, 2));
            throw new Error(`API error: ${response.status} ${response.statusText} - ${errorData.error ? errorData.error.message : 'Unknown API error'}`);
        }

        const result = await response.json();

        let feedbackText = "No feedback generated.";
        if (result.candidates && result.candidates.length > 0 &&
            result.candidates[0].content && result.candidates[0].content.parts &&
            result.candidates[0].content.parts.length > 0) {
            feedbackText = result.candidates[0].content.parts[0].text;
        } else {
            console.warn("Gemini API response did not contain expected content structure:", result);
        }

        try {
            const newFeedback = new Feedback({
                userInput: user_input,
                feedback: feedbackText,
            });
            await newFeedback.save();
            console.log("Feedback saved to MongoDB:", newFeedback._id);
        } catch (dbErr) {
            console.error("Error saving feedback to MongoDB:", dbErr.message);
        }

        return feedbackText;

    } catch (err) {
        console.error("Error in Feedback Service:", err.message);
        throw err; 
    }
};