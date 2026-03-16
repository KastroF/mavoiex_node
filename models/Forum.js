const mongoose = require("mongoose");

const forumSchema = mongoose.Schema({
    name: { type: String, required: true },
    description: { type: String },
    icon: { type: String },
    color: { type: String },
    category: { type: String, enum: ["general", "career", "harassment", "wellbeing", "legal", "leadership"] },
    memberCount: { type: Number, default: 0 },
    postCount: { type: Number, default: 0 },
    isActive: { type: Boolean, default: true },
    moderators: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
    createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Forum", forumSchema);
