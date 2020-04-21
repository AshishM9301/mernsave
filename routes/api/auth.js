const express = require('express');
const bcrypt = require('bcryptjs');
const router = express.Router();

const config = require('config');
const auth = require('../../middleware/auth');
const jwt = require('jsonwebtoken');

const saltRounds = 10;
// User Model
const User = require('../../models/Users');

// Post api/auth
// Auth user
// Public
router.post('/', (req, res) => {
  const { email, password } = req.body;

  // Simple Validation
  if (!email || !password) {
    return res.status(400).json({ msg: 'Please Enter all field' });
  }

  // Check for existing user
  User.findOne({ email }).then((user) => {
    if (!user) return res.status(400).json({ msg: 'User Does not Existed' });

    //  Validate Password

    bcrypt.compare(password, user.password).then((isMatch) => {
      if (!isMatch) return res.status(400).json({ msg: 'Invalid Credintail' });
      jwt.sign(
        { id: user.id },
        config.get('jwtSecret'),
        {
          expiresIn: 3600,
        },
        (err, token) => {
          if (err) throw err;
          res.json({
            token,
            user: {
              id: user._id,
              name: user.name,
              email: user.email,
            },
          });
        }
      );
    });
  });
});

// Get api/auth/user
// Get user Date
// Private
router.get('/user', auth, (req, res) => {
  User.findById(req.user.id)
    .select('-password')
    .then((user) => res.json(user));
});

module.exports = router;
