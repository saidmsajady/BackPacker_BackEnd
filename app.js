const express = require('express');
const morgan = require('morgan');
const cors = require('cors'); 
const connectToDb = require('./config/dbConnect');
const tripRoutes = require('./routes/tripRoutes');

// Express App
const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan('dev'));

// Connect to MongoDB
connectToDb()
  .then(() => {
    app.listen(process.env.PORT || 3000, () => {
      console.log(`Server is running on port ${process.env.PORT || 3000}`);
    });
  })
  .catch((err) => console.log(err));

// Routes
app.use('/trips', tripRoutes);

// 404 page
app.use((req, res) => {
  res.status(404).send('404 Not Found');
});

// Error Handling Middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

module.exports = app;
