const { generateAIResponse } = require("../services/aiService");

async function generateAIResponseController(req, res) {
  const { content } = req.body;
  try {
    const response = await generateAIResponse(content);
    console.log(response);
    return res.status(200).json({
      success: true,
      message: "AI response generated successfully",
      response: response,
    });
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
