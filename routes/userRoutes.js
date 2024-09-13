const express = require('express');
const { signup, login } = require('../controllers/userController');

const router = express.Router();

router.post('/signup', signup); // Route for user signup
router.post('/login', login); // Route for user login

module.exports = router;