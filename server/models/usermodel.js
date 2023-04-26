const mongoose = require("mongoose");

const userschema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    max: 34,
  },
  password: {
    type: String,
    required: true,
    unique: true,
    max: 20,
  },
  firstname: {
    type: String,
    required: true,
    max: 50
  },
  lastname: {
    type: String,
    required: true,
    max: 50
  },
  gender: {
    type: String,
    enum: ['Male', 'Female', 'Other'],
    required: true
  },
  birthday: {
    type: String,
    required: true
  },
  phonenumber: {
    type: String,
    required: true,
    max: 15
  }
}, {
  timestamps: true
});

module.exports = mongoose.model("users", userschema);
