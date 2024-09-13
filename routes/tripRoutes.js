const express = require('express');
const tripController = require('../controllers/tripController');
const authenticate = require('../middleware/authMiddleware'); // JWT auth middleware

const router = express.Router();

router.get('/', authenticate, tripController.trip_index); // Protect this route to only fetch trips for the logged-in user
router.post('/', authenticate, tripController.trip_create_post); // Protected route for creating trips
router.get('/:id', authenticate, tripController.trip_details); // Protect viewing individual trip details
router.put('/:id', authenticate, tripController.trip_update); // Protected route for updating trips
router.delete('/:id', authenticate, tripController.trip_delete); // Protected route for deleting trips

module.exports = router;