const sessionsController = require("controllers/api/sessions");
const express = require("express");
const router = express.Router();

router.post("/signin", sessionsController.entityLogin);

module.exports = router;
