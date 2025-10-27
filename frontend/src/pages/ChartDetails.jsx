import { useLocation, useNavigate } from "react-router-dom";
import MonthlyCharts from "../components/MonthlyCharts";

const ChartDetails = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { monthData, allMonthsData } = location.state || {};

  if (!monthData && !allMonthsData) {
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

  return (
    <div className="min-h-screen bg-gray-100 py-8">
      <div className="max-w-7xl mx-auto px-4">
        {/* Header */}
        <div className="mb-8">
          <button
            onClick={() => navigate("/")}
            className="mb-4 flex items-center text-blue-600 hover:text-blue-800 font-medium"
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
            Back to Home
          </button>

          <div className="bg-white rounded-lg shadow p-6">
            <h1 className="text-3xl font-bold text-gray-800 mb-2">
              {monthData
                ? `${monthData.month} ${monthData.fin_year}`
                : "All Months"}{" "}
              -
              {monthData
                ? monthData.district_name
                : allMonthsData[0]?.district_name}
            </h1>
            <p className="text-gray-600">
              {monthData ? "Detailed Analytics" : "Year Overview Analytics"}
            </p>
          </div>
        </div>

        {/* Charts Component */}
        <MonthlyCharts monthData={monthData} allMonthsData={allMonthsData} />
      </div>
    </div>
  );
};

export default ChartDetails;
