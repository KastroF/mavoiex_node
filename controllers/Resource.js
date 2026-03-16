const Resource = require("../models/Resource");

exports.getResources = async (req, res) => {
    try {
        const { category, type } = req.body;
        const filter = { isPublished: true };
        if (category) filter.category = category;
        if (type) filter.type = type;

        const resources = await Resource.find(filter)
            .sort({ order: 1, createdAt: -1 });
        res.status(200).json({ status: 0, resources });
    } catch (err) {
        res.status(500).json({ status: 1, message: "Erreur serveur" });
    }
};

exports.getResource = async (req, res) => {
    try {
        const resource = await Resource.findByIdAndUpdate(
            req.params.id,
            { $inc: { views: 1 } },
            { new: true }
        );
        if (!resource) return res.status(404).json({ status: 1, message: "Ressource non trouvee" });
        res.status(200).json({ status: 0, resource });
    } catch (err) {
        res.status(500).json({ status: 1, message: "Erreur serveur" });
    }
};

exports.createResource = async (req, res) => {
    try {
        const resource = new Resource(req.body);
        await resource.save();
        res.status(201).json({ status: 0, resource });
    } catch (err) {
        res.status(500).json({ status: 1, message: "Erreur serveur", error: err.message });
    }
};
