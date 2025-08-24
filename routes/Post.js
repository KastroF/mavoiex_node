const express = require("express");
const router = express.Router();

const auth = require("../middlewares/auth");
const { handleUpload } = require("../middlewares/multer");
const postCtrl = require("../controllers/Post");

router.post('/upload', auth, handleUpload, postCtrl.addPost);
router.post("/getposts", auth, postCtrl.getPaginatedPosts);
router.post("/like", auth, postCtrl.toggleLikePost)

module.exports = router;
