const { validationResult } = require('express-validator');

const validateRequest = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    // Enhanced error response
    const extractedErrors = errors.array().map(err => ({
      [err.param]: err.msg,
    }));

    return res.status(400).json({
      message: "Validation error",
      errors: extractedErrors,
    });
  }
  next();
};

module.exports = validateRequest;
