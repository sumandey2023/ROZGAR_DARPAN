const { generateAIResponse } = require("../services/aiService");
const AIExplanation = require("../models/model.aiExplanation");

async function generateAIResponseController(req, res) {
  const { content } = req.body;
  try {
    const language = (content?.language || "english").toLowerCase();
    const data = content?.data || {};

    const key = {
      district_code: String(data.district_code || "").trim(),
      fin_year: String(data.fin_year || "").trim(),
      month: String(data.month || "").trim(),
      language,
    };

    if (!key.district_code || !key.fin_year || !key.month) {
      return res.status(400).json({
        success: false,
        message: "Missing required identifiers: district_code, fin_year, month",
      });
    }

    const existing = await AIExplanation.findOne(key).lean();
    if (existing) {
      return res.status(200).json({
        success: true,
        message: "AI response served from cache",
        response: existing.response,
        cached: true,
      });
    }

    const response = await generateAIResponse(content);

    try {
      await AIExplanation.create({
        ...key,
        state_code: String(data.state_code || "").trim(),
        state_name: String(data.state_name || "").trim(),
        district_name: String(data.district_name || "").trim(),
        response,
      });

      return res.status(200).json({
        success: true,
        message: "AI response generated and cached successfully",
        response,
        cached: false,
      });
    } catch (e) {
      if (e && e.code === 11000) {
        const cached = await AIExplanation.findOne(key).lean();
        if (cached) {
          return res.status(200).json({
            success: true,
            message: "AI response served from cache",
            response: cached.response,
            cached: true,
          });
        }
      }
      throw e;
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message,
    });
  }
}

module.exports = {
  generateAIResponseController,
};
