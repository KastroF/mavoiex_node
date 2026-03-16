const express = require("express");
const router = express.Router();
const auth = require("../middlewares/auth");
const storyCtrl = require("../controllers/SuccessStory");

router.post("/list", auth, storyCtrl.getStories);
router.post("/create", auth, storyCtrl.createStory);
router.post("/like", auth, storyCtrl.likeStory);
router.get("/my", auth, storyCtrl.getMyStories);

module.exports = router;
