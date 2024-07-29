// This file defines the routes for handling different HTTP requests related to trips.

const express = require('express');
const router = express.Router();
const tripController = require('../controllers/tripController');

router.get('/', tripController.trip_index);

router.post('/', tripController.trip_create_post);

router.get('/:id', tripController.trip_details);

router.delete('/:id', tripController.trip_delete);

router.put('/:id', tripController.trip_update);

module.exports = router;