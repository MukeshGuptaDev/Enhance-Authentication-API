const express = require('express');
const router = express.Router();
const { registerUser } = require('../controllers/registerUser');

router.get('/', (req, res) => {
  res.render('register');
});

router.post('/', registerUser);

module.exports = router;
