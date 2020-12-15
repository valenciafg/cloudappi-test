'use strict';
const express = require('express');
const userRouter = express.Router();

const userController = require('../controllers/users');

/**
 * @swagger
 * /getusers:
 *  get:
 *    description: Use to request all customers
 *    responses:
 *      '200':
 *        description: A successful response
 */
userRouter.get('/getusers', userController.getUsers);
userRouter.get('/getusersById/:userId', userController.getUsersById);
/**
 * @swagger
 * /createUsers/{userId}:
 *    post:
 *      summary: Create a user
 *      description: Create a user on database
 *      requestBody:
 *        content:
 *          application/json:
 *            schema:
 *            $ref: '#/definitions/user'
 *    parameters:
 *      - name: userId
 *        in: query
 *        description: id of User
 *        required: true
 *        schema:
 *          type: number
 *          format: string
 *    responses:
 *      '201':
 *        description: Successfully created user
 */
userRouter.post('/createUsers', userController.createUsers);
/**
 * @swagger
 * /updateUsersById/{userId}:
 *    put:
 *      description: Use to return all customers
 *    parameters:
 *      - name: userId
 *        in: query
 *        description: id of User
 *        required: true
 *        schema:
 *          type: number
 *          format: string
 *    responses:
 *      '201':
 *        description: Successfully created user
 */
userRouter.put('/updateUsersById/:userId', userController.updateUsersById);
/**
 * @swagger
 * /deleteUsersById/{userId}:
 *    delete:
 *      description: Delete user from User collection by id
 *    parameters:
 *      - name: userId
 *        in: query
 *        description: id of User
 *        required: true
 *        schema:
 *          type: number
 *          format: string
 *    responses:
 *      '201':
 *        description: Successfully created user
 */
userRouter.delete('/deleteUsersById/:userId', userController.deleteUsersById);

module.exports = userRouter;
