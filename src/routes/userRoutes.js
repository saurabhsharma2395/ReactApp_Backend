const express = require('express');
const { body } = require('express-validator');
const { signup, signin, logout, getUser } = require('../controllers/userController');
const validateRequest = require('../middlewares/validateRequest');
const authMiddleware = require('../middlewares/authMiddleware');

const userRouter = express.Router();

userRouter.post('/signup', [
  body('username').not().isEmpty().withMessage('Username is required'),
  body('email').isEmail().withMessage('Please enter a valid email'),
  body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters long')
], validateRequest, signup);

userRouter.post('/signin', signin);

userRouter.post('/logout', logout);

userRouter.get('/user', authMiddleware, getUser);

module.exports = userRouter;
