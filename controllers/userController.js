const User = require('../models/userModel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// Input validation function (for simplicity)
const isValidEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

// Signup controller logic
const signup = async (req, res) => {
  const { firstName, lastName, email, password } = req.body;

  // Input validation (ensure fields are not empty and email is valid)
  if (!firstName || !lastName || !email || !password || !isValidEmail(email)) {
    return res.status(400).json({ message: 'Invalid input. Please provide valid data.' });
  }

  try {
    console.log('Received signup request:', { firstName, lastName, email });

    // Check if user already exists
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ message: 'User with this email already exists.' });
    }

    console.log('User does not exist, proceeding to create a new user');

    // Create new user
    const user = new User({ firstName, lastName, email, password });
    console.log('New user created, saving to database.');

    await user.save();
    console.log('User saved successfully.');

    // Generate JWT token
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
    console.log('JWT token generated successfully.');

    // Return the token and the user's first name
    res.status(201).json({
      token,
      user: {
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
      },
    });
  } catch (error) {
    console.error('Signup Error:', error); // Log the exact error
    res.status(500).json({ message: 'Server error during signup.' });
  }
};

// Login controller logic
const login = async (req, res) => {
  const { email, password } = req.body;

  // Input validation
  if (!email || !password || !isValidEmail(email)) {
    return res.status(400).json({ message: 'Invalid email or password.' });
  }

  try {
    // Find user by email
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: 'Invalid email or password.' });
    }

    // Compare passwords
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid email or password.' });
    }

    // Generate JWT token
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '7d' });

    // Return the token and the user's first name
    res.status(200).json({
      token,
      user: {
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email
      }
    });
  } catch (error) {
    console.error('Login Error:', error); // Log the exact error
    res.status(500).json({ message: 'Server error during login.' });
  }
};

module.exports = { signup, login };
