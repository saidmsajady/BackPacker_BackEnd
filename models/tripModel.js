const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const tripSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  countries: [
    {
      country: {
        type: String,
        required: true
      },
      startDate: {
        type: Date,
        required: true
      },
      endDate: {
        type: Date,
        required: true
      }
    }
  ],
  lastEdited: {
    type: Date,
    default: Date.now, 
  }
}, { timestamps: true, collection: 'tripsDetails' }); 

const Trip = mongoose.model('trip', tripSchema);

module.exports = Trip;