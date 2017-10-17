'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

/**
 * Article Schema
 */
var MediaSchema = new Schema({
  created: {
    type: Date,
    default: Date.now
  },
  user: {
    type: Schema.ObjectId,
    ref: 'User'
  },
  title: {
      type: String,
      required: true
  },
  url: {
      type: String,
      required: true
  },
  objectType: {
    type: String,
    required: true
  },
  object: {
    type: Schema.ObjectId,
    refPath: 'objectType'
  }
});

mongoose.model('Media', MediaSchema);