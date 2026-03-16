const Forum = require("../models/Forum");
const ForumPost = require("../models/ForumPost");

exports.getForums = async (req, res) => {
    try {
        const forums = await Forum.find({ isActive: true }).sort({ memberCount: -1 });
        res.status(200).json({ status: 0, forums });
    } catch (err) {
        res.status(500).json({ status: 1, message: "Erreur serveur" });
    }
};

exports.getForumPosts = async (req, res) => {
    try {
        const { forumId } = req.body;
        const startAt = parseInt(req.body.startAt) || 0;
        const limit = 15;

        const posts = await ForumPost.find({ forumId, parentId: null })
            .sort({ createdAt: -1 })
            .skip(startAt)
            .limit(limit)
            .populate('userId', 'name avatar');

        const newStartAt = posts.length === limit ? startAt + limit : null;
        res.status(200).json({ status: 0, posts, startAt: newStartAt });
    } catch (err) {
        res.status(500).json({ status: 1, message: "Erreur serveur" });
    }
};

exports.createForumPost = async (req, res) => {
    try {
        const post = new ForumPost({
            forumId: req.body.forumId,
            userId: req.auth.userId,
            content: req.body.content,
            isAnonymous: req.body.isAnonymous || false,
            parentId: req.body.parentId || null
        });
        await post.save();

        if (req.body.parentId) {
            await ForumPost.findByIdAndUpdate(req.body.parentId, { $inc: { replyCount: 1 } });
        }

        await Forum.findByIdAndUpdate(req.body.forumId, { $inc: { postCount: 1 } });

        const populated = await ForumPost.findById(post._id).populate('userId', 'name avatar');
        res.status(201).json({ status: 0, post: populated });
    } catch (err) {
        res.status(500).json({ status: 1, message: "Erreur serveur", error: err.message });
    }
};

exports.getReplies = async (req, res) => {
    try {
        const replies = await ForumPost.find({ parentId: req.params.id })
            .sort({ createdAt: 1 })
            .populate('userId', 'name avatar');
        res.status(200).json({ status: 0, replies });
    } catch (err) {
        res.status(500).json({ status: 1, message: "Erreur serveur" });
    }
};

exports.likeForumPost = async (req, res) => {
    try {
        const post = await ForumPost.findById(req.body.postId);
        if (!post) return res.status(404).json({ status: 1, message: "Post non trouve" });

        const alreadyLiked = post.likes.includes(req.auth.userId);
        if (alreadyLiked) {
            post.likes.pull(req.auth.userId);
        } else {
            post.likes.push(req.auth.userId);
        }
        await post.save();
        res.status(200).json({ status: 0, liked: !alreadyLiked, totalLikes: post.likes.length });
    } catch (err) {
        res.status(500).json({ status: 1, message: "Erreur serveur" });
    }
};
