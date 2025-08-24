const express = require("express"); 

const router = express.Router(); 

const deviceTokenCtrl = require("../controllers/DeviceToken"); 

const auth = require("../middlewares/auth"); 

router.post("/addToken", auth,  deviceTokenCtrl.registerDeviceToken);


module.exports = router; 