const User = require('../models/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

exports.register = async (req, res, next) => {
  try {
    const existingUser = await User.findOne({ email: req.body.email });

    if (existingUser) throw new Error('User already exist!');

    const hashedPassword = await bcrypt.hash(req.body.password, 12);

    const newUser = await User.create({
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      password: hashedPassword,
      role: req.body.role,
    });

    newUser.password = undefined;

    return res.status(200).json({
      status: 'success',
      msg: 'Registration Successful',
      user: newUser,
    });
  } catch (err) {
    return res.status(400).json({
      status: 'fail',
      msg: err.message,
    });
  }
};

exports.login = async (req, res, next) => {
  try {
    // check if user exists
    const existingUser = await User.findOne({ email: req.body.email });

    if (!existingUser) throw new Error('User not found');

    // check if bodypassword and dbpassword are the same
    const isEqual = await bcrypt.compare(
      req.body.password,
      existingUser.password
    );

    if (!isEqual) throw new Error('Incorrect email or password');

    // generate token
    const token = jwt.sign(existingUser.id, process.env.JWT_SECRET);
    
    existingUser.password = undefined;

    return res.status(200).json({
      status: 'success',
      msg: 'Login Successful',
      user: existingUser,
      token,
    });
  } catch (err) {
    return res.status(400).json({
      status: 'fail',
      msg: err.message,
    });
  }
};
