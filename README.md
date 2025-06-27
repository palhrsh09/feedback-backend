AI Feedback API (Backend)
This is the backend API for the AI Feedback App, built with Node.js and Express. It is responsible for interacting with the Gemini API to generate constructive feedback and storing this data in a MongoDB database.

🚀 Deployment
This backend API is deployed and hosted on Render.

💻 Technologies Used
Node.js: JavaScript runtime environment.

Express.js: A fast, unopinionated, minimalist web framework for Node.js.

Mongoose: An ODM (Object Data Modeling) library for MongoDB and Node.js.

MongoDB Atlas: A cloud-hosted MongoDB database for data persistence.

Gemini API (gemini-2.0-flash): Used for generating AI-powered constructive feedback.

dotenv: For managing environment variables.

cors: For enabling Cross-Origin Resource Sharing.

✨ Features
AI Feedback Generation: Takes user text input and leverages the Gemini 2.0 Flash model to generate detailed constructive feedback.

Data Persistence: Stores both the original user input and the generated feedback in a MongoDB database.

History Retrieval: Provides an endpoint to fetch all previously stored feedback entries.

Structured Architecture: Implements a Controller-Service pattern for better separation of concerns and maintainability.

🧠 Gemini Integration
The API integrates with the Gemini 2.0 Flash model via a direct fetch API call. The GEMINI_API_BASE_URL and GEMINI_API_KEY are securely managed through environment variables. The gemini-2.0-flash model is used for its efficiency and suitability for text generation tasks like feedback analysis.

⚙️ Local Setup
To run the backend API locally:

Navigate to the server directory:

cd server

Install dependencies:

npm install
# or yarn install

Configure Environment Variables:
Create a .env.development file in the server/ directory with the following content:

MONGO_URI=your_mongodb_connection_string_here # e.g., mongodb+srv://user:pass@cluster.xyz.mongodb.net/feedback?retryWrites=true&w=majority
PORT=5000
GEMINI_API_KEY=your_gemini_api_key_here
GEMINI_API_BASE_URL=https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent

MONGO_URI: Replace with your MongoDB Atlas connection string, ensuring the database name (e.g., /feedback) is included.

GEMINI_API_KEY: Obtain your API key from the Google AI Studio.

PORT: This is the port your Express server will listen on locally.

MongoDB Atlas Network Access:
Ensure your MongoDB Atlas cluster allows connections from your local IP address. For development, you can temporarily add 0.0.0.0/0 (Allow Access from Anywhere) in your MongoDB Atlas Network Access settings under the Security tab. Remember to restrict this in production!

Start the server:

npm start
# or yarn start

The API will typically be running on http://localhost:5000.

📊 API Endpoints
POST /api/feedback

Description: Generates AI feedback for the provided text and saves it to the database.

Request Body:

{
    "user_input": "Your text here that needs feedback."
}

Response:

{
    "feedback": "AI-generated constructive feedback."
}

GET /api/history

Description: Retrieves all previously stored user inputs and their corresponding AI feedback from the database.

Response:

[
    {
        "_id": "...",
        "userInput": "Text 1",
        "feedback": "Feedback for text 1",
        "timestamp": "ISO Date String"
    },
    {
        "_id": "...",
        "userInput": "Text 2",
        "feedback": "Feedback for text 2",
        "timestamp": "ISO Date String"
    }
]

🔒 CORS Configuration
The API includes CORS middleware to allow cross-origin requests. For local development, it's configured to accept requests from http://localhost:5173 (your frontend's development server). When deployed, it should be updated to include your frontend's production domain.
