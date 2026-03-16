const Post = require("../models/Post");
const User = require("../models/User");
const Incident = require("../models/Incident");
const Event = require("../models/Event");
const SuccessStory = require("../models/SuccessStory");
const Forum = require("../models/Forum");
const ForumPost = require("../models/ForumPost");
const MentorRequest = require("../models/MentorRequest");

exports.getGlobalStats = async (req, res) => {
    try {
        const totalUsers = await User.countDocuments();
        const totalPosts = await Post.countDocuments();
        const totalIncidents = await Incident.countDocuments();
        const totalEvents = await Event.countDocuments({ isPublished: true });
        const totalStories = await SuccessStory.countDocuments({ isApproved: true });
        const totalForumPosts = await ForumPost.countDocuments();
        const totalMentorships = await MentorRequest.countDocuments({ status: "accepted" });

        const incidentsByType = await Incident.aggregate([
            { $group: { _id: "$harassmentType", count: { $sum: 1 } } }
        ]);

        const postsByCategory = await Post.aggregate([
            { $group: { _id: "$category", count: { $sum: 1 } } }
        ]);

        const recentUsersCount = await User.countDocuments({
            createdAt: { $gte: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000) }
        });

        res.status(200).json({
            status: 0,
            stats: {
                totalUsers,
                totalPosts,
                totalIncidents,
                totalEvents,
                totalStories,
                totalForumPosts,
                totalMentorships,
                incidentsByType,
                postsByCategory,
                recentUsersCount,
            }
        });
    } catch (err) {
        res.status(500).json({ status: 1, message: "Erreur serveur" });
    }
};
