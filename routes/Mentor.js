const express = require("express");
const router = express.Router();
const auth = require("../middlewares/auth");
const mentorCtrl = require("../controllers/Mentor");

router.post("/list", auth, mentorCtrl.getMentors);
router.get("/:id", auth, mentorCtrl.getMentor);
router.post("/request", auth, mentorCtrl.requestMentor);
router.get("/requests/my", auth, mentorCtrl.getMyMentorRequests);

module.exports = router;
