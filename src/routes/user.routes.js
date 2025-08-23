const express = require('express');
const router = express.Router();
const validateMiddleware = require('../middlewares/validate.middleware');
const userController = require('../controllers/user.controller');

router.get('/', userController.getUsers);
router.post('/', validateMiddleware, userController.createUser);

module.exports = router;