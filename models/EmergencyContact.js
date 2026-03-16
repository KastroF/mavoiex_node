const mongoose = require("mongoose");

const emergencyContactSchema = mongoose.Schema({
    name: { type: String, required: true },
    role: { type: String, required: true },
    specialty: { type: String, enum: ["psychologist", "lawyer", "police", "social_worker", "hotline", "association", "medical"], required: true },
    phone: { type: String },
    email: { type: String },
    address: { type: String },
    city: { type: String },
    description: { type: String },
    availability: { type: String },
    isEmergency: { type: Boolean, default: false },
    isActive: { type: Boolean, default: true },
    order: { type: Number, default: 0 },
    createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("EmergencyContact", emergencyContactSchema);
