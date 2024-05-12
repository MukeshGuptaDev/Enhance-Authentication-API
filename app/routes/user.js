const express = require('express');
const router = express.Router();
const user = require('../controllers/user');

router.get('/profile', user.getUser);

router.get('/', user.getUsers);

router.post('/', user.createUser);

router.post('/:id', user.updateUser);

router.get('/edit/:id', user.getUserToUpdate);

module.exports = router;
