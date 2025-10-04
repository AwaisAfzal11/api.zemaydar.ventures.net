const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const authRoutes = require('./routes/authRoutes');
const formRoutes =require('./routes/formRoutes');

dotenv.config();

const app = express();

// Middleware
app.use(cors()); // Allow requests from our React app
app.use(express.json()); // To parse JSON bodies
app.use(express.urlencoded({ extended: true })); // To parse URL-encoded bodies

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/forms', formRoutes);


const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));