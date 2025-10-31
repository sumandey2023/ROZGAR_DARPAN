const mongoose = require("mongoose");

const aiExplanationSchema = new mongoose.Schema(
  {
    language: { type: String, required: true, trim: true, lowercase: true },
    fin_year: { type: String, required: true, trim: true },
    month: { type: String, required: true, trim: true },
    state_code: { type: String, required: true, trim: true },
    state_name: { type: String, required: true, trim: true },
    district_code: { type: String, required: true, trim: true },
    district_name: { type: String, required: true, trim: true },
    response: { type: String, required: true },
  },
  { timestamps: true }
);

// Unique per district/month/year/language
aiExplanationSchema.index(
  {
    district_code: 1,
    fin_year: 1,
    month: 1,
    language: 1,
  },
  { unique: true }
);

const AIExplanation = mongoose.model("AIExplanation", aiExplanationSchema);

module.exports = AIExplanation;
