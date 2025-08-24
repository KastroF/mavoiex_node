const express = require("express"); 

const router = express.Router(); 

const userCtrl = require("../controllers/User");
const auth = require("../middlewares/auth");

router.post("/adduser", userCtrl.signUp); 
router.post("/signin", userCtrl.signIn);
router.post("/addfcmtoken", auth, userCtrl.addFcmToken);
router.post("/removefcmtoken", auth, userCtrl.removeFcmToken);

module.exports = router; 
