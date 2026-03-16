const express = require("express");
const router = express.Router();
const auth = require("../middlewares/auth");
const forumCtrl = require("../controllers/Forum");

router.get("/list", auth, forumCtrl.getForums);
router.post("/posts", auth, forumCtrl.getForumPosts);
router.post("/posts/create", auth, forumCtrl.createForumPost);
router.get("/posts/:id/replies", auth, forumCtrl.getReplies);
router.post("/posts/like", auth, forumCtrl.likeForumPost);

module.exports = router;
