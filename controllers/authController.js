// authController.js
const User = require('../models/User');
const bcrypt = require('bcrypt');

// Handle Registration
exports.registerUser = async (req, res, next) => {
  const { username, email, password } = req.body;

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).send('<h1>Email already in use</h1><a href="/register">Try Again</a>');
    }

    const newUser = new User({ username, email, password });
    await newUser.save();
    res.send('<h1>Account Created Successfully!</h1><a href="/">Go to Home</a>');
  } catch (error) {
    console.error('Error registering user:', error.message);
    next(error);
  }
};

// Handle Login
exports.loginUser = async (req, res, next) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).send('<h1>User not found</h1><a href="/login">Try Again</a>');
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).send('<h1>Invalid credentials</h1><a href="/login">Try Again</a>');
    }

    res.send('<h1>Login Successful!</h1><a href="/">Go to Home</a>');
  } catch (error) {
    console.error('Error logging in:', error.message);
    next(error);
  }
};

// Handle Forgot Password
exports.forgotPassword = async (req, res, next) => {
  const { username, email, newPassword, confirmPassword } = req.body;

  if (newPassword !== confirmPassword) {
    return res.status(400).send('<h1>Passwords do not match</h1><a href="/forgot-password">Try Again</a>');
  }

  try {
    const user = await User.findOne({ username, email });
    if (!user) {
      return res.status(400).send('<h1>User not found</h1><a href="/forgot-password">Try Again</a>');
    }

    user.password = newPassword;
    await user.save();
    res.send('<h1>Password updated successfully</h1><a href="/login">Login</a>');
  } catch (error) {
    console.error('Error resetting password:', error.message);
    next(error);
  }
};

