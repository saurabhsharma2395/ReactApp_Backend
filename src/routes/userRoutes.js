const express = require('express');
const { body } = require('express-validator');
const { signup, signin } = require('../controllers/userController');
const validateRequest = require('../middlewares/validateRequest');

const userRouter = express.Router();

userRouter.post('/signup', [
  body('username').not().isEmpty().withMessage('Username is required'),
  body('email').isEmail().withMessage('Email is not valid'),
  body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters long')
], validateRequest, signup);

userRouter.post('/signin', signin);

module.exports = userRouter;
