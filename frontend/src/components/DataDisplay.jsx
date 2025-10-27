import MonthlyDataCard from "./MonthlyDataCard";
import { useNavigate } from "react-router-dom";

const DataDisplay = ({ data, loading, error, source, searchParams }) => {
  const navigate = useNavigate();

  const handleViewAllCharts = () => {
    navigate("/charts", { state: { allMonthsData: data } });
  };
  if (loading) {
    return (
      <div className="max-w-7xl mx-auto p-6">
        <div className="flex items-center justify-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
          <span className="ml-4 text-gray-600">Loading data...</span>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-7xl mx-auto p-6">
        <div className="bg-red-50 border border-red-200 text-red-800 px-4 py-3 rounded">
          <strong className="font-bold">Error: </strong>
          <span>{error}</span>
        </div>
      </div>
    );
  }

  if (!data || data.length === 0) {
    return (
      <div className="max-w-7xl mx-auto p-6">
        <div className="bg-yellow-50 border border-yellow-200 text-yellow-800 px-4 py-3 rounded">
          No data available
        </div>
      </div>
    );
  }

  // Sort data by month order
  const monthOrder = [
    "April",
    "May",
    "June",
    "July",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
    "Jan",
    "Feb",
    "March",
  ];

  const sortedData = [...data].sort((a, b) => {
    return monthOrder.indexOf(a.month) - monthOrder.indexOf(b.month);
  });

  return (
    <div className="max-w-7xl mx-auto p-6">
      {/* Header Section */}
      <div className="mb-8">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h2 className="text-3xl font-bold text-gray-800 mb-2">
              {searchParams?.district_name || "District"} Data
            </h2>
            <p className="text-gray-600">
              {searchParams?.district_name && searchParams?.fin_year && (
                <span>
                  {searchParams.district_name} - {searchParams.fin_year}
                </span>
              )}
            </p>
          </div>
          <div className="flex items-center gap-3">
            <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-semibold">
              {data.length} {data.length === 1 ? "Month" : "Months"}
            </span>
            {source && (
              <span
                className={`px-3 py-1 rounded-full text-sm font-semibold ${
                  source === "database"
                    ? "bg-green-100 text-green-800"
                    : "bg-purple-100 text-purple-800"
                }`}
              >
                {source === "database" ? "📁 Database" : "🌐 API"}
              </span>
            )}
          </div>
        </div>

        {data.length > 1 && (
          <div className="mt-4 bg-gradient-to-r from-blue-50 to-indigo-50 p-4 rounded-lg border border-blue-100 flex items-center justify-between">
            <p className="text-sm text-gray-700">
              <strong>💡 Tip:</strong> You can expand each month to view
              detailed information and click "View Detailed Charts" to see data
              visualizations.
            </p>
            <button
              onClick={handleViewAllCharts}
              className="bg-blue-600 hover:bg-blue-700 text-white font-medium px-4 py-2 rounded-lg transition-colors duration-200 flex items-center gap-2"
            >
              <svg
                className="w-5 h-5"
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
              View All Charts
            </button>
          </div>
        )}
      </div>

      {/* Monthly Cards Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {sortedData.map((monthData, index) => (
          <MonthlyDataCard key={monthData._id || index} monthData={monthData} />
        ))}
      </div>
    </div>
  );
};

export default DataDisplay;
