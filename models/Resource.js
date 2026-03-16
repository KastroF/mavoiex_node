const mongoose = require("mongoose");

const resourceSchema = mongoose.Schema({
    title: { type: String, required: true },
    content: { type: String, required: true },
    summary: { type: String },
    category: { type: String, enum: ["legal", "harassment_types", "prevention", "career", "wellbeing"], required: true },
    type: { type: String, enum: ["article", "video", "infographic", "guide", "quiz"], default: "article" },
    mediaUrl: { type: String },
    thumbnailUrl: { type: String },
    tags: [String],
    author: { type: String },
    readTime: { type: Number },
    views: { type: Number, default: 0 },
    isPublished: { type: Boolean, default: true },
    order: { type: Number, default: 0 },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Resource", resourceSchema);
