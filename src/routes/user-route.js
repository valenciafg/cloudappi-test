'use strict';
const express = require('express');
const userRouter = express.Router();

const userController = require('../controllers/users');

/**
 * @swagger
 * /getusers:
 *  get:
 *    summary: Get all users
 *    description: Use to request all customers
 *    responses:
 *      '200':
 *        description: A successful response
 */
userRouter.get('/getusers', userController.getUsers);
/**
 * @swagger
 * /getusersById/{userId}:
 *    get:
 *      summary: Get User by ID
 *      description: Get one user by ID param
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
 *        description: OK
 */
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
 *      summary: Update a user
 *      description: Update user and addres by ID and params
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
 *        description: Successfully updated user
 */
userRouter.put('/updateUsersById/:userId', userController.updateUsersById);
/**
 * @swagger
 * /deleteUsersById/{userId}:
 *    delete:
 *      summary: Delete a user and address
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
