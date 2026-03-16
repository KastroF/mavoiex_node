const mongoose = require("mongoose");

const eventSchema = mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    type: { type: String, enum: ["webinar", "workshop", "networking", "conference", "training"], required: true },
    date: { type: Date, required: true },
    endDate: { type: Date },
    location: { type: String },
    isOnline: { type: Boolean, default: true },
    meetingLink: { type: String },
    speaker: { type: String },
    speakerBio: { type: String },
    imageUrl: { type: String },
    maxParticipants: { type: Number },
    participants: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
    category: { type: String, enum: ["career", "legal", "wellbeing", "leadership", "networking"] },
    isPublished: { type: Boolean, default: true },
    createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Event", eventSchema);
