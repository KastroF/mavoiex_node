const Mentor = require("../models/Mentor");
const MentorRequest = require("../models/MentorRequest");

exports.getMentors = async (req, res) => {
    try {
        const { sector, expertise } = req.body;
        const filter = { isAvailable: true };
        if (sector) filter.sector = sector;

        const mentors = await Mentor.find(filter)
            .sort({ rating: -1 });
        res.status(200).json({ status: 0, mentors });
    } catch (err) {
        res.status(500).json({ status: 1, message: "Erreur serveur" });
    }
};

exports.getMentor = async (req, res) => {
    try {
        const mentor = await Mentor.findById(req.params.id).populate('currentMentees', 'name');
        if (!mentor) return res.status(404).json({ status: 1, message: "Mentor non trouve" });
        res.status(200).json({ status: 0, mentor });
    } catch (err) {
        res.status(500).json({ status: 1, message: "Erreur serveur" });
    }
};

exports.requestMentor = async (req, res) => {
    try {
        const existing = await MentorRequest.findOne({
            menteeId: req.auth.userId,
            mentorId: req.body.mentorId,
            status: "pending"
        });
        if (existing) return res.status(400).json({ status: 1, message: "Demande deja envoyee" });

        const request = new MentorRequest({
            menteeId: req.auth.userId,
            mentorId: req.body.mentorId,
            message: req.body.message,
            goals: req.body.goals
        });
        await request.save();
        res.status(201).json({ status: 0, request });
    } catch (err) {
        res.status(500).json({ status: 1, message: "Erreur serveur", error: err.message });
    }
};

exports.getMyMentorRequests = async (req, res) => {
    try {
        const requests = await MentorRequest.find({ menteeId: req.auth.userId })
            .populate('mentorId')
            .sort({ createdAt: -1 });
        res.status(200).json({ status: 0, requests });
    } catch (err) {
        res.status(500).json({ status: 1, message: "Erreur serveur" });
    }
};
