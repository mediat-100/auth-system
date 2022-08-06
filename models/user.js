const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
    // select: false,
  },
  role: {
    type: String,
    enum: ['user', 'staff', 'manager', 'admin'],
    required: true,
    default: 'user',
  },
});

const User = mongoose.model('User', userSchema);

module.exports = User;
