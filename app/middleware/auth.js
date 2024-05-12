const jwt = require('jsonwebtoken');

let authenticateToken = function (req, res, next) {
  try {
    if (req?.session?.passport?.user?._json) {
      ensureAuthenticated;
    } else {
      const token = req.cookies['token'];
      if (!token) throw error;

      jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (error, user) => {
        if (error) throw error;
        req.userEmail = user.email;
      });
    }

    next();
  } catch (error) {
    res.clearCookie('token');
    res.redirect('/login');
  }
};

function ensureAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }
  res.redirect('/login');
}

module.exports = { authenticateToken };
