const express = require('express');
const router = express.Router();

const { sendMessage, moreMessages } = require('../controllers/Message');
const auth = require("../middlewares/auth"); 

router.post('/send', auth, sendMessage);
router.post('/moremessages', auth, moreMessages);

module.exports = router;
