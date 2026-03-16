const mongoose = require("mongoose");

const successStorySchema = mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    title: { type: String, required: true },
    content: { type: String, required: true },
    category: { type: String, enum: ["career", "harassment_overcome", "leadership", "entrepreneurship"] },
    imageUrl: { type: String },
    isAnonymous: { type: Boolean, default: false },
    isApproved: { type: Boolean, default: false },
    likes: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
    views: { type: Number, default: 0 },
    isFeatured: { type: Boolean, default: false },
    createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("SuccessStory", successStorySchema);
