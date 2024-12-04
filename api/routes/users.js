// routes/users.js
const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { User } = require('../models');
const auth = require('../middleware/authMiddleware');
require('dotenv').config();

const router = express.Router();

// Register a new user
router.post('/register', async (req, res) => {
  try {
    const { user_email, password, ...rest } = req.body;

    const user = await User.create({
      user_email,
      password: password,
      ...rest,
    });

    res.status(201).json({ message: 'User registered', userId: user.user_userid });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Login a user
router.post('/login', async (req, res) => {
  try {
    const { user_email, password } = req.body;
    const user = await User.findOne({ where: { user_email } });
    if (!user) {
      return res.status(400).json({ error: 'Invalid email' });
    }
    const validPassword = password === user.password;
    if (!validPassword) {
      return res.status(400).json({ error: 'Invalid password' });
    }
    const token = jwt.sign({ userId: user.user_userid }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.json({ token, userId: user.user_userid });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get user profile
router.get('/profile', auth, async (req, res) => {
  try {
    const user = await User.findByPk(req.user.userId, {
      attributes: { exclude: ['password'] },
    });
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    res.json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Update user profile
router.put('/profile', auth, async (req, res) => {
  try {
    const [updated] = await User.update(req.body, {
      where: { user_userid: req.user.userId },
    });
    if (updated) {
      const updatedUser = await User.findByPk(req.user.userId, {
        attributes: { exclude: ['password'] },
      });
      res.json(updatedUser);
    } else {
      res.status(404).json({ error: 'User not found' });
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Delete user
router.delete('/profile', auth, async (req, res) => {
  try {
    const deleted = await User.destroy({
      where: { user_userid: req.user.userId },
    });
    if (deleted) {
      res.json({ message: 'User deleted' });
    } else {
      res.status(404).json({ error: 'User not found' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
