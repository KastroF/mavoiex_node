const EmergencyContact = require("../models/EmergencyContact");

exports.getContacts = async (req, res) => {
    try {
        const { specialty } = req.body;
        const filter = { isActive: true };
        if (specialty) filter.specialty = specialty;

        const contacts = await EmergencyContact.find(filter)
            .sort({ isEmergency: -1, order: 1 });
        res.status(200).json({ status: 0, contacts });
    } catch (err) {
        res.status(500).json({ status: 1, message: "Erreur serveur" });
    }
};

exports.createContact = async (req, res) => {
    try {
        const contact = new EmergencyContact(req.body);
        await contact.save();
        res.status(201).json({ status: 0, contact });
    } catch (err) {
        res.status(500).json({ status: 1, message: "Erreur serveur", error: err.message });
    }
};
