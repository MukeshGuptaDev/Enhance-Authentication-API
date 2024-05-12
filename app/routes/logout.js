const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  res.cookie('token', '', { httpOnly: true });
  res.cookie('connect.sid', '', { httpOnly: true });
  res.redirect('login');
});

module.exports = router;
