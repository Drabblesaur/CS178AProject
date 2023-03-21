const mongoose = require('mongoose');

const featureSchema = new mongoose.Schema({
  type: {
    type: String,
    required: true
  },
  properties: {
    building: String,
    room: String
  },
  geometry: {
    coordinates: {
      type: [[[Number]]], // nested array of arrays of numbers
      required: true
    },
    type: {
      type: String,
      required: true
    }
  },
  id: {
    type: String,
    required: true
  }
});

const Feature = mongoose.model('Feature', featureSchema);

module.exports = Feature;