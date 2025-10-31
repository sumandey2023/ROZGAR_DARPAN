import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { supportedLanguages, translate } from "../data/translations";
import { getAIExplanation } from "../services/ai.service";

const AIExplanation = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { monthData, selectedLang } = location.state || {};

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [explanation, setExplanation] = useState("");

  useEffect(() => {
    if (!monthData || !selectedLang) return;

    const run = async () => {
      setLoading(true);
      setError(null);
      try {
        const resp = await getAIExplanation(monthData, selectedLang);
        setExplanation(resp?.response || "");
      } catch (err) {
        setError(
          err?.response?.data?.message || "Failed to get AI explanation"
        );
      } finally {
        setLoading(false);
      }
    };

    run();
  }, [monthData, selectedLang]);

  if (!monthData || !selectedLang) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">
            No Data Available
          </h2>
          <button
            onClick={() => navigate("/")}
            className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700"
          >
            Go Back Home
          </button>
        </div>
      </div>
    );
  }

  const selectedLanguage = supportedLanguages.find(
    (l) => l.code === selectedLang
  );

  return (
    <div className="min-h-screen bg-linear-to-br from-indigo-50 via-white to-purple-50 py-8">
      <div className="max-w-4xl mx-auto px-4">
        <button
          onClick={() => navigate(-1)}
          className="mb-4 flex items-center text-blue-600 hover:text-blue-800 font-medium transition-colors"
        >
          <svg
            className="w-5 h-5 mr-2"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M10 19l-7-7m0 0l7-7m-7 7h18"
            />
          </svg>
          {translate("back", selectedLang) || "Back"}
        </button>

        <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6">
          <div className="flex items-start justify-between mb-4">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">
                {monthData.month} {monthData.fin_year}
              </h1>
              <p className="text-gray-600">{monthData.district_name}</p>
            </div>
            <div className="px-3 py-2 bg-blue-50 text-blue-800 rounded-lg text-sm font-semibold">
              {selectedLanguage?.nativeName}
            </div>
          </div>

          <div className="flex items-center gap-2 mb-4">
            <div className="w-10 h-10 bg-linear-to-br from-purple-600 to-purple-700 rounded-lg flex items-center justify-center">
              <svg
                className="w-6 h-6 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M13 10V3L4 14h7v7l9-11h-7z"
                />
              </svg>
            </div>
            <div>
              <h2 className="text-lg font-bold text-gray-800">
                {translate("aiSummary", selectedLang) || "AI Generated Summary"}
              </h2>
              <p className="text-xs text-gray-600">
                {translate("detailedInLanguage", selectedLang) ||
                  "Detailed description in"}{" "}
                {selectedLanguage?.name}
              </p>
            </div>
          </div>

          {loading && (
            <div className="flex items-center gap-2 text-gray-700">
              <svg
                className="animate-spin h-5 w-5"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                ></path>
              </svg>
              <span>
                {translate("generating", selectedLang) || "Generating..."}
              </span>
            </div>
          )}

          {error && !loading && (
            <div className="p-3 bg-red-50 border border-red-200 rounded text-red-700 text-sm">
              {error}
            </div>
          )}

          {!loading && !error && (
            <div className="mt-2 whitespace-pre-wrap text-gray-800 leading-relaxed">
              {explanation}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AIExplanation;
