import { useState, useEffect } from "react";
import StateDistrictSelector from "../components/StateDistrictSelector";
import DataDisplay from "../components/DataDisplay";
import { fetchDistrictData } from "../services/district.service";

const Home = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [searchParams, setSearchParams] = useState(null);
  const [dataSource, setDataSource] = useState(null);
  const [dataRestored, setDataRestored] = useState(false);

  // Restore data from localStorage on mount
  useEffect(() => {
    const savedData = localStorage.getItem("districtData");
    const savedParams = localStorage.getItem("districtSearchParams");
    const savedSource = localStorage.getItem("districtDataSource");

    if (savedData && savedParams) {
      try {
        const parsedData = JSON.parse(savedData);
        const parsedParams = JSON.parse(savedParams);

        setData(parsedData);
        setSearchParams(parsedParams);
        setDataSource(savedSource || "database");
        setDataRestored(true);

        // Remove the "restored" indicator after 5 seconds
        setTimeout(() => setDataRestored(false), 5000);
      } catch (err) {
        console.error("Error restoring saved data:", err);
      }
    }
  }, []);

  const handleFetchData = async (params) => {
    setLoading(true);
    setError(null);
    setSearchParams(params);

    try {
      const result = await fetchDistrictData(params);

      if (result.success) {
        setData(result.data || []);
        setDataSource(result.source || "database");

        // Save to localStorage for persistence
        localStorage.setItem("districtData", JSON.stringify(result.data || []));
        localStorage.setItem("districtSearchParams", JSON.stringify(params));
        localStorage.setItem("districtDataSource", result.source || "database");
      } else {
        setError(result.message || "Failed to fetch data");
      }
    } catch (err) {
      console.error("Error fetching data:", err);
      setError(
        err.response?.data?.message ||
          "Failed to connect to the server. Please ensure the backend is running."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      {/* Hero Section */}
      {!searchParams && (
        <div className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 text-white">
          <div className="container mx-auto px-4 py-16">
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-20 h-20 bg-white/20 backdrop-blur-sm rounded-full mb-6">
                <svg
                  className="w-10 h-10 text-white"
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
              </div>
              <h1 className="text-5xl font-bold mb-4">रोजगार दर्पण</h1>
              <p className="text-2xl font-medium mb-2 opacity-90">
                Rozgar Darpan
              </p>
              <p className="text-lg opacity-80">
                MGNREGA District-wise Data Analytics Portal
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Data Restored Notification */}
      {dataRestored && searchParams && (
        <div className="container mx-auto px-4 pt-6">
          <div className="max-w-4xl mx-auto">
            <div className="bg-green-50 border-l-4 border-green-500 text-green-800 px-6 py-4 rounded-r-lg shadow-lg">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <svg
                    className="w-6 h-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                  <span className="font-semibold">
                    Your previous data has been restored!
                  </span>
                </div>
                <button
                  onClick={() => setDataRestored(false)}
                  className="text-green-700 hover:text-green-900"
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
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="container mx-auto px-4 py-8">
        {/* Statistics Banner - Empty State */}
        {!searchParams && (
          <div className="max-w-6xl mx-auto mb-12">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-white rounded-xl shadow-lg p-6 border border-blue-100 hover:shadow-xl transition-shadow">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                    <svg
                      className="w-6 h-6 text-blue-600"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z"
                      />
                    </svg>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600 font-medium">
                      22 Languages
                    </p>
                    <p className="text-2xl font-bold text-gray-800">
                      Supported
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-xl shadow-lg p-6 border border-green-100 hover:shadow-xl transition-shadow">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                    <svg
                      className="w-6 h-6 text-green-600"
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
                  </div>
                  <div>
                    <p className="text-sm text-gray-600 font-medium">
                      Analytics
                    </p>
                    <p className="text-2xl font-bold text-gray-800">
                      Charts & Insights
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-xl shadow-lg p-6 border border-purple-100 hover:shadow-xl transition-shadow">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                    <svg
                      className="w-6 h-6 text-purple-600"
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
                    <p className="text-sm text-gray-600 font-medium">
                      AI Powered
                    </p>
                    <p className="text-2xl font-bold text-gray-800">
                      Descriptions
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Main Content */}
        {!searchParams ? (
          <div className="max-w-4xl mx-auto">
            <StateDistrictSelector onSelect={handleFetchData} />
          </div>
        ) : (
          <>
            {/* Header with Clear Button */}
            <div className="max-w-4xl mx-auto mb-6">
              <div className="bg-white rounded-lg shadow-md p-4 border border-gray-200">
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="text-xl font-bold text-gray-800">
                      📊 Viewing: {searchParams.district_name}
                    </h2>
                    <p className="text-sm text-gray-600">
                      {searchParams.state_name} - {searchParams.fin_year}
                    </p>
                  </div>
                  <button
                    onClick={() => {
                      setData([]);
                      setSearchParams(null);
                      setError(null);
                      setDataRestored(false);
                      localStorage.removeItem("districtData");
                      localStorage.removeItem("districtSearchParams");
                      localStorage.removeItem("districtDataSource");
                    }}
                    className="bg-red-50 text-red-600 hover:bg-red-100 font-medium px-4 py-2 rounded-lg transition-colors border border-red-200 flex items-center gap-2"
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
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                    New Search
                  </button>
                </div>
              </div>
            </div>

            {/* Data Display */}
            <DataDisplay
              data={data}
              loading={loading}
              error={error}
              source={dataSource}
              searchParams={searchParams}
            />
          </>
        )}
      </div>
    </div>
  );
};

export default Home;
