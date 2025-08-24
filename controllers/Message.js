const Message = require('../models/Message');

exports.sendMessage = async (req, res) => {
  try {
    const { senderId, receiverId, content, postId } = req.body;

    if (!receiverId || !content) {
      return res.status(400).json({ message: 'Champs requis manquants.' });
    }

    const message = new Message({ senderId: req.auth.userId, postId, receiverId, content });
    await message.save();

    return res.status(201).json({ message: 'Message envoyé avec succès.', data: message });
  } catch (error) {
    console.error('Erreur lors de l\'envoi du message :', error);
    return res.status(500).json({ message: 'Erreur serveur.' });
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