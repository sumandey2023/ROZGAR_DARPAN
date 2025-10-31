import axios from "axios";
import API_BASE_URL from "../config/api.config";

// Map language codes to backend format
const languageMap = {
  hi: "hindi",
  en: "english",
  bn: "bengali",
  te: "telugu",
  mr: "marathi",
  ta: "tamil",
  ur: "urdu",
  gu: "gujarati",
  kn: "kannada",
  or: "odia",
  ml: "malayalam",
  pa: "punjabi",
  as: "assamese",
  ne: "nepali",
  sa: "sanskrit",
  sd: "sindhi",
  ks: "kashmiri",
  kok: "konkani",
  mni: "manipuri",
  mai: "maithili",
  brx: "bodo",
  doi: "dogri",
};

/**
 * Get AI-powered explanation of monthly data in selected language
 * @param {Object} monthData - The monthly data object
 * @param {String} languageCode - Language code (e.g., 'hi', 'en', 'bn', 'or')
 * @returns {Promise<Object>} AI response with explanation
 */
export const getAIExplanation = async (monthData, languageCode = "en") => {
  try {
    // Map frontend language code to backend format
    const backendLanguage = languageMap[languageCode] || "english";

    // Prepare the content object as expected by backend
    const content = {
      language: backendLanguage,
      data: monthData,
    };

    const response = await axios.post(
      `${API_BASE_URL}/ai/ai-response`,
      { content },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    return response.data;
  } catch (error) {
    console.error("Error fetching AI explanation:", error);
    throw error;
  }
};
