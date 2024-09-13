const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const tripSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  countries: [
    {
      country: {
        type: String,
        required: true,
      },
      startDate: {
        type: Date,
        required: true,
      },
      endDate: {
        type: Date,
        required: true,
      }
    }
  ],
  lastEdited: {
    type: Date,
    default: Date.now,
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId, // Reference to the User model
    ref: 'User',
    required: true,
  }
}, { timestamps: true, collection: 'tripsDetails' });

const Trip = mongoose.model('Trip', tripSchema);

module.exports = Trip;