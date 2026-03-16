const mongoose = require("mongoose");

const mentorSchema = mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    name: { type: String, required: true },
    title: { type: String },
    sector: { type: String },
    expertise: [String],
    bio: { type: String },
    avatar: { type: String },
    yearsExperience: { type: Number },
    availableSlots: { type: Number, default: 3 },
    currentMentees: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
    isAvailable: { type: Boolean, default: true },
    rating: { type: Number, default: 0 },
    totalSessions: { type: Number, default: 0 },
    createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Mentor", mentorSchema);
