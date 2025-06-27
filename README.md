AI Feedback API (Backend)
This Node.js Express API provides AI-generated feedback and stores it in MongoDB.

Deployment
Deployed on Render.

Technologies Used
Node.js, Express.js, Mongoose, MongoDB Atlas, Gemini API (gemini-2.0-flash), dotenv, cors.

Features
AI Feedback Generation: Uses Gemini 2.0 Flash for constructive text feedback.

Data Persistence: Stores user input and AI feedback in MongoDB.

History Retrieval: Fetches past feedback entries.

Structured Architecture: Controller-Service pattern.

Gemini Integration
Integrates with Gemini 2.0 Flash via fetch API call; GEMINI_API_BASE_URL and GEMINI_API_KEY are managed via environment variables.

Local Setup
To run locally:

Navigate to the server directory:

cd server

Install dependencies:

npm install

Configure Environment Variables:
Create server/.env.development:

MONGO_URI=your_mongodb_connection_string_here
PORT=5000
GEMINI_API_KEY=your_gemini_api_key_here
GEMINI_API_BASE_URL=https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent

MONGO_URI: Your MongoDB Atlas connection string (e.g., /feedback database).

GEMINI_API_KEY: Your Google AI Studio API key.

PORT: Local server port.

MongoDB Atlas Network Access:
Ensure 0.0.0.0/0 is temporarily added in Atlas Network Access for local development.

Start the server:

npm start

API runs on http://localhost:5000.

API Endpoints
POST /api/feedback

Description: Generates and saves AI feedback.

Request Body: {"user_input": "Your text here."}

Response: {"feedback": "AI-generated feedback."}

GET /api/history

Description: Retrieves all stored feedback history.

Response: [{"_id": "...", "userInput": "Text 1", "feedback": "Feedback 1", "timestamp": "ISO Date"}]

CORS Configuration
CORS middleware allows cross-origin requests. Configured for http://localhost:5173 locally; update for production domain
