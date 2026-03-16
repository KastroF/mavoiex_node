const express = require("express");
const router = express.Router();
const auth = require("../middlewares/auth");
const incidentCtrl = require("../controllers/Incident");

router.post("/create", auth, incidentCtrl.createIncident);
router.get("/my", auth, incidentCtrl.getMyIncidents);
router.get("/stats", auth, incidentCtrl.getIncidentStats);
router.get("/:id", auth, incidentCtrl.getIncident);
router.put("/:id", auth, incidentCtrl.updateIncident);
router.delete("/:id", auth, incidentCtrl.deleteIncident);

module.exports = router;
