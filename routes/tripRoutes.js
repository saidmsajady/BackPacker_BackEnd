const express = require('express');
const tripController = require('../controllers/tripController');
const authenticate = require('../middleware/authMiddleware'); // JWT auth middleware

const router = express.Router();

router.get('/', tripController.trip_index); // Public route for listing trips
router.post('/', authenticate, tripController.trip_create_post); // Protected route for creating trips
router.get('/:id', tripController.trip_details); // Public route for viewing a trip
router.put('/:id', authenticate, tripController.trip_update); // Protected route for updating trips
router.delete('/:id', authenticate, tripController.trip_delete); // Protected route for deleting trips

module.exports = router;