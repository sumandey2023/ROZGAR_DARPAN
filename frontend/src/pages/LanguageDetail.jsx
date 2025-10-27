import { useLocation, useNavigate } from "react-router-dom";
import { supportedLanguages, translate } from "../data/translations";

const LanguageDetail = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { monthData, selectedLang } = location.state || {};

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
  const getNumeric = (val) => (typeof val === "string" ? parseFloat(val) : val);

  const formatCurrency = (num) => {
    const value = getNumeric(num);
    if (value === 0) return "₹0.00Cr";
    return `₹${(value / 100).toFixed(2)}Cr`;
  };

  const formatNumber = (num) => {
    const value = getNumeric(num);
    if (value >= 10000000) return (value / 10000000).toFixed(2) + "Cr";
    if (value >= 100000) return (value / 100000).toFixed(2) + "L";
    if (value >= 1000) return (value / 1000).toFixed(2) + "K";
    return value.toLocaleString("en-IN");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 py-8">
      <div className="max-w-5xl mx-auto px-4">
        {/* Header */}
        <div className="mb-8">
          <button
            onClick={() => navigate("/")}
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
            Back
          </button>

          <div className="bg-white rounded-xl shadow-lg p-6 border border-blue-100">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h1 className="text-3xl font-bold text-gray-800">
                  {monthData.month} {monthData.fin_year}
                </h1>
                <p className="text-lg text-gray-600 mt-1">
                  {monthData.district_name}
                </p>
              </div>
              <div className="bg-blue-100 px-4 py-2 rounded-lg">
                <p className="text-sm font-semibold text-blue-800">Language</p>
                <p className="text-lg font-bold text-blue-900">
                  {selectedLanguage?.nativeName}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-4 text-sm">
              <div className="px-3 py-1 bg-green-100 text-green-800 rounded-full font-medium">
                ✓ {monthData.fin_year}
              </div>
              <div className="px-3 py-1 bg-purple-100 text-purple-800 rounded-full font-medium">
                📍 {monthData.state_name}
              </div>
            </div>
          </div>
        </div>

        {/* AI Description Section - Ready for Backend Integration */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-6 border border-blue-100">
          <div className="flex items-center gap-2 mb-4">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-lg flex items-center justify-center">
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
                  d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
                />
              </svg>
            </div>
            <div>
              <h2 className="text-xl font-bold text-gray-800">
                AI Generated Summary
              </h2>
              <p className="text-sm text-gray-600">
                Detailed description in {selectedLanguage?.name}
              </p>
            </div>
          </div>

          {/* Placeholder for AI Description - Will be replaced with backend API call */}
          <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-6 rounded-lg border border-blue-100">
            <div className="prose prose-lg max-w-none">
              <p className="text-gray-700 leading-relaxed text-base">
                {/* This will be replaced with AI-generated content from backend */}
                <span className="font-semibold text-blue-900">
                  {selectedLanguage?.nativeName === "हिन्दी" &&
                    `इस महीने ${monthData.month} में ${
                      monthData.district_name
                    } जिले में महत्वपूर्ण उपलब्धियां देखी गईं। कुल व्यय ₹${formatCurrency(
                      monthData.Total_Exp
                    )} रहा, जो सरकार की ग्रामीण विकास के प्रति प्रतिबद्धता दर्शाता है। इस अवधि में ${formatNumber(
                      monthData.Number_of_Completed_Works
                    )} कार्य सफलतापूर्वक पूरे किए गए, जबकि ${formatNumber(
                      monthData.Number_of_Ongoing_Works
                    )} कार्य निरंतर जारी हैं, जो क्षेत्र में निरंतर विकास सुनिश्चित कर रहे हैं। औसत मजदूरी दर ₹${getNumeric(
                      monthData.Average_Wage_rate_per_day_per_person
                    ).toFixed(
                      0
                    )} प्रतिदिन थी, जो श्रमिकों को उचित मजदूरी प्रदान करने को प्रदर्शित करती है।`}
                  {selectedLanguage?.nativeName === "বাংলা" &&
                    `${monthData.month} মাসে ${
                      monthData.district_name
                    } জেলায় উল্লেখযোগ্য অগ্রগতি হয়েছে। মোট ব্যয় হয়েছে ₹${formatCurrency(
                      monthData.Total_Exp
                    )}, যা সরকারের গ্রামীণ উন্নয়নের প্রতি প্রতিশ্রুতিকে প্রতিফলিত করে। এই সময়কালে ${formatNumber(
                      monthData.Number_of_Completed_Works
                    )}টি কাজ সফলভাবে সম্পন্ন হয়েছে, যেখানে ${formatNumber(
                      monthData.Number_of_Ongoing_Works
                    )}টি কাজ অব্যাহত রয়েছে, যা এলাকায় টেকসই উন্নয়ন নিশ্চিত করছে। গড় মজুরির হার ছিল ₹${getNumeric(
                      monthData.Average_Wage_rate_per_day_per_person
                    ).toFixed(
                      0
                    )} প্রতি দিন, যা শ্রমিকদের ন্যায্য মজুরি প্রদানের বিষয়ে বর্ণনা করে।`}
                  {selectedLanguage?.nativeName === "English" &&
                    `In ${monthData.month}, ${
                      monthData.district_name
                    } district achieved significant milestones. The total expenditure was ${formatCurrency(
                      monthData.Total_Exp
                    )}, reflecting the government's commitment to rural development. During this period, ${formatNumber(
                      monthData.Number_of_Completed_Works
                    )} works were successfully completed, while ${formatNumber(
                      monthData.Number_of_Ongoing_Works
                    )} works are currently ongoing, ensuring continuous progress in the region. The average wage rate was ₹${getNumeric(
                      monthData.Average_Wage_rate_per_day_per_person
                    ).toFixed(
                      0
                    )} per day, demonstrating fair compensation for workers.`}
                  {!["हिन्दी", "বাংলা", "English"].includes(
                    selectedLanguage?.nativeName
                  ) &&
                    `In ${monthData.month}, ${
                      monthData.district_name
                    } district had significant achievements. Total expenditure: ${formatCurrency(
                      monthData.Total_Exp
                    )}. ${formatNumber(
                      monthData.Number_of_Completed_Works
                    )} works completed, ${formatNumber(
                      monthData.Number_of_Ongoing_Works
                    )} ongoing. Average wage rate: ₹${getNumeric(
                      monthData.Average_Wage_rate_per_day_per_person
                    ).toFixed(0)} per day.`}
                </span>
              </p>
            </div>
          </div>

          {/* AI Integration Placeholder - Structure ready for backend */}
          <div className="mt-4 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
            <p className="text-xs text-yellow-800">
              <strong>Note:</strong> This is demo content. Connect to AI backend
              API endpoint for elaborate, contextual descriptions.
            </p>
          </div>
        </div>

        {/* Key Statistics Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          <div className="bg-gradient-to-br from-green-400 to-green-600 rounded-lg p-4 text-white shadow-lg">
            <p className="text-xs opacity-90 mb-1">Total Expenditure</p>
            <p className="text-2xl font-bold">
              {formatCurrency(monthData.Total_Exp)}
            </p>
          </div>
          <div className="bg-gradient-to-br from-blue-400 to-blue-600 rounded-lg p-4 text-white shadow-lg">
            <p className="text-xs opacity-90 mb-1">Completed Works</p>
            <p className="text-2xl font-bold">
              {formatNumber(monthData.Number_of_Completed_Works)}
            </p>
          </div>
          <div className="bg-gradient-to-br from-orange-400 to-orange-600 rounded-lg p-4 text-white shadow-lg">
            <p className="text-xs opacity-90 mb-1">Ongoing Works</p>
            <p className="text-2xl font-bold">
              {formatNumber(monthData.Number_of_Ongoing_Works)}
            </p>
          </div>
          <div className="bg-gradient-to-br from-purple-400 to-purple-600 rounded-lg p-4 text-white shadow-lg">
            <p className="text-xs opacity-90 mb-1">Avg. Wage Rate</p>
            <p className="text-2xl font-bold">
              ₹
              {getNumeric(
                monthData.Average_Wage_rate_per_day_per_person
              ).toFixed(0)}
            </p>
          </div>
        </div>

        {/* Detailed Metrics */}
        <div className="bg-white rounded-xl shadow-lg p-6 border border-blue-100">
          <h3 className="text-xl font-bold text-gray-800 mb-4">
            Comprehensive Details
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <DetailCard
              label="Active Job Cards"
              value={formatNumber(monthData.Total_No_of_Active_Job_Cards)}
              icon="📋"
              color="blue"
            />
            <DetailCard
              label="Total Workers"
              value={formatNumber(monthData.Total_No_of_Active_Workers)}
              icon="👥"
              color="green"
            />
            <DetailCard
              label="Households Worked"
              value={formatNumber(monthData.Total_Households_Worked)}
              icon="🏠"
              color="orange"
            />
            <DetailCard
              label="Works Taken Up"
              value={formatNumber(monthData.Total_No_of_Works_Takenup)}
              icon="🔨"
              color="purple"
            />
            <DetailCard
              label="SC Workers"
              value={formatNumber(monthData.SC_workers_against_active_workers)}
              icon="⭐"
              color="indigo"
            />
            <DetailCard
              label="ST Workers"
              value={formatNumber(monthData.ST_workers_against_active_workers)}
              icon="🌲"
              color="teal"
            />
            <DetailCard
              label="Women Workers"
              value={formatNumber(monthData.Total_Individuals_Worked)}
              icon="👩"
              color="pink"
            />
            <DetailCard
              label="Payment within 15 Days"
              value={`${getNumeric(
                monthData.percentage_payments_gererated_within_15_days
              )}%`}
              icon="💰"
              color="green"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

const DetailCard = ({ label, value, icon, color }) => {
  const colorClasses = {
    blue: "bg-blue-50 border-blue-200",
    green: "bg-green-50 border-green-200",
    orange: "bg-orange-50 border-orange-200",
    purple: "bg-purple-50 border-purple-200",
    indigo: "bg-indigo-50 border-indigo-200",
    teal: "bg-teal-50 border-teal-200",
    pink: "bg-pink-50 border-pink-200",
  };

  return (
    <div className={`${colorClasses[color]} p-4 rounded-lg border`}>
      <div className="flex items-center justify-between mb-2">
        <span className="text-2xl">{icon}</span>
        <span className="text-2xl font-bold text-gray-800">{value}</span>
      </div>
      <p className="text-sm text-gray-600">{label}</p>
    </div>
  );
};

export default LanguageDetail;
