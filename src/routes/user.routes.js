const express = require('express');
const router = express.Router();
const auth = require('../middlewares/auth.middleware');
const userController = require('../controllers/user.controller');

router.get('/', userController.getUsers);
router.get('/:id', userController.getUserById);
router.get('/me', auth.authMiddleware, userController.myProfile);

module.exports = router;