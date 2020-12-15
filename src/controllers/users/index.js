'use strict';

const mongoose = require('mongoose');
const Address = require('../../models/address');
const User = require('../../models/user');
const common = require('../../utils/common');

/**
 * Get all users all populate with address collection
 * @param {*} req
 * @param {*} res
 */
const getUsers = async(req, res) => {
  let status = 500;
  let response = [];
  try {
    const users = await User.model
      .find({}, '-_id -__v')
      .populate('address', '-_id -__v');
    response = users;
    status = 200;
    if (users.length < 1) {
      status = 204;
    }
  } catch(err) {
    status = 500;
    response = `Error ${err}`;
  }
  res.status(status).send(response);
};

/**
 * Get one user registered by ID
 * @param {*} req
 * @param {*} res
 */
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

/**
 * Register one user on Database - User collection
 * @param {*} req
 * @param {*} res
 */
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
  //  Check if all fields are not empty
  if (id && name && email && birthDate &&  address) {
    if (common.isDate(birthDate)) {
      try {
        //  Address creation
        const addressModel = new Address.model(address);
        const newAddress = await addressModel.save();
        const newAddressId = newAddress._id;
        //  User creation
        const newUser = new User.model({
          id,
          name,
          email,
          birthDate,
          address: mongoose.Types.ObjectId(newAddressId)
        });
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
      response.message = `Invalid input birthDate: ${birthDate}`;
    }
  } else {
    status = 405;
    response.message = 'Invalid input';

  }
  res.status(status).send(response);
};

/**
 * Update user and address on database
 * @param {*} req
 * @param {*} res
 */
const updateUsersById = async(req, res) => {
  const { params, body } = req;
  const { userId } = params;
  const {
    address,
    ...userFromBody
  } = body;
  let status = 200;
  let response = {
    error: true,
    message: ''
  };
  //  Check if user ID is valid (not null and is a number)
  if (userId && !isNaN(userId)) {
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
      } else {
        status = 404;
        response.message = 'Invalid user id'
      }
    } catch (err) {
      status = 500;
      response = `Error ${err}`;
    }
  } else {
    status = 400;
    response.message = 'Invalid user id';
  }
  res.status(status).send(response);
};

/**
 * Delete user and address on database
 * @param {*} req
 * @param {*} res
 */
const deleteUsersById = async(req, res) => {
  const { params, body } = req;
  const { userId } = params;
  let status = 404;
  let response = {
    error: true,
    message: ''
  };
  //  Check if user ID is valid (not null and is a number)
  if (userId && !isNaN(userId)) {
    try {
      const user = await User.model.findOne({ id: userId });
      if (user) {
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
      } else {
        response.message = 'User not found';
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
