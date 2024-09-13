const Trip = require('../models/tripModel');

// Get list of all trips, sorted by lastEdited (descending)
const trip_index = async (req, res) => {
    try {
      const trips = await Trip.find({ createdBy: req.user.id }).sort({ lastEdited: -1 }); // Only fetch trips created by the logged-in user
      res.json({ trips });
    } catch (error) {
      res.status(500).json({ message: 'Error fetching trips', error });
    }
};
  

// Get details for a specific trip by ID
const trip_details = (req, res) => {
    const id = req.params.id;
    Trip.findById(id)
        .then(result => res.json({ trip: result }))
        .catch(err => console.error(err));
};

// Create a new trip
const trip_create_post = async (req, res) => {
    const { title, countries } = req.body;
  
    try {
      if (!req.user || !req.user.id) {
        return res.status(401).json({ message: 'Unauthorized: No user token provided' });
      }
  
      const trip = new Trip({
        title,
        countries,
        createdBy: req.user.id, // Attach the logged-in user's ID
      });
  
      const savedTrip = await trip.save();
      res.status(201).json({ trip: savedTrip });
    } catch (error) {
      console.error('Error creating trip:', error);
      res.status(500).json({ message: 'Server error creating trip', error });
    }
};  

// Delete a specific trip by ID
const trip_delete = async (req, res) => {
    const { id } = req.params;
  
    try {
      const trip = await Trip.findById(id);
  
      if (!trip) {
        return res.status(404).json({ message: 'Trip not found' });
      }
  
      // Ensure the trip belongs to the logged-in user
      if (trip.createdBy.toString() !== req.user.id) {
        return res.status(403).json({ message: 'You do not have permission to delete this trip' });
      }
  
      await Trip.deleteOne({ _id: id }); // Use deleteOne instead of remove
      res.status(200).json({ message: 'Trip deleted successfully' });
    } catch (error) {
      console.error('Error deleting trip:', error); // Log the error for debugging
      res.status(500).json({ message: 'Error deleting trip', error });
    }
};  
  
// Update an existing trip by ID, update timestamp on change
const trip_update = async (req, res) => {
    const { id } = req.params;
    const { title, countries } = req.body;
  
    try {
      const trip = await Trip.findById(id);
  
      if (!trip) {
        return res.status(404).json({ message: 'Trip not found' });
      }
  
      // Ensure the trip belongs to the logged-in user
      if (trip.createdBy.toString() !== req.user.id) {
        return res.status(403).json({ message: 'You do not have permission to edit this trip' });
      }
  
      trip.title = title;
      trip.countries = countries;
      trip.lastEdited = new Date();
  
      const updatedTrip = await trip.save();
      res.status(200).json({ trip: updatedTrip });
    } catch (error) {
      res.status(500).json({ message: 'Error updating trip', error });
    }
};
  

module.exports = {
    trip_index,
    trip_details,
    trip_create_post,
    trip_delete,
    trip_update
};
