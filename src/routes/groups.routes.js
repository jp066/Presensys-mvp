const express = require('express');
const router = express.Router();
const groupController = require('../controllers/group.controller');

router.get('/', groupController.getGroups);
router.post('/', groupController.createGroups);
router.post('/send-invite', groupController.sendGroupInvite);

module.exports = router;