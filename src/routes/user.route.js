const express = require('express');
const router = express.Router();

const userController = require('../controllers/user/user.controller');


router.get('/', userController.findAll)
router.get('/:id', userController.getProfile)

module.exports = router;