'use strict';

const mongoose = require('mongoose');
const Address = require('../../models/address');
const User = require('../../models/user');

const getUsers = async(req, res) => {
  let status = 500;
  let response = [];
  try {
    const users = await User.model
      .find({}, '-_id -__v')
      .populate('address', '-_id -__v');
    response = users;
    if (users.length < 1) {
      status = 204;
    }
  } catch(err) {
    status = 500;
    response = `Error ${err}`;
  }
  res.status(status).send(response);
};

const getUsersById = async(req, res) => {
  const { params } = req;
  const { userId } = params;
  let status = 200;
  let response = [];
  try {
    const user = await User.model
      .findOne({ id: userId }, '-_id -__v')
      .populate('address', '-_id -__v');
    response = user;
    if (!user) {
      status = 204;
      response = {};
    }
  } catch(err) {
    status = 500;
    response = `Error ${err}`;
  }
  res.status(status).send(response);
};

const createUsers = async(req, res) => {
  const { body } = req;
  const {
    id,
    name,
    email,
    birthDate,
    address
  } = body;
  let status = 200;
  let response = {
    error: true,
    message: ''
  };
  if (id && name && email && birthDate &&  address) {
    try {
      //  Address creation
      const addressModel = new Address.model(address);
      console.log('addressModel', addressModel);
      const newAddress = await addressModel.save();
      const newAddressId = newAddress._id;
      // console.log('newAddress', newAddress, newAddressId, mongoose.Types.ObjectId(newAddressId));
      // console.log('+++++', newAddress.__id);
      //  User creation
      const newUser = new User.model({
        id,
        name,
        email,
        birthDate,
        address: mongoose.Types.ObjectId(newAddressId)
      });

      // console.log('+++++---', newAddress._id);
      console.log('newUser', newUser);
      await newUser.save();

      status = 200;
      response.error = false;
      response.message = 'CREATED';
    } catch (err) {
      status = 500;
      response.message = `Error ${err}`;
    }
  } else {
    status = 405;
    response.message = 'Invalid input';

  }
  res.status(status).send(response);
};

const updateUsersById = async(req, res) => {
  const { params, body } = req;
  const { userId } = params;
  const {
    address,
    ...userFromBody
  } = body;
  let status = 200;
  let response = {};
  try {
    const user = await User.model.findOne({ id: userId });
    if (user) {
      const updatedAddress = await Address.model.findOneAndUpdate(
        { _id: user.address, id:address.id },
        address,
        { new: true }
      );
      const { id, ...userFromBodyWithoutId } = userFromBody;
      const updatedUser = await User.model
        .findOneAndUpdate(
          { id: userId },
          { ...userFromBodyWithoutId },
          { new: true, select: '-_id -__v' }
        )
        .populate('address', '-_id -__v');
      response = updatedUser;
    }
   // response = user;
  } catch (err) {
    status = 500;
    response = `Error ${err}`;
  }
  res.status(status).send(response);
};

const deleteUsersById = async(req, res) => {
  const { params, body } = req;
  const { userId } = params;
  let status = 404;
  let response = {
    error: true,
    message: ''
  };
  if (userId && !isNaN(userId)) {
    try {
      const user = await User.model.findOne({ id: userId });
      const addressDeletedResult = await Address.model.deleteOne({ _id: user.address });
      if (addressDeletedResult.deletedCount > 0) {
        const userDeletedResult =  await User.model.deleteOne({ id: userId });
        if (userDeletedResult.deletedCount > 0) {
          status = 200;
          response.error = false;
          response.message = 'OK';
        } else {
          response.message = 'User not found';
        }
      } else {
        response.message = 'Address not found';
      }
    } catch (err) {
      status = 500;
      response.message = `Error ${err}`;
    }
  } else {
    status = 400;
    response.message = 'Invalid user id';
  }
  res.status(status).send(response);
};

module.exports = {
  getUsers,
  getUsersById,
  createUsers,
  updateUsersById,
  deleteUsersById,
}
