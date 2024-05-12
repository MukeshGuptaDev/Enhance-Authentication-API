const validator = require('validator');
const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: false,
    minLength: 2,
  },
  phone: {
    type: String,
    required: false,
    validate: [validator.isMobilePhone, 'invalid phone number'],
  },
  email: {
    type: String,
    required: false,
    validate: [validator.isEmail, 'Please provide a valid email id'],
    index: true,
  },
  password: {
    type: String,
    required: false,
  },
  bio: {
    type: String,
    required: false,
  },
  photo: {
    type: String,
    required: false,
  },
  isAdmin: {
    type: Boolean,
    enum: [true, false],
    default: false,
  },
  privateUser: {
    type: Boolean,
    enum: [true, false],
    default: false,
  },
  profilePicURL: {
    type: String,
    required: false,
  },
  googleId: {
    type: String,
    required: false,
  },
});

let User = mongoose.model('User', UserSchema);
module.exports = User;
