const mongoose = require("mongoose"); 


const userSchema = mongoose.Schema({

    name: {type: String},
    email: {type: String},
    password: {type: String},
    connectionType: {type: String},
    bio: {type: String, default: ""},
    avatar: {type: String, default: ""},
    role: {type: String, default: "member"},
    createdAt: {type: Date, default: Date.now},
    fcmTokens: {type: Array}
})


module.exports = mongoose.model("User", userSchema); 