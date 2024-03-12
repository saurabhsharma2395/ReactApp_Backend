const express = require('express');
const User = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require('dotenv').config();


exports.getUser = async (req, res) => {
  try {
    const token = req.cookies['token'];
    if (!token) return res.status(401).json({ message: 'Not authenticated' });

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.id).select('-password');

    if (!user) return res.status(404).json({ message: 'User not found' });

    res.status(200).json({ user });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Something went wrong' });
  }
};

// Controller function for user signup
exports.signup = async (req, res) => {
  const { username, email, password } = req.body;
console.log("body", req.body);
  try {
      const existingUser = await User.findOne({ email });
      if (existingUser) {
          return res.status(400).json({ message: "User already exists" });
      }

      const hashedPassword = await bcrypt.hash(password, 12);

      const result = await User.create({
        username,
          email,
          password: hashedPassword,
          
      });

      const token = jwt.sign({ email: result.email, id: result._id }, process.env.JWT_SECRET, { expiresIn: "1h" });

      res.cookie('token', token, {
          httpOnly: true,
          maxAge: 3600000 // 1 hour
      });

      res.status(201).json({ user: result });
  } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Something went wrong" });
  }
};

// Controller function for user signin
exports.signin = async (req, res) => {
  const { email, password } = req.body;

  try {
      const user = await User.findOne({ email });
      if (!user) {
          return res.status(404).json({ message: "User not found" });
      }

      const isPasswordCorrect = await bcrypt.compare(password, user.password);
      if (!isPasswordCorrect) {
          return res.status(400).json({ message: "Invalid credentials" });
      }

      const token = jwt.sign({ email: user.email, id: user._id }, process.env.JWT_SECRET, { expiresIn: "1h" });

      res.cookie('token', token, {
          httpOnly: true,
          maxAge: 3600000
      });

      res.status(200).json({ message: "Login successful", user: { email, id: user._id } });
  } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Something went wrong" });
  }
};

// Controller function for user logout
exports.logout = (req, res) => {
  res.clearCookie('token');
  res.status(200).json({ message: "Logout successful" });
};

