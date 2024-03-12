const jwt = require('jsonwebtoken');
const User = require('../models/user');
const cookieParser = require('cookie-parser');
const express = require('express');
const app = express();
app.use(cookieParser());

module.exports = async (req, res, next) => {
  console.log('Cookies: ', req.cookies);
  console.log('Headers: ', req.headers);
  try {
    const token = req.cookies['token'];
    if (!token) {
      return res.status(403).json({ message: 'Not authorized' });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Fetch the user from the database
    const user = await User.findById(decoded.id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    req.user = user;
    next();
  } catch (error) {
    console.error('Authentication error:', error.message);
    res.status(401).json({ message: 'Not authorized, token failed' });
  }
};
