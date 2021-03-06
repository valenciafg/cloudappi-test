'use strict';

require('dotenv').config();

//  ENVIROMENT VARIABLES
const appPort = process.env.API_PORT || 8080;

const dbUser = process.env.DB_USER || 'admin';
const dbPassword = process.env.DB_PASSWORD || 'admin';
const dbHost = process.env.DB_HOST || 'localhost';
const dbname = process.env.DB_NAME || 'test';

const dbUri = `mongodb+srv://${dbUser}:${dbPassword}@${dbHost}/${dbname}?retryWrites=true&w=majority`;
const dbOptions = {
  useCreateIndex: true,
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false
};

// Extended: https://swagger.io/specification/#infoObject
const swaggerOptions = {
  swaggerDefinition: {
    info: {
      version: "1.0.0",
      title: "User API",
      description: "User API Information",
      contact: {
        name: "Víctor Valencia"
      },
      servers: [
        "http://localhost:8080",
        "http://18.217.235.43:8080"
      ]
    }
  },
  // ['.routes/*.js']
  apis: ["src/server/index.js", "src/routes/*.js"]
};

module.exports = {
  appPort,
  dbUri,
  dbOptions,
  swaggerOptions
};
