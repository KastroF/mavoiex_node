const mongoose = require("mongoose");

const mentorRequestSchema = mongoose.Schema({
    menteeId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    mentorId: { type: mongoose.Schema.Types.ObjectId, ref: "Mentor", required: true },
    message: { type: String },
    goals: { type: String },
    status: { type: String, enum: ["pending", "accepted", "declined", "completed"], default: "pending" },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("MentorRequest", mentorRequestSchema);
