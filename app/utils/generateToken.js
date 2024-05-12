const jwt = require('jsonwebtoken');

let generateAccessToken = function ({ email }) {
  return jwt.sign({ email }, process.env.ACCESS_TOKEN_SECRET, {
    expiresIn: '300s',
  });
};

module.exports = { generateAccessToken };
