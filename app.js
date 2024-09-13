const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const connectToDb = require('./config/dbConnect');
const tripRoutes = require('./routes/tripRoutes');
const userRoutes = require('./routes/userRoutes'); // Import user routes

// Initialize Express app
const app = express();

// Middleware setup
app.use(cors()); // Enable Cross-Origin Resource Sharing
app.use(express.json()); // Parse incoming JSON requests
app.use(express.urlencoded({ extended: true })); // Parse URL-encoded data
app.use(morgan('dev')); // Log HTTP requests

// Connect to MongoDB and start server
connectToDb()
  .then(() => {
    app.listen(process.env.PORT || 3000, () => {
      console.log(`Server running on port ${process.env.PORT || 3000}`);
    });
  })
  .catch(err => console.error(err));

// User routes (signup/login)
app.use('/auth', userRoutes);  // Moved this above 404 handler

// Trip routes
app.use('/trips', tripRoutes);

// Handle 404 for undefined routes
app.use((req, res) => {
  res.status(404).send('404 Not Found');
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

module.exports = app;
