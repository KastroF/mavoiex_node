const mongoose = require("mongoose"); 


const userSchema = mongoose.Schema({
  
    name: {type: String}, 
    email: {type: String}, 
    password: {type: String}, 
    connectionType: {type: String},
    fcmTokens: {type: Array}
})


module.exports = mongoose.model("User", userSchema); 