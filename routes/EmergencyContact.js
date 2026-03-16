const express = require("express");
const router = express.Router();
const auth = require("../middlewares/auth");
const contactCtrl = require("../controllers/EmergencyContact");

router.post("/list", auth, contactCtrl.getContacts);
router.post("/create", auth, contactCtrl.createContact);

module.exports = router;
