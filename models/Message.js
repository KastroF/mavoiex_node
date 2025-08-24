const mongoose = require('mongoose');

const messageSchema = new mongoose.Schema({
  senderId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  receiverId: { type: mongoose.Schema.Types.ObjectId,  ref: 'User' },
  content: { type: String, required: true },
  timestamp: { type: Date, default: Date.now }, 
  postId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Post",
  },
});

module.exports = mongoose.model('Message', messageSchema);
