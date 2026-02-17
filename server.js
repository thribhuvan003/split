const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Database connection
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/split', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('MongoDB connected successfully'))
.catch((err) => console.error('MongoDB connection error:', err));

// Routes
app.get('/', (req, res) => {
  res.json({ message: 'Welcome to Split Expense Manager API' });
});

// User routes
app.use('/api/users', require('./routes/users'));

// Expense routes
app.use('/api/expenses', require('./routes/expenses'));

// Group routes
app.use('/api/groups', require('./routes/groups'));

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
