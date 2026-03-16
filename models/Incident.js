const mongoose = require("mongoose");

const incidentSchema = mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    title: { type: String, required: true },
    description: { type: String, required: true },
    date: { type: Date, required: true },
    time: { type: String },
    location: { type: String },
    harassmentType: { type: String, enum: ["moral", "sexual", "psychological", "discrimination", "other"] },
    witnesses: [{ name: String, contact: String }],
    attachments: [{ url: String, type: String, name: String }],
    severity: { type: String, enum: ["low", "medium", "high", "critical"], default: "medium" },
    status: { type: String, enum: ["draft", "documented", "reported"], default: "draft" },
    isAnonymous: { type: Boolean, default: false },
    notes: { type: String },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now }
});

incidentSchema.pre('save', function(next) {
    this.updatedAt = Date.now();
    next();
});

module.exports = mongoose.model("Incident", incidentSchema);
