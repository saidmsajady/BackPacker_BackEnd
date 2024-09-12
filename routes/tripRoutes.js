const express = require('express');
const router = express.Router();
const tripController = require('../controllers/tripController');

// Route to get all trips
router.get('/', tripController.trip_index);

// Route to create a new trip
router.post('/', tripController.trip_create_post);

// Route to get details of a specific trip by ID
router.get('/:id', tripController.trip_details);

// Route to delete a trip by ID
router.delete('/:id', tripController.trip_delete);

// Route to update a trip by ID
router.put('/:id', tripController.trip_update);

module.exports = router;