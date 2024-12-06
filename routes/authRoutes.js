const express = require('express');
const { registerUser, loginUser, forgotPassword } = require('../controllers/authController');

const router = express.Router();

router.get('/', (req, res) => {
  res.render('index');
});

router.get('/register', (req, res) => {
  res.render('register');
});

router.post('/register', registerUser);

router.get('/login', (req, res) => {
  res.render('login');
});

router.post('/login', loginUser);

router.get('/forgot-password', (req, res) => {
  res.render('forgotPassword'); // Render the Forgot Password form
});

router.post('/forgot-password', forgotPassword); // Handle Forgot Password logic

module.exports = router;
