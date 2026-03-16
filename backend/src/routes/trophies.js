const express = require("express");
const router = express.Router();
const controller = require("../controllers/trophiesController");
const auth = require("../middleware/auth");

router.get("/", auth, controller.getTrophyDefinitions);
router.get("/my", auth, controller.getMyTrophies);
router.get("/progress", auth, controller.getTrophyProgress);

module.exports = router;
