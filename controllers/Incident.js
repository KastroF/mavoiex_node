const Incident = require("../models/Incident");

exports.createIncident = async (req, res) => {
    try {
        const incident = new Incident({
            ...req.body,
            userId: req.auth.userId
        });
        await incident.save();
        res.status(201).json({ status: 0, incident });
    } catch (err) {
        res.status(500).json({ status: 1, message: "Erreur serveur", error: err.message });
    }
};

exports.getMyIncidents = async (req, res) => {
    try {
        const incidents = await Incident.find({ userId: req.auth.userId })
            .sort({ createdAt: -1 });
        res.status(200).json({ status: 0, incidents });
    } catch (err) {
        res.status(500).json({ status: 1, message: "Erreur serveur" });
    }
};

exports.getIncident = async (req, res) => {
    try {
        const incident = await Incident.findOne({
            _id: req.params.id,
            userId: req.auth.userId
        });
        if (!incident) return res.status(404).json({ status: 1, message: "Incident non trouve" });
        res.status(200).json({ status: 0, incident });
    } catch (err) {
        res.status(500).json({ status: 1, message: "Erreur serveur" });
    }
};

exports.updateIncident = async (req, res) => {
    try {
        const incident = await Incident.findOneAndUpdate(
            { _id: req.params.id, userId: req.auth.userId },
            { ...req.body, updatedAt: Date.now() },
            { new: true }
        );
        if (!incident) return res.status(404).json({ status: 1, message: "Incident non trouve" });
        res.status(200).json({ status: 0, incident });
    } catch (err) {
        res.status(500).json({ status: 1, message: "Erreur serveur" });
    }
};

exports.deleteIncident = async (req, res) => {
    try {
        const incident = await Incident.findOneAndDelete({
            _id: req.params.id,
            userId: req.auth.userId
        });
        if (!incident) return res.status(404).json({ status: 1, message: "Incident non trouve" });
        res.status(200).json({ status: 0, message: "Incident supprime" });
    } catch (err) {
        res.status(500).json({ status: 1, message: "Erreur serveur" });
    }
};

exports.getIncidentStats = async (req, res) => {
    try {
        const userId = req.auth.userId;
        const total = await Incident.countDocuments({ userId });
        const byStatus = await Incident.aggregate([
            { $match: { userId: require("mongoose").Types.ObjectId(userId) } },
            { $group: { _id: "$status", count: { $sum: 1 } } }
        ]);
        const byType = await Incident.aggregate([
            { $match: { userId: require("mongoose").Types.ObjectId(userId) } },
            { $group: { _id: "$harassmentType", count: { $sum: 1 } } }
        ]);
        res.status(200).json({ status: 0, stats: { total, byStatus, byType } });
    } catch (err) {
        res.status(500).json({ status: 1, message: "Erreur serveur" });
    }
};
