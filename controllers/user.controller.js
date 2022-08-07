const User = require('../models/user');

exports.getAllUsers = async (req, res, next) => {
  try {
    const users = await User.find();
    if (!users) throw new Error('No user found');

    return res.status(200).json({
      status: 'success',
      countOfUsers: users.length,
      users,
    });
  } catch (err) {
    return res.status(200).json({
      status: 'fail',
      msg: err.message,
    });
  }
};

exports.getUser = async (req, res, next) => {
  try {
    const existingUser = await User.findById(req.query.id);

    if (!existingUser) throw new Error('User not found');

    return res.status(200).json({
      status: 'success',
      message: 'user fetched successfully',
      user: existingUser,
    });
  } catch (err) {
    return res.status(200).json({
      status: 'fail',
      msg: err.message,
    });
  }
};

exports.updateUser = async (req, res, next) => {
  try {
    const existingUser = await User.findById(req.query.id);

    if (!existingUser) throw new Error('User not found');

    const updateUser = await User.findByIdAndUpdate(req.body, {
      new: true,
    });

    return res.status(200).json({
      status: 'success',
      message: 'user updated successfully',
      user: updateUser,
    });
  } catch (err) {
    return res.status(200).json({
      status: 'fail',
      msg: err.message,
    });
  }
};

exports.deleteUser = async (req, res, next) => {
  try {
    const existingUser = await User.findById(req.query.id);

    if (!existingUser) throw new Error('User not found');

    await User.findByIdAndDelete(req.query.id);

    return res.status(200).json({
      status: 'success',
      message: 'user deleted successfully',
    });
  } catch (err) {
    return res.status(400).json({
      status: 'fail',
      msg: err.message,
    });
  }
};
