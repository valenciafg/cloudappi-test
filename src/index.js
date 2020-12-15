'use strict';

//const mongoose = require('mongoose');
const db = require('./models/index');
const server = require('./server/index');
const constants = require('./utils/constants');

db.connect()
  .then(() => {
    server.listen(constants.appPort, () => {
      console.log(`Server listning on port ${constants.appPort}`);
    });
  });
