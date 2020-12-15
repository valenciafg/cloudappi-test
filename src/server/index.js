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

/**
 * @swagger
 * definitions:
 *  user:
 *    type: object
 *    properties:
 *      id:
 *        type: integer
 *      name:
 *        type: string
 *      email:
 *        type: string
 *      birthDate:
 *        type: string
 *      address:
 *        $ref: '#/definitions/address'
 *  address:
 *    type: object
 *    properties:
 *      id:
 *        type: integer
 *      street:
 *        type: string
 *      state:
 *        type: string
 *      city:
 *        type: string
 *      country:
 *        type: string
 *      zip:
 *        type: string
 */

/**
 * @swagger
 * /:
 *  get:
 *    description: Use to request main endpoint
 *    responses:
 *      '200':
 *        description: A successful response
 */
app.get('/', (req, res) => {
  res.send("success");
});

module.exports = app;
