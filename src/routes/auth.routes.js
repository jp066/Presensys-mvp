const express = require('express');
const router = express.Router();
const validateMiddleware = require('../middlewares/validate.middleware');
const authController = require('../controllers/auth.controller');

const blacklist = {};
router.post('/sign-up', validateMiddleware.signUpvalidateMiddleware, authController.createUser);
router.post('/sign-in', validateMiddleware.signInvalidateMiddleware , authController.signIn);
router.post("/logout", (req, res) => {
    const token = req.headers["authorization"].replace("Bearer ", "");
    blacklist[token] = true;
    setTimeout(() => delete blacklist[token], parseInt(process.env.JWT_EXPIRES) * 1000);
    res.json({ token: null });
})


module.exports = router;