const express = require("express");
const router = express.Router();
const auth = require("../middlewares/auth");
const eventCtrl = require("../controllers/Event");

router.post("/list", auth, eventCtrl.getEvents);
router.get("/:id", auth, eventCtrl.getEvent);
router.post("/join", auth, eventCtrl.joinEvent);
router.post("/leave", auth, eventCtrl.leaveEvent);
router.post("/create", auth, eventCtrl.createEvent);

module.exports = router;
