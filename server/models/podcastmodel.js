const mongoose = require('mongoose');



const podcastSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  category: {
    type: String,
    required: true
  },
  type: {
    type: String,
    enum: ['Audio', 'Video'],
    required: true
  }, 
  creator: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Speaker',
    required: true
  },
  episode1:{
    type: String,
  },
  episode2:{
    type: String,
  },
  episode3:{
    type: String,
  },
  episode4:{
    type: String,
  },
  episode5:{
    type: String,
  }
});
 

module.exports = mongoose.model('Podcast', podcastSchema)









 


