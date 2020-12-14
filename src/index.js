'use strict';

const mongoose = require('mongoose');

const server = require('./server/index');
const constants = require('./utils/constants');


mongoose.connect(constants.dbUri, constants.dbOptions, (err) => {
  if (err) throw err;
  server.listen(constants.appPort, () => {
    console.log(`Server listning on port ${constants.appPort}`);
  });
});
