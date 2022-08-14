const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const User = require('../models/user');
const sendEmail = require('../utils/email');

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

exports.forgotPassword = async (req, res, next) => {
  // 1) Get user based on POSTed email
  const user = await User.findOne({ email: req.body.email });

  if (!user)
    return res.status(400).json({
      status: 'fail',
      msg: 'There is no user with that email address',
    });

  // 2) Generate the random password Token
  const resetToken = user.createPasswordResetToken();

  await user.save({ validateBeforeSave: false });

  try {
    // 3) send token to user's email
    const resetURL = `${req.protocol}://${req.get(
      'host'
    )}/api/v1/auth/resetPassword/${resetToken}`;

    const message = `Forgot your password? Submit a PATCH request with your new password to: ${resetURL}.\nIf you didn't forget your password, please ignore this email`;

    await sendEmail({
      email: user.email,
      subject: 'Your password reset token(valid for 10min)',
      message: message,
    });

    return res.status(200).json({
      status: 'success',
      msg: 'Token sent to email',
    });
  } catch (err) {
    user.passwordResetToken = undefined;
    user.passwordResetExpires = undefined;
    await user.save({ validateBeforeSave: false });

    return res.status(400).json({
      status: 'fail',
      msg: 'There was an error sending the email. Try again later!',
    });
  }
};

exports.resetPassword = async (req, res, next) => {
  try {
    // 1) Get user based on the token
    const hashedToken = crypto
      .createHash('sha256')
      .update(req.params.token)
      .digest('hex');

    const user = await User.findOne({
      passwordResetToken: hashedToken,
      passwordResetExpires: { $gt: Date.now() },
    });

    // 2) If token has not expired, and there is user, set the new password
    if (!user) throw new Error('Token is invalid or has expired');

    user.password = await bcrypt.hash(req.body.password, 12);
    user.passwordResetToken = undefined;
    user.passwordResetExpires = undefined;

    await user.save();

    // 3) Update changedPasswordAt property for the user --> pre save middleware executed in the userModel

    // 4) Log the user in, send JWT
    return res.status(200).json({
      status: 'success',
      msg: 'Password successfully changed',
      data: {
        user,
      },
    });
  } catch (err) {
    return res.status(400).json({
      status: 'fail',
      msg: err.msg,
    });
  }
};
