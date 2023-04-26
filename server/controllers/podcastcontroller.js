const Podcast = require('../models/podcastmodel');
const mongoose = require('mongoose');
const Speaker=require("../models/speakermodel")

module.exports.createpodcast = async (req, res, next) => {
  try {
    const { title, description, category, type,  creator,episode1,episode2,episode3,episode4,episode5 } = req.body;

    if (!title || !description || !category || !type || !creator) {
      return res.status(400).json({ error: 'Please fill all the required fields.' });
    }

    const podcast = new Podcast({
      title,
      description,
      category,
      type,
      creator,
      episode1,
      episode2,
      episode3,
      episode4,
      episode5
    });


    await podcast.save();

    return res.status(201).json({ message: 'Podcast created successfully.' });
  } catch (err) {
    next(err);
  }
};

  module.exports.getallpodcasts = async (req, res, next) => {
    try {
      const podcasts = await Podcast.find()
      return res.json(podcasts); 
    } catch (err) {
      next(err);
    }  
  };
  
