const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt');

// Define schema for user registration and login
const userSchema = new Schema({
  firstName: { // Add firstName field
    type: String,
    required: true,
    trim: true,
  },
  lastName: { // Add lastName field
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  password: {
    type: String,
    required: true,
  }
}, { timestamps: true });

// Hash password before saving user to the database
userSchema.pre('save', async function(next) {
  if (!this.isModified('password')) return next();
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  console.log('Hashed Password:', this.password); // Add this log
  next();
});

const User = mongoose.model('User', userSchema);
module.exports = User;