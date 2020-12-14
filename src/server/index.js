'use strict';

const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const bodyParser = require('body-parser');
const swaggerJsDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

const constants = require('../utils/constants')
const middlewares = require('../middlewares/');
const userRoutes = require('../routes/user-route');

const app = express();

//  Middlewares on express
app.use(morgan('dev'));
app.use(cors());
app.use(bodyParser.json({ verify: middlewares.rawBodyMiddleware }));
app.use(bodyParser.urlencoded({ verify: middlewares.rawBodyMiddleware, extended: true }));
app.use(bodyParser.raw({ verify: middlewares.rawBodyMiddleware, type: '*/*' }));


const swaggerDocs = swaggerJsDoc(constants.swaggerOptions);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));

app.use('/users', userRoutes);


module.exports = app;
