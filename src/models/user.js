'use strict'

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({
  id: { type: Number, unique: true, required: true },
  name: { type: String,  required: true },
  email: { type: String,  required: true },
  birthDate: { type: Date,  required: true },
  address: { type: Schema.Types.ObjectId, ref:'Address' }
});

const model = mongoose.model('User', schema);

module.exports = {
  model,
  schema
};
