const Trip = require('../models/tripModel');

// Get list of all trips, sorted by lastEdited (descending)
const trip_index = (req, res) => {
    Trip.find().sort({ lastEdited: -1 }) 
    .then(result => res.json({ trips: result }))
    .catch(err => console.error(err));
};

// Get details for a specific trip by ID
const trip_details = (req, res) => {
    const id = req.params.id;
    Trip.findById(id)
        .then(result => res.json({ trip: result }))
        .catch(err => console.error(err));
};

// Create a new trip and save it to the database
const trip_create_post = (req, res) => {
    const trip = new Trip(req.body);
    trip.save()
        .then(result => res.json({ trip: result }))
        .catch(err => console.error(err));
};

// Delete a specific trip by ID
const trip_delete = (req, res) => {
    const id = req.params.id;
    Trip.findByIdAndDelete(id)
        .then(() => res.json({ redirect: '/' }))
        .catch(err => console.error(err));
};

// Update an existing trip by ID, update timestamp on change
const trip_update = (req, res) => {
    const id = req.params.id;
    const updatedData = {
        ...req.body,
        lastEdited: new Date(), // Update the lastEdited timestamp
    };
    Trip.findByIdAndUpdate(id, updatedData, { new: true })
        .then(result => res.json({ trip: result }))
        .catch(err => console.error(err));
};

module.exports = {
    trip_index,
    trip_details,
    trip_create_post,
    trip_delete,
    trip_update
};
