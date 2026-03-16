const express = require("express");
const router = express.Router();
const auth = require("../middlewares/auth");
const statsCtrl = require("../controllers/Stats");

router.get("/global", auth, statsCtrl.getGlobalStats);

module.exports = router;
