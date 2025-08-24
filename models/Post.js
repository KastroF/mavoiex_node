const mongoose = require("mongoose"); 


const postSchema = mongoose.Schema({
  
    userId: {type: mongoose.Schema.Types.ObjectId, ref: "User"}, 
    text: {type: String}, 
    url: {type:String}, 
    type: {type: String}, 
    mimeType: {type: String}, 
    likes: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
    date: {type: Date}, 
    switchValue: {type: Boolean}, 
    category: {type: String}
  
})


module.exports = mongoose.model("Post", postSchema);