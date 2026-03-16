const express = require("express");
const router = express.Router();
const auth = require("../middlewares/auth");
const resourceCtrl = require("../controllers/Resource");

router.post("/list", auth, resourceCtrl.getResources);
router.get("/:id", auth, resourceCtrl.getResource);
router.post("/create", auth, resourceCtrl.createResource);

module.exports = router;
