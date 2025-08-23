const express = require('express');
const router = express.Router();
const validateMiddleware = require('../middlewares/validate.middleware');
const authController = require('../controllers/auth.controller');

router.post('/sign-up', validateMiddleware, authController.createUser);
router.post('/sign-in', validateMiddleware, authController.signIn);

module.exports = router;