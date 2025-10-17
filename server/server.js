// server/server.js
import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';

// Import routes
import authRoutes from './routes/authRoutes.js';
import commentRoutes from './routes/commentRoutes.js';

// Load environment variables
dotenv.config();

const app = express();

// Middlewares
app.use(cors()); // Allows requests from other origins (our frontend)
app.use(express.json()); // Allows the server to accept JSON data in requests

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB Connected...'))
  .catch(err => console.error('MongoDB Connection Error:', err));

// // Use Routes
app.use('/api/auth', authRoutes); // All auth routes will start with /api/auth
app.use('/api/comments', commentRoutes); // All comment routes will start with /api/comments

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));