const mongoose = require("mongoose");

const forumPostSchema = mongoose.Schema({
    forumId: { type: mongoose.Schema.Types.ObjectId, ref: "Forum", required: true },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    content: { type: String, required: true },
    isAnonymous: { type: Boolean, default: false },
    parentId: { type: mongoose.Schema.Types.ObjectId, ref: "ForumPost", default: null },
    likes: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
    replyCount: { type: Number, default: 0 },
    isReported: { type: Boolean, default: false },
    createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("ForumPost", forumPostSchema);
