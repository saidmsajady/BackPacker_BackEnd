const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define schema for trip details
const tripSchema = new Schema({
  title: {
    type: String,
    required: true, // Trip must have a title
  },
  countries: [
    {
      country: {
        type: String,
        required: true, // Each country in the trip is required
      },
      startDate: {
        type: Date,
        required: true, // Start date for the country is required
      },
      endDate: {
        type: Date,
        required: true, // End date for the country is required
      }
    }
  ],
  lastEdited: {
    type: Date,
    default: Date.now, // Automatically set to the current date
  }
}, { 
    timestamps: true, // Automatically adds createdAt and updatedAt fields
    collection: 'tripsDetails' // Collection name in MongoDB
});

// Create the model based on the schema
const Trip = mongoose.model('trip', tripSchema);

module.exports = Trip;