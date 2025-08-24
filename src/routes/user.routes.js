const express = require('express');
const router = express.Router();
const auth = require('../middlewares/auth.middleware');
const userController = require('../controllers/user.controller');

router.get('/', auth.authMiddleware, userController.getUsers);
router.get('/me', auth.authMiddleware, userController.myProfile);
router.get('/:id', userController.getUserById);

module.exports = router;