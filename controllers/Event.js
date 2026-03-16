const Event = require("../models/Event");

exports.getEvents = async (req, res) => {
    try {
        const { category } = req.body;
        const filter = { isPublished: true, date: { $gte: new Date() } };
        if (category) filter.category = category;

        const events = await Event.find(filter).sort({ date: 1 });
        res.status(200).json({ status: 0, events });
    } catch (err) {
        res.status(500).json({ status: 1, message: "Erreur serveur" });
    }
};

exports.getEvent = async (req, res) => {
    try {
        const event = await Event.findById(req.params.id);
        if (!event) return res.status(404).json({ status: 1, message: "Evenement non trouve" });
        res.status(200).json({ status: 0, event });
    } catch (err) {
        res.status(500).json({ status: 1, message: "Erreur serveur" });
    }
};

exports.joinEvent = async (req, res) => {
    try {
        const event = await Event.findById(req.body.eventId);
        if (!event) return res.status(404).json({ status: 1, message: "Evenement non trouve" });

        if (event.maxParticipants && event.participants.length >= event.maxParticipants) {
            return res.status(400).json({ status: 1, message: "Evenement complet" });
        }

        if (event.participants.includes(req.auth.userId)) {
            return res.status(400).json({ status: 1, message: "Deja inscrite" });
        }

        event.participants.push(req.auth.userId);
        await event.save();
        res.status(200).json({ status: 0, message: "Inscription reussie", participantCount: event.participants.length });
    } catch (err) {
        res.status(500).json({ status: 1, message: "Erreur serveur" });
    }
};

exports.leaveEvent = async (req, res) => {
    try {
        const event = await Event.findById(req.body.eventId);
        if (!event) return res.status(404).json({ status: 1, message: "Evenement non trouve" });

        event.participants.pull(req.auth.userId);
        await event.save();
        res.status(200).json({ status: 0, message: "Desinscription reussie" });
    } catch (err) {
        res.status(500).json({ status: 1, message: "Erreur serveur" });
    }
};

exports.createEvent = async (req, res) => {
    try {
        const event = new Event(req.body);
        await event.save();
        res.status(201).json({ status: 0, event });
    } catch (err) {
        res.status(500).json({ status: 1, message: "Erreur serveur", error: err.message });
    }
};
