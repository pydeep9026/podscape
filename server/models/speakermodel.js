const mongoose = require('mongoose');

const speakerSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  photo: {
    type: String,
    required: true
  },
  speakerdescription: {
    type: String,
    required: true
  },
  speakerRatings: {
    type: Number,
    default: 0
  },
  numberOfRatings: {
    type: Number, 
    default: 0
  }
}); 

module.exports= mongoose.model('Speaker', speakerSchema);