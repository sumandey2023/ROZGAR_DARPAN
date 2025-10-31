import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import {
  supportedLanguages,
  translate,
  getLocalizedDescription,
} from "../data/translations";
// AI explanation handled in dedicated page

const MonthlyDataCard = ({ monthData }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [selectedLang, setSelectedLang] = useState("en");
  const [showLangSelector, setShowLangSelector] = useState(false);
  // AI explanation moved to dedicated page
  const navigate = useNavigate();
  const langSelectorRef = useRef(null);

  // Initialize selected language from localStorage
  useEffect(() => {
    try {
      const savedLang = localStorage.getItem("selectedLang");
      if (
        savedLang &&
        supportedLanguages.some((lang) => lang.code === savedLang)
      ) {
        setSelectedLang(savedLang);
      }
    } catch (e) {
      // ignore storage errors
    }
  }, []);

  const handleViewChart = () => {
    navigate("/charts", { state: { monthData } });
  };

  const handleViewLanguageDetail = () => {
    navigate("/language-detail", { state: { monthData, selectedLang } });
  };

  const handleGetAIExplanation = () => {
    navigate("/ai-explanation", { state: { monthData, selectedLang } });
  };

  // Close language selector when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        langSelectorRef.current &&
        !langSelectorRef.current.contains(event.target)
      ) {
        setShowLangSelector(false);
      }
    };

    if (showLangSelector) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showLangSelector]);

  const formatNumber = (num) => {
    const number = typeof num === "string" ? parseFloat(num) : num;
    const value = isNaN(number) ? 0 : number;

    if (value >= 10000000) {
      return (value / 10000000).toFixed(2) + "Cr";
    } else if (value >= 100000) {
      return (value / 100000).toFixed(2) + "L";
    } else if (value >= 1000) {
      return (value / 1000).toFixed(2) + "K";
    }
    return value.toLocaleString("en-IN");
  };

  const formatCurrency = (num) => {
    const number = typeof num === "string" ? parseFloat(num) : num;
    const value = isNaN(number) ? 0 : number;

    // If value is 0, return 0
    if (value === 0) {
      return `₹0.00Cr`;
    }

    // Convert from lakhs to crores (1 crore = 100 lakhs)
    return `₹${(value / 100).toFixed(2)}Cr`;
  };

  const getNumericValue = (val) => {
    return typeof val === "string" ? parseFloat(val) : val;
  };

  const getMonthName = (shortName) => {
    const monthMap = {
      Jan: "January",
      Feb: "February",
      March: "March",
      April: "April",
      May: "May",
      June: "June",
      July: "July",
      Aug: "August",
      Sep: "September",
      Oct: "October",
      Nov: "November",
      Dec: "December",
    };
    return monthMap[shortName] || shortName;
  };

  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden border border-gray-200 hover:shadow-xl transition-shadow duration-300">
      {/* Card Header */}
      <div className="bg-linear-to-r from-blue-600 to-blue-500 text-white px-6 py-4 relative">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-xl font-bold">
              {getMonthName(monthData.month)}
            </h3>
            <p className="text-sm text-blue-100">{monthData.district_name}</p>
          </div>
          <div className="flex items-center gap-2">
            <span className="bg-white/20 px-3 py-1 rounded-full text-sm font-semibold">
              {monthData.fin_year}
            </span>
            {/* Language Selector Button */}
            <button
              onClick={() => setShowLangSelector(!showLangSelector)}
              className="bg-white/20 hover:bg-white/30 px-3 py-1 rounded-lg text-sm font-medium flex items-center gap-1 transition-colors"
            >
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129"
                />
              </svg>
              {supportedLanguages.find((l) => l.code === selectedLang)
                ?.nativeName || "EN"}
            </button>
          </div>
        </div>

        {/* Language Dropdown */}
        {showLangSelector && (
          <div
            ref={langSelectorRef}
            className="absolute top-full right-0 mt-2 bg-white rounded-lg shadow-xl border border-gray-200 max-h-96 overflow-y-auto z-50 w-56"
          >
            <div className="p-2">
              <div className="text-xs text-gray-500 px-2 py-1 mb-1 font-semibold">
                Select Language / भाषा चुनें
              </div>
              {supportedLanguages.map((lang) => (
                <button
                  key={lang.code}
                  onClick={() => {
                    setSelectedLang(lang.code);
                    try {
                      localStorage.setItem("selectedLang", lang.code);
                    } catch (e) {}
                    setShowLangSelector(false);
                  }}
                  className={`w-full text-left px-3 py-2 rounded hover:bg-blue-50 transition-colors ${
                    selectedLang === lang.code
                      ? "bg-blue-100 font-semibold"
                      : ""
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-700">
                      {lang.nativeName}
                    </span>
                    <span className="text-xs text-gray-500">{lang.name}</span>
                  </div>
                </button>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Key Metrics */}
      <div className="px-6 py-4">
        <div className="grid grid-cols-2 gap-4 mb-4">
          <div className="bg-green-50 p-4 rounded-lg">
            <p className="text-xs text-gray-600 mb-1">Total Expenditure</p>
            <p className="text-xl font-bold text-green-700">
              {formatCurrency(monthData.Total_Exp)}
            </p>
          </div>
          <div className="bg-blue-50 p-4 rounded-lg">
            <p className="text-xs text-gray-600 mb-1">Completed Works</p>
            <p className="text-xl font-bold text-blue-700">
              {formatNumber(monthData.Number_of_Completed_Works)}
            </p>
          </div>
          <div className="bg-orange-50 p-4 rounded-lg">
            <p className="text-xs text-gray-600 mb-1">Ongoing Works</p>
            <p className="text-xl font-bold text-orange-700">
              {formatNumber(monthData.Number_of_Ongoing_Works)}
            </p>
          </div>
          <div className="bg-purple-50 p-4 rounded-lg">
            <p className="text-xs text-gray-600 mb-1">Avg. Wage Rate</p>
            <p className="text-xl font-bold text-purple-700">
              ₹
              {getNumericValue(
                monthData.Average_Wage_rate_per_day_per_person
              ).toFixed(0)}
            </p>
          </div>
        </div>

        {/* Additional Quick Stats */}
        <div className="grid grid-cols-3 gap-2 mb-4 text-xs">
          <div className="text-center bg-gray-50 py-2 rounded">
            <p className="text-gray-600">Job Cards</p>
            <p className="font-semibold text-gray-800">
              {formatNumber(monthData.Total_No_of_JobCards_issued)}
            </p>
          </div>
          <div className="text-center bg-gray-50 py-2 rounded">
            <p className="text-gray-600">Active Workers</p>
            <p className="font-semibold text-gray-800">
              {formatNumber(monthData.Total_No_of_Active_Workers)}
            </p>
          </div>
          <div className="text-center bg-gray-50 py-2 rounded">
            <p className="text-gray-600">Households</p>
            <p className="font-semibold text-gray-800">
              {formatNumber(monthData.Total_Households_Worked)}
            </p>
          </div>
        </div>

        {/* Localized Description */}
        <div className="mt-4 p-4 bg-linear-to-r from-blue-50 to-indigo-50 rounded-lg border border-blue-100">
          {/* <p className="text-sm text-gray-700 leading-relaxed mb-3">
            {getLocalizedDescription(monthData, selectedLang)}
          </p> */}

          {/* AI Explanation now navigates to a dedicated page */}

          {/* AI Explanation Button */}
          <button
            onClick={handleGetAIExplanation}
            className="w-full bg-linear-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 text-white font-medium py-2 px-4 rounded-lg transition-all duration-200 flex items-center justify-center gap-2 mb-2"
          >
            <svg
              className="w-4 h-4"
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
            <span>{translate("explainInYourLanguage", selectedLang)}</span>
          </button>

          {/* View Full Description Button */}
          <button
            onClick={handleViewLanguageDetail}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg transition-colors duration-200 flex items-center justify-center gap-2"
          >
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
              />
            </svg>
            {selectedLang === "hi"
              ? "पूरा विवरण देखें"
              : selectedLang === "bn"
              ? "সম্পূর্ণ বিবরণ দেখুন"
              : "View Full Description"}
          </button>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-2 mt-4">
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium py-2 px-4 rounded-lg transition-colors duration-200 flex items-center justify-center gap-2"
          >
            <span>
              {isExpanded
                ? selectedLang === "hi"
                  ? "छुपाएं"
                  : selectedLang === "bn"
                  ? "লুকান"
                  : "Hide"
                : translate("viewDetails", selectedLang)}
            </span>
            <svg
              className={`w-4 h-4 transform transition-transform ${
                isExpanded ? "rotate-180" : ""
              }`}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 9l-7 7-7-7"
              />
            </svg>
          </button>
          <button
            onClick={handleViewChart}
            className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg transition-colors duration-200 flex items-center justify-center gap-2"
          >
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
              />
            </svg>
            <span>{translate("viewChart", selectedLang)}</span>
          </button>
        </div>
      </div>

      {/* Expanded Details */}
      {isExpanded && (
        <div className="px-6 py-4 bg-gray-50 border-t border-gray-200">
          <h4 className="font-semibold text-gray-800 mb-3">Complete Details</h4>
          <div className="grid grid-cols-2 gap-3 text-sm">
            <DetailRow label="State" value={monthData.state_name} />
            <DetailRow label="District Code" value={monthData.district_code} />
            <DetailRow
              label="Approved Labour Budget"
              value={formatCurrency(monthData.Approved_Labour_Budget)}
            />
            <DetailRow
              label="Adm. Expenditure"
              value={formatCurrency(monthData.Total_Adm_Expenditure)}
            />
            <DetailRow
              label="Material & Skilled Wages"
              value={formatCurrency(monthData.Material_and_skilled_Wages)}
            />
            <DetailRow label="Wages" value={formatCurrency(monthData.Wages)} />
            <DetailRow
              label="Avg Days/Household"
              value={
                monthData.Average_days_of_employment_provided_per_Household
              }
            />
            <DetailRow
              label="Total Individuals"
              value={formatNumber(monthData.Total_Individuals_Worked)}
            />
            <DetailRow
              label="SC Persondays"
              value={formatNumber(monthData.SC_persondays)}
            />
            <DetailRow
              label="ST Persondays"
              value={formatNumber(monthData.ST_persondays)}
            />
            <DetailRow
              label="Women Persondays"
              value={formatNumber(monthData.Women_Persondays)}
            />
            <DetailRow
              label="Disabled Persons"
              value={formatNumber(monthData.Differently_abled_persons_worked)}
            />
            <DetailRow
              label="100 Days Completed HHs"
              value={formatNumber(
                monthData.Total_No_of_HHs_completed_100_Days_of_Wage_Employment
              )}
            />
            <DetailRow
              label="Works Taken Up"
              value={formatNumber(monthData.Total_No_of_Works_Takenup)}
            />
            <DetailRow
              label="GPs with NIL Expense"
              value={formatNumber(monthData.Number_of_GPs_with_NIL_exp)}
            />
            <DetailRow
              label="Category B Works %"
              value={`${monthData.percent_of_Category_B_Works}%`}
            />
            <DetailRow
              label="Agriculture Expenditure %"
              value={`${monthData.percent_of_Expenditure_on_Agriculture_Allied_Works}%`}
            />
            <DetailRow
              label="NRM Expenditure %"
              value={`${monthData.percent_of_NRM_Expenditure}%`}
            />
            <DetailRow
              label="Payment within 15 Days %"
              value={`${monthData.percentage_payments_gererated_within_15_days}%`}
            />
            <DetailRow label="Remarks" value={monthData.Remarks} />
          </div>
        </div>
      )}
    </div>
  );
};

const DetailRow = ({ label, value }) => (
  <div>
    <span className="text-gray-600">{label}:</span>
    <span className="ml-2 font-semibold text-gray-800">{value}</span>
  </div>
);

export default MonthlyDataCard;
