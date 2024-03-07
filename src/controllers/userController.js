const express = require('express');
const userModel = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require('dotenv').config(); // Ensure dotenv is configured in your entry file, not here, if already configured in index.js, remove this line.
// Removed the import for cookie-parser since it's middleware and should be used in your main server file (index.js) not here

// Controller function for user signup
const signup = async (req, res) => {
  const { username, password, email } = req.body;
  try {
    // Checking if the user already exists
    const existingUser = await userModel.findOne({ email: email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" }); 
    }
    // Hashing the password using bcrypt
    const hashedPassword = await bcrypt.hash(password, 10);
    const result = await userModel.create({
      email: email,
      password: hashedPassword,
      username: username,
    });
    // Generating a JWT token for the newly created user
    const token = jwt.sign({ email: result.email, id: result._id }, process.env.JWT_SECRET, { expiresIn: "1h" });
    return res.status(201).json({ user: result, token: token }); // Returning the user data and token with a 201 status
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Something went wrong" }); 
  }
};

// Updated signin to use HTTP-only cookies
const signin = async (req, res) => {
  const { email, password } = req.body;
  try {
    const existingUser = await userModel.findOne({ email });
    if (!existingUser) {
      return res.status(404).json({ message: "User not found" });
    }

    const isPasswordCorrect = await bcrypt.compare(password, existingUser.password);
    if (!isPasswordCorrect) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign({ email: existingUser.email, id: existingUser._id }, process.env.JWT_SECRET, { expiresIn: "1h" });
    
    res.cookie('token', token, { httpOnly: true, secure: process.env.NODE_ENV === 'production', sameSite: 'strict', maxAge: 3600000 });
    return res.status(200).json({ message: "Login successful" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Something went wrong" });
  }
};

module.exports = { signup, signin };
