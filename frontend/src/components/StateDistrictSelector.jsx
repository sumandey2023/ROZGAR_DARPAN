import { useState } from "react";
import statesAndDistricts from "../data/states-districts.json";

const StateDistrictSelector = ({ onSelect }) => {
  const [selectedState, setSelectedState] = useState("");
  const [selectedDistrict, setSelectedDistrict] = useState("");
  const [financialYear, setFinancialYear] = useState("2023-2024");
  const [month, setMonth] = useState("");
  const [availableDistricts, setAvailableDistricts] = useState([]);

  const months = [
    { label: "January", value: "Jan" },
    { label: "February", value: "Feb" },
    { label: "March", value: "March" },
    { label: "April", value: "April" },
    { label: "May", value: "May" },
    { label: "June", value: "June" },
    { label: "July", value: "July" },
    { label: "August", value: "Aug" },
    { label: "September", value: "Sep" },
    { label: "October", value: "Oct" },
    { label: "November", value: "Nov" },
    { label: "December", value: "Dec" },
  ];

  const handleStateChange = (e) => {
    const state = e.target.value;
    setSelectedState(state);
    setSelectedDistrict("");

    const stateData = statesAndDistricts.states.find((s) => s.state === state);
    if (stateData) {
      setAvailableDistricts(stateData.districts);
    } else {
      setAvailableDistricts([]);
    }
  };

  const handleDistrictChange = (e) => {
    setSelectedDistrict(e.target.value);
  };

  const handleFetchData = () => {
    if (!selectedState || !selectedDistrict || !financialYear) {
      alert("Please select State, District, and Financial Year");
      return;
    }

    const searchParams = {
      state_name: selectedState,
      district_name: selectedDistrict,
      fin_year: financialYear,
      month: month || "", // Always send month parameter
    };

    onSelect(searchParams);
  };

  return (
    <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
      <div className="text-center mb-8">
        <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full mb-4">
          <svg
            className="w-8 h-8 text-white"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
        </div>
        <h2 className="text-3xl font-bold text-gray-800 mb-2">Get Started</h2>
        <p className="text-gray-600">
          Select your location to view district data
        </p>
      </div>

      <div className="space-y-5">
        {/* State Selection */}
        <div className="relative">
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            <span className="flex items-center gap-2">
              <span className="text-blue-600">📍</span>
              Select State *
            </span>
          </label>
          <select
            value={selectedState}
            onChange={handleStateChange}
            className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all hover:border-gray-300"
          >
            <option value="">Choose a state</option>
            {statesAndDistricts.states.map((stateData, index) => (
              <option key={index} value={stateData.state}>
                {stateData.state}
              </option>
            ))}
          </select>
        </div>

        {/* District Selection */}
        <div className="relative">
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            <span className="flex items-center gap-2">
              <span className="text-green-600">🏛️</span>
              Select District *
            </span>
          </label>
          <select
            value={selectedDistrict}
            onChange={handleDistrictChange}
            disabled={!selectedState}
            className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all hover:border-gray-300 disabled:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-60"
          >
            <option value="">
              {selectedState ? "Choose a district" : "Select state first"}
            </option>
            {availableDistricts.map((district, index) => (
              <option key={index} value={district}>
                {district}
              </option>
            ))}
          </select>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {/* Financial Year */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              <span className="flex items-center gap-2">
                <span className="text-purple-600">📅</span>
                Financial Year *
              </span>
            </label>
            <select
              value={financialYear}
              onChange={(e) => setFinancialYear(e.target.value)}
              className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all hover:border-gray-300"
            >
              <option value="2023-2024">2023-2024</option>
              <option value="2022-2023">2022-2023</option>
              <option value="2024-2025">2024-2025</option>
              <option value="2021-2022">2021-2022</option>
              <option value="2020-2021">2020-2021</option>
            </select>
          </div>

          {/* Month (Optional) */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              <span className="flex items-center gap-2">
                <span className="text-orange-600">📆</span>
                Month (Optional)
              </span>
            </label>
            <select
              value={month}
              onChange={(e) => setMonth(e.target.value)}
              className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all hover:border-gray-300"
            >
              <option value="">All Months</option>
              {months.map((m, index) => (
                <option key={index} value={m.value}>
                  {m.label}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Submit Button */}
        <button
          onClick={handleFetchData}
          disabled={!selectedState || !selectedDistrict}
          className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-bold py-4 rounded-xl hover:from-blue-700 hover:to-indigo-700 transition-all transform hover:scale-[1.02] disabled:from-gray-400 disabled:to-gray-500 disabled:cursor-not-allowed disabled:transform-none shadow-lg disabled:shadow-none flex items-center justify-center gap-3"
        >
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
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
          Fetch District Data
        </button>
      </div>
    </div>
  );
};

export default StateDistrictSelector;
