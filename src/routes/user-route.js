'use strict';
const express = require('express');
const userRouter = express.Router();

const userController = require('../controllers/users');

userRouter.get('/getusers', userController.getUsers);
userRouter.get('/getusersById/:userId', userController.getUsersById);
userRouter.post('/createUsers', userController.createUsers);
userRouter.put('/updateUsersById/:userId', userController.updateUsersById);
userRouter.delete('/deleteUsersById/:userId', userController.deleteUsersById);

module.exports = userRouter;
