const SuccessStory = require("../models/SuccessStory");

exports.getStories = async (req, res) => {
    try {
        const { category } = req.body;
        const filter = { isApproved: true };
        if (category) filter.category = category;

        const stories = await SuccessStory.find(filter)
            .populate('userId', 'name avatar')
            .sort({ isFeatured: -1, createdAt: -1 });
        res.status(200).json({ status: 0, stories });
    } catch (err) {
        res.status(500).json({ status: 1, message: "Erreur serveur" });
    }
};

exports.createStory = async (req, res) => {
    try {
        const story = new SuccessStory({
            ...req.body,
            userId: req.auth.userId
        });
        await story.save();
        res.status(201).json({ status: 0, story, message: "Histoire soumise pour approbation" });
    } catch (err) {
        res.status(500).json({ status: 1, message: "Erreur serveur", error: err.message });
    }
};

exports.likeStory = async (req, res) => {
    try {
        const story = await SuccessStory.findById(req.body.storyId);
        if (!story) return res.status(404).json({ status: 1, message: "Histoire non trouvee" });

        const alreadyLiked = story.likes.includes(req.auth.userId);
        if (alreadyLiked) {
            story.likes.pull(req.auth.userId);
        } else {
            story.likes.push(req.auth.userId);
        }
        await story.save();
        res.status(200).json({ status: 0, liked: !alreadyLiked, totalLikes: story.likes.length });
    } catch (err) {
        res.status(500).json({ status: 1, message: "Erreur serveur" });
    }
};

exports.getMyStories = async (req, res) => {
    try {
        const stories = await SuccessStory.find({ userId: req.auth.userId })
            .sort({ createdAt: -1 });
        res.status(200).json({ status: 0, stories });
    } catch (err) {
        res.status(500).json({ status: 1, message: "Erreur serveur" });
    }
};
