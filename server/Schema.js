const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String,
  image: String,
  verificationCode: String,
  isVerified: { type: Boolean, default: false },
  resetToken: String,
  resetTokenExpires: Date,
  userType: {
    type: String,
    enum: ['layer', 'client'], // Specify allowed values as "layer" or "client"
  },
  // Additional fields specific to both "layer" and "client" users
  // ...
});

module.exports = mongoose.model('User', userSchema);
