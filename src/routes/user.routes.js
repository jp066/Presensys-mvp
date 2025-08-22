const express = require('express');
const router = express.Router();


router.get('/', /*authMiddleware,*/ (req, res) => {
    res.json({ message: 'GET request to /users' });
}); // exemplo de rota protegida

module.exports = router;