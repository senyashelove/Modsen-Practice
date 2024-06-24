const ApiError = require('../models/error');

module.exports = (err, req, res, next) => {
  if (err instanceof ApiError) {
    res.status(err.status).json({ error: err.message, errors: err.errors });
  } else {
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

