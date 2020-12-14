'use strict'

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({
  id: { type: Number, unique: true, required: true},
  street: String,
  state: String,
  city: String,
  country: String,
  zip: String
});

schema.pre('save', next =>{
  if ('invalid' == this.id) {
    return next(new Error('#sadpanda'));
  }
  next();
});

const model = mongoose.model('Address', schema);

module.exports = {
  model,
  schema
};
