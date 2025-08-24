const Post = require("../models/Post");
const User = require("../models/User");
const Message = require("../models/Message");
const sendNotification = require("../utils/SendPushNotification"); 





exports.addPost = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'Aucun fichier reçu.' });
    }

    console.log('Fichier reçu :', req.file);
    console.log('Données reçues :', req.body);

    // Exemple de création d’un post en BDD
    const post = new Post ({
      url: req.file.path,
      mimeType: req.file.mimetype,
      text: req.body.text,
      type: req.body.type, 
      userId: req.auth.userId, 
      switchValue: req.body.switchValue,
      category: req.body.category, 
      date: new Date()
      // Ajoute d'autres champs selon ta logique
    });

    await post.save(); // Si tu as un modèle
    const user = await User.findById(req.auth.userId);
    
    if(req.body.type === "video"){

        const tokens = await DeviceToken.find({ userId: req.auth.userId });


        for (let t of tokens) {
          await sendNotification({
            token: t.token,
            title: "Félicitations",
            body: `Votre publication a bien été posté pour la consulter raffraîchissez le mur d'accueil ou votre profil`,
            badge: 1,
            data: {Page:`Wall`},
          });
        }


      
    }
    

       return res.status(201).json({ message: 'Post créé avec succès.',  status: 0 });
   
      
      
   

  } catch (err) {
    console.error('Erreur dans addPost :', err);
    return res.status(500).json({ error: 'Erreur serveur', details: err.message });
  }
};


 // si ce n'est pas encore importé

exports.getPaginatedPosts = async (req, res) => {
  try {
    const userId = req.auth.userId;
    const startAt = parseInt(req.body.startAt) || 0;
    const limit = 10;

    const posts = await Post.find({category: req.body.category})
      .sort({ date: -1 })
      .skip(startAt)
      .limit(limit)
      .populate('userId');

    const detailedPosts = await Promise.all(posts.map(async (post) => {
      // Vérifie si l'utilisateur a liké
      const isLiked = post.likes.includes(userId);

      // Nombre total de messages pour ce post
      const totalMessages = await Message.countDocuments({ postId: post._id });

      // 10 premiers messages par ordre croissant
      const messages = await Message.find({ postId: post._id })
        .sort({ timestamp: 1 }) 
        .limit(10)
        .populate('senderId');

      const messageStartAt = totalMessages > 10 ? 10 : null;

      return {
        ...post.toObject(),
        isLiked,
        totalMessages,
        messages,
        messageStartAt
      };
    }));

    const newStartAt = posts.length === limit ? startAt + posts.length : null;
    
    console.log(detailedPosts[0])

    res.status(200).json({
      posts: detailedPosts,
      startAt: newStartAt,
      status: 0
    });

  } catch (err) {
    console.error("Erreur lors de la récupération des posts :", err);
    res.status(500).json({
      error: "Erreur serveur lors de la récupération des posts."
    });
  }
};


exports.toggleLikePost = async (req, res) => {
  const { postId} = req.body;
  
  const userId = req.auth.userId;

  if (!postId || !userId) {
    return res.status(400).json({ error: "postId et userId sont requis." });
  }

  try {
    const post = await Post.findById(postId);
    if (!post) return res.status(404).json({ error: "Post introuvable." });

    const alreadyLiked = post.likes.includes(userId);

    if (alreadyLiked) {
      post.likes.pull(userId);
    } else {
      post.likes.push(userId);
    }

    await post.save();

    res.status(200).json({
      liked: !alreadyLiked,
      totalLikes: post.likes.length,
      status: 0
    });
  } catch (err) {
    res.status(500).json({ error: "Erreur serveur." });
  }
};


