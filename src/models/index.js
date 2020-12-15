'use strict';

const mongoose = require('mongoose');
const constants = require('../utils/constants');

const connect = () => {
  return new Promise((resolve, reject) => {
    mongoose.connect(constants.dbUri, constants.dbOptions)
      .then((res, err) => {
        if (err) return reject(err);
        resolve();
      });
  });
};

const close = () => mongoose.disconnect();

module.exports = {
  connect,
  close
}
