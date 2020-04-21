const express = require('express');
const bcrypt = require('bcryptjs');
const router = express.Router();

const config = require('config');

const jwt = require('jsonwebtoken');

const saltRounds = 10;
// User Model
const User = require('../../models/Users');

// Post api/users
// Register New user
// Public
router.post('/', (req, res) => {
  const { name, email, password } = req.body;

  // Simple Validation
  if (!name || !email || !password) {
    return res.status(400).json({ msg: 'Please Enter all field' });
  }

  // Check for existing user
  User.findOne({ email }).then((user) => {
    if (user) return res.status(400).json({ msg: 'User already Existed' });

    const newUser = new User({
      name,
      email,
      password,
    });

    // Create Salt & hash

    bcrypt.genSalt(10, function (err, salt) {
      bcrypt.hash(newUser.password, salt, (err, hash) => {
        if (err) {
          throw err;
        } else {
          newUser.password = hash;
          newUser.save().then((user) => {
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
        }
      });
    });
  });
});

module.exports = router;
