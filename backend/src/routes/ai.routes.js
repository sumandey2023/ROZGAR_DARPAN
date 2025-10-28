const express = require("express");
const router = express.Router();
const {
  generateAIResponseController,
} = require("../controllers/ai.controller");

router.post("/ai-response", generateAIResponseController);

module.exports = router;
