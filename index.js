const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const feedbackRoutes = require('./routes/Feedback');
const historyRoutes = require('./routes/history');
require('dotenv').config();

const app = express();
app.use(cors({
  origin: '*', 
  credentials: true,
}));

app.use(express.json());

mongoose.connect(process.env.MONGO_URI, {
}).then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB connection error:', err));

app.use('/api/feedback', feedbackRoutes);
app.use('/api/history', historyRoutes);


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));