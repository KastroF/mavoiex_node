const Message = require('../models/Message');

exports.sendMessage = async (req, res) => {
  try {
    const { receiverId, content, postId } = req.body;

    console.log("sendMessage body:", req.body);
    console.log("sendMessage auth:", req.auth);

    if (!content) {
      return res.status(400).json({ status: 1, message: 'Le contenu est requis.' });
    }

    const message = new Message({
      senderId: req.auth.userId,
      postId: postId || null,
      receiverId: receiverId || null,
      content
    });
    await message.save();

    const populated = await Message.findById(message._id).populate('senderId', 'name');

    return res.status(201).json({ status: 0, message: populated });
  } catch (error) {
    console.error('Erreur lors de l\'envoi du message :', error);
    return res.status(500).json({ status: 1, message: 'Erreur serveur.', error: error.message });
  }
};


exports.moreMessages = async (req, res) => {
  
    try{
      
      const {startAt, postId} = req.body; 
      
      console.log("startAt est là", startAt);
      
      const messages = await Message.find({postId}).sort({timestamp:1}).skip(startAt)
      .limit(10).populate("senderId"); 
      
      const newStartAt = messages.length === 10 ? parseInt(startAt) + 10 : null; 
      
      console.log(messages);
      res.status(200)
      .json({
        status: 0, 
        messages, 
        startAt: newStartAt
      })
      
    }catch(err){
      
        console.log(err); 
        res.status(505).json({err})
    }
}