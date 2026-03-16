const express = require("express"); 
const mongoose = require("mongoose");

const fs = require("fs");
const cors = require('cors');
const path = require("path");
require("dotenv").config(); 

const app = express();
app.use(cors());

app.use(express.json({limit: "50mb"})); 
app.use(express.urlencoded({ extended: true }));


app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');

    next();
});

mongoose.connect(`mongodb+srv://mavoix33:${process.env.MONGOPASS}@cluster0.uogan.mongodb.net/mavoiex?retryWrites=true&w=majority&appName=Cluster0`,

  { useNewUrlParser: true,
    useUnifiedTopology: true, autoIndex: true })
  .then(() => console.log('Connexion à MongoDB réussie !'))
  .catch((err) => console.log('Connexion à MongoDB échouée !', err));


const userRouter = require("./routes/User");
const postRouter = require("./routes/Post");
const messagesRouter = require("./routes/Message");
const tokenRouter = require("./routes/DeviceToken");
const incidentRouter = require("./routes/Incident");
const resourceRouter = require("./routes/Resource");
const emergencyRouter = require("./routes/EmergencyContact");
const mentorRouter = require("./routes/Mentor");
const eventRouter = require("./routes/Event");
const forumRouter = require("./routes/Forum");
const storyRouter = require("./routes/SuccessStory");
const statsRouter = require("./routes/Stats");

app.use("/api/token", tokenRouter);
app.use("/api/user", userRouter);
app.use("/api/post", postRouter);
app.use("/api/message", messagesRouter);
app.use("/api/incident", incidentRouter);
app.use("/api/resource", resourceRouter);
app.use("/api/emergency", emergencyRouter);
app.use("/api/mentor", mentorRouter);
app.use("/api/event", eventRouter);
app.use("/api/forum", forumRouter);
app.use("/api/story", storyRouter);
app.use("/api/stats", statsRouter);

module.exports = app;