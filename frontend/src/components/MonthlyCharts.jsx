import { useState } from "react";

const MonthlyCharts = ({ monthData, allMonthsData }) => {
  const [selectedChart, setSelectedChart] = useState("works");

  const getNumeric = (val) => (typeof val === "string" ? parseFloat(val) : val);

  const formatNumber = (num) => {
    const value = getNumeric(num);
    if (value >= 10000000) return (value / 10000000).toFixed(2) + "Cr";
    if (value >= 100000) return (value / 100000).toFixed(2) + "L";
    if (value >= 1000) return (value / 1000).toFixed(2) + "K";
    return value.toLocaleString("en-IN");
  };

  const formatCurrency = (num) => {
    const value = getNumeric(num);
    if (value === 0) return "₹0.00Cr";
    return `₹${(value / 100).toFixed(2)}Cr`;
  };

  // For single month data
  if (monthData) {
    return (
      <div className="space-y-6">
        {/* Chart Type Selector */}
        <div className="bg-white rounded-lg shadow p-4">
          <div className="flex flex-wrap gap-2">
            {[
              { id: "works", label: "🏗️ Works Overview", icon: "📊" },
              { id: "workforce", label: "👥 Workforce", icon: "👨‍👩‍👧‍👦" },
              { id: "expenditure", label: "💰 Expenditure", icon: "💵" },
              { id: "performance", label: "📈 Performance", icon: "🎯" },
            ].map((chart) => (
              <button
                key={chart.id}
                onClick={() => setSelectedChart(chart.id)}
                className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                  selectedChart === chart.id
                    ? "bg-blue-600 text-white"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                {chart.label}
              </button>
            ))}
          </div>
        </div>

        {/* Render Selected Chart */}
        <div className="bg-white rounded-lg shadow p-6">
          {selectedChart === "works" && (
            <WorksChart
              data={monthData}
              getNumeric={getNumeric}
              formatNumber={formatNumber}
            />
          )}
          {selectedChart === "workforce" && (
            <WorkforceChart
              data={monthData}
              getNumeric={getNumeric}
              formatNumber={formatNumber}
            />
          )}
          {selectedChart === "expenditure" && (
            <ExpenditureChart
              data={monthData}
              formatCurrency={formatCurrency}
            />
          )}
          {selectedChart === "performance" && (
            <PerformanceChart data={monthData} getNumeric={getNumeric} />
          )}
        </div>
      </div>
    );
  }

  // For multiple months data
  if (allMonthsData && allMonthsData.length > 0) {
    return (
      <div className="space-y-6">
        <div className="bg-white rounded-lg shadow p-4">
          <div className="flex flex-wrap gap-2">
            {[
              { id: "trend", label: "📈 Trends", icon: "📊" },
              { id: "comparison", label: "📊 Comparison", icon: "🔍" },
              { id: "distribution", label: "🥧 Distribution", icon: "📉" },
            ].map((chart) => (
              <button
                key={chart.id}
                onClick={() => setSelectedChart(chart.id)}
                className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                  selectedChart === chart.id
                    ? "bg-blue-600 text-white"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                {chart.label}
              </button>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          {selectedChart === "trend" && (
            <TrendChart
              data={allMonthsData}
              getNumeric={getNumeric}
              formatCurrency={formatCurrency}
              formatNumber={formatNumber}
            />
          )}
          {selectedChart === "comparison" && (
            <ComparisonChart
              data={allMonthsData}
              getNumeric={getNumeric}
              formatNumber={formatNumber}
            />
          )}
          {selectedChart === "distribution" && (
            <DistributionChart data={allMonthsData} getNumeric={getNumeric} />
          )}
        </div>
      </div>
    );
  }

  return null;
};

// Works Chart Component
const WorksChart = ({ data, getNumeric, formatNumber }) => {
  const completed = getNumeric(data.Number_of_Completed_Works);
  const ongoing = getNumeric(data.Number_of_Ongoing_Works);
  const total = getNumeric(data.Total_No_of_Works_Takenup);
  const max = Math.max(completed, ongoing, total, 1);

  return (
    <div>
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Works Overview</h2>

      <div className="space-y-4">
        <div>
          <div className="flex justify-between mb-2">
            <span className="text-gray-600 font-medium">Completed Works</span>
            <span className="font-bold text-green-600">
              {formatNumber(completed)}
            </span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-6">
            <div
              className="bg-green-600 h-6 rounded-full transition-all duration-500"
              style={{ width: `${(completed / max) * 100}%` }}
            ></div>
          </div>
        </div>

        <div>
          <div className="flex justify-between mb-2">
            <span className="text-gray-600 font-medium">Ongoing Works</span>
            <span className="font-bold text-orange-600">
              {formatNumber(ongoing)}
            </span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-6">
            <div
              className="bg-orange-600 h-6 rounded-full transition-all duration-500"
              style={{ width: `${(ongoing / max) * 100}%` }}
            ></div>
          </div>
        </div>

        <div>
          <div className="flex justify-between mb-2">
            <span className="text-gray-600 font-medium">
              Total Works Taken Up
            </span>
            <span className="font-bold text-blue-600">
              {formatNumber(total)}
            </span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-6">
            <div
              className="bg-blue-600 h-6 rounded-full transition-all duration-500"
              style={{ width: `${(total / max) * 100}%` }}
            ></div>
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-3 gap-4 mt-8">
        <div className="bg-green-50 p-4 rounded-lg text-center">
          <p className="text-xs text-gray-600 mb-1">Completion Rate</p>
          <p className="text-2xl font-bold text-green-700">
            {((completed / total) * 100).toFixed(1)}%
          </p>
        </div>
        <div className="bg-orange-50 p-4 rounded-lg text-center">
          <p className="text-xs text-gray-600 mb-1">Ongoing Rate</p>
          <p className="text-2xl font-bold text-orange-700">
            {((ongoing / total) * 100).toFixed(1)}%
          </p>
        </div>
        <div className="bg-blue-50 p-4 rounded-lg text-center">
          <p className="text-xs text-gray-600 mb-1">Works per Month</p>
          <p className="text-2xl font-bold text-blue-700">
            {formatNumber(total)}
          </p>
        </div>
      </div>
    </div>
  );
};

// Workforce Chart Component
const WorkforceChart = ({ data, getNumeric, formatNumber }) => {
  const sc = getNumeric(data.SC_persondays);
  const st = getNumeric(data.ST_persondays);
  const women = getNumeric(data.Women_Persondays);
  const total = sc + st + women || 1;
  const totalWorkers = getNumeric(data.Total_No_of_Active_Workers);
  const jobCards = getNumeric(data.Total_No_of_JobCards_issued);

  return (
    <div>
      <h2 className="text-2xl font-bold text-gray-800 mb-6">
        Workforce Distribution
      </h2>

      {/* Pie Chart Representation */}
      <div className="grid grid-cols-3 gap-6 mb-8">
        <div className="text-center">
          <div className="w-32 h-32 bg-purple-200 rounded-full flex items-center justify-center mx-auto mb-3 shadow-lg">
            <div className="text-center">
              <p className="text-3xl font-bold text-purple-800">
                {((sc / total) * 100).toFixed(0)}%
              </p>
              <p className="text-xs text-purple-600">SC</p>
            </div>
          </div>
          <p className="font-semibold text-gray-800">SC Workers</p>
          <p className="text-sm text-gray-600">{formatNumber(sc)} persondays</p>
        </div>

        <div className="text-center">
          <div className="w-32 h-32 bg-indigo-200 rounded-full flex items-center justify-center mx-auto mb-3 shadow-lg">
            <div className="text-center">
              <p className="text-3xl font-bold text-indigo-800">
                {((st / total) * 100).toFixed(0)}%
              </p>
              <p className="text-xs text-indigo-600">ST</p>
            </div>
          </div>
          <p className="font-semibold text-gray-800">ST Workers</p>
          <p className="text-sm text-gray-600">{formatNumber(st)} persondays</p>
        </div>

        <div className="text-center">
          <div className="w-32 h-32 bg-pink-200 rounded-full flex items-center justify-center mx-auto mb-3 shadow-lg">
            <div className="text-center">
              <p className="text-3xl font-bold text-pink-800">
                {((women / total) * 100).toFixed(0)}%
              </p>
              <p className="text-xs text-pink-600">Women</p>
            </div>
          </div>
          <p className="font-semibold text-gray-800">Women Workers</p>
          <p className="text-sm text-gray-600">
            {formatNumber(women)} persondays
          </p>
        </div>
      </div>

      {/* Additional Stats */}
      <div className="grid grid-cols-3 gap-4">
        <div className="bg-blue-50 p-4 rounded-lg text-center">
          <p className="text-xs text-gray-600 mb-1">Total Workers</p>
          <p className="text-2xl font-bold text-blue-700">
            {formatNumber(totalWorkers)}
          </p>
        </div>
        <div className="bg-green-50 p-4 rounded-lg text-center">
          <p className="text-xs text-gray-600 mb-1">Job Cards</p>
          <p className="text-2xl font-bold text-green-700">
            {formatNumber(jobCards)}
          </p>
        </div>
        <div className="bg-purple-50 p-4 rounded-lg text-center">
          <p className="text-xs text-gray-600 mb-1">Households Worked</p>
          <p className="text-2xl font-bold text-purple-700">
            {formatNumber(getNumeric(data.Total_Households_Worked))}
          </p>
        </div>
      </div>
    </div>
  );
};

// Expenditure Chart Component
const ExpenditureChart = ({ data, formatCurrency }) => {
  const totalExp = parseFloat(data.Total_Exp) || 0;
  const adminExp = parseFloat(data.Total_Adm_Expenditure) || 0;
  const wages = parseFloat(data.Wages) || 0;
  const material = parseFloat(data.Material_and_skilled_Wages) || 0;

  const max = Math.max(totalExp, adminExp, wages, material, 1);

  return (
    <div>
      <h2 className="text-2xl font-bold text-gray-800 mb-6">
        Expenditure Breakdown
      </h2>

      <div className="space-y-4 mb-8">
        <div>
          <div className="flex justify-between mb-2">
            <span className="text-gray-600 font-medium">Total Expenditure</span>
            <span className="font-bold text-green-600">
              {formatCurrency(totalExp * 100)}
            </span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-6">
            <div
              className="bg-green-600 h-6 rounded-full transition-all duration-500"
              style={{ width: `${(totalExp / max) * 100}%` }}
            ></div>
          </div>
        </div>

        <div>
          <div className="flex justify-between mb-2">
            <span className="text-gray-600 font-medium">
              Administrative Expenditure
            </span>
            <span className="font-bold text-blue-600">
              {formatCurrency(adminExp * 100)}
            </span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-6">
            <div
              className="bg-blue-600 h-6 rounded-full transition-all duration-500"
              style={{ width: `${(adminExp / max) * 100}%` }}
            ></div>
          </div>
        </div>

        <div>
          <div className="flex justify-between mb-2">
            <span className="text-gray-600 font-medium">Wages</span>
            <span className="font-bold text-orange-600">
              {formatCurrency(wages * 100)}
            </span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-6">
            <div
              className="bg-orange-600 h-6 rounded-full transition-all duration-500"
              style={{ width: `${(wages / max) * 100}%` }}
            ></div>
          </div>
        </div>

        <div>
          <div className="flex justify-between mb-2">
            <span className="text-gray-600 font-medium">
              Material & Skilled Wages
            </span>
            <span className="font-bold text-purple-600">
              {formatCurrency(material * 100)}
            </span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-6">
            <div
              className="bg-purple-600 h-6 rounded-full transition-all duration-500"
              style={{ width: `${(material / max) * 100}%` }}
            ></div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-4 gap-4">
        <div className="text-center">
          <p className="text-2xl font-bold text-green-700">
            {formatCurrency(totalExp * 100)}
          </p>
          <p className="text-xs text-gray-600">Total Exp</p>
        </div>
        <div className="text-center">
          <p className="text-2xl font-bold text-blue-700">
            {formatCurrency(adminExp * 100)}
          </p>
          <p className="text-xs text-gray-600">Admin Exp</p>
        </div>
        <div className="text-center">
          <p className="text-2xl font-bold text-orange-700">
            {formatCurrency(wages * 100)}
          </p>
          <p className="text-xs text-gray-600">Wages</p>
        </div>
        <div className="text-center">
          <p className="text-2xl font-bold text-purple-700">
            {formatCurrency(material * 100)}
          </p>
          <p className="text-xs text-gray-600">Material</p>
        </div>
      </div>
    </div>
  );
};

// Performance Chart Component
const PerformanceChart = ({ data, getNumeric }) => {
  const paymentRate = getNumeric(
    data.percentage_payments_gererated_within_15_days
  );
  const categoryBWorks = getNumeric(data.percent_of_Category_B_Works);
  const agricultureExp = getNumeric(
    data.percent_of_Expenditure_on_Agriculture_Allied_Works
  );
  const nrmExp = getNumeric(data.percent_of_NRM_Expenditure);

  return (
    <div>
      <h2 className="text-2xl font-bold text-gray-800 mb-6">
        Performance Metrics
      </h2>

      <div className="space-y-6">
        <div>
          <div className="flex justify-between mb-2">
            <span className="text-gray-600 font-medium">
              Payment within 15 Days
            </span>
            <span className="font-bold text-green-600">{paymentRate}%</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-6">
            <div
              className="bg-green-600 h-6 rounded-full transition-all duration-500"
              style={{ width: `${paymentRate}%` }}
            ></div>
          </div>
        </div>

        <div>
          <div className="flex justify-between mb-2">
            <span className="text-gray-600 font-medium">Category B Works</span>
            <span className="font-bold text-blue-600">{categoryBWorks}%</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-6">
            <div
              className="bg-blue-600 h-6 rounded-full transition-all duration-500"
              style={{ width: `${categoryBWorks}%` }}
            ></div>
          </div>
        </div>

        <div>
          <div className="flex justify-between mb-2">
            <span className="text-gray-600 font-medium">
              Agriculture & Allied Works Expenditure
            </span>
            <span className="font-bold text-orange-600">{agricultureExp}%</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-6">
            <div
              className="bg-orange-600 h-6 rounded-full transition-all duration-500"
              style={{ width: `${agricultureExp}%` }}
            ></div>
          </div>
        </div>

        <div>
          <div className="flex justify-between mb-2">
            <span className="text-gray-600 font-medium">NRM Expenditure</span>
            <span className="font-bold text-purple-600">{nrmExp}%</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-6">
            <div
              className="bg-purple-600 h-6 rounded-full transition-all duration-500"
              style={{ width: `${nrmExp}%` }}
            ></div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4 mt-8">
        <div className="bg-green-50 p-4 rounded-lg text-center">
          <p className="text-xs text-gray-600 mb-1">Average Wage Rate</p>
          <p className="text-2xl font-bold text-green-700">
            ₹{getNumeric(data.Average_Wage_rate_per_day_per_person).toFixed(0)}
          </p>
          <p className="text-xs text-gray-500">per day</p>
        </div>
        <div className="bg-blue-50 p-4 rounded-lg text-center">
          <p className="text-xs text-gray-600 mb-1">Avg Days per Household</p>
          <p className="text-2xl font-bold text-blue-700">
            {getNumeric(data.Average_days_of_employment_provided_per_Household)}{" "}
            days
          </p>
        </div>
      </div>
    </div>
  );
};

// Trend Chart for Multiple Months
const TrendChart = ({ data, getNumeric, formatCurrency, formatNumber }) => {
  const sortedData = [...data].sort((a, b) => {
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
    return monthOrder.indexOf(a.month) - monthOrder.indexOf(b.month);
  });

  const maxExpense = Math.max(
    ...sortedData.map((d) => getNumeric(d.Total_Exp))
  );
  const maxWorks = Math.max(
    ...sortedData.map((d) => getNumeric(d.Number_of_Completed_Works))
  );

  return (
    <div>
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Monthly Trends</h2>

      <div className="space-y-6">
        {/* Expense Trend */}
        <div>
          <h3 className="text-lg font-semibold text-gray-700 mb-4">
            Expenditure Trend
          </h3>
          <div className="space-y-3">
            {sortedData.map((month, index) => {
              const expense = getNumeric(month.Total_Exp);
              const height = (expense / maxExpense) * 100;
              return (
                <div key={index} className="flex items-center gap-4">
                  <span className="text-sm font-medium text-gray-600 w-20">
                    {month.month}
                  </span>
                  <div className="flex-1 bg-gray-200 rounded-full h-6">
                    <div
                      className="bg-blue-600 h-6 rounded-full transition-all duration-500"
                      style={{ width: `${height}%` }}
                    ></div>
                  </div>
                  <span className="text-sm font-bold text-gray-800 w-20 text-right">
                    {formatCurrency(expense * 100)}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Works Trend */}
        <div>
          <h3 className="text-lg font-semibold text-gray-700 mb-4">
            Completed Works Trend
          </h3>
          <div className="space-y-3">
            {sortedData.map((month, index) => {
              const works = getNumeric(month.Number_of_Completed_Works);
              const height = (works / maxWorks) * 100;
              return (
                <div key={index} className="flex items-center gap-4">
                  <span className="text-sm font-medium text-gray-600 w-20">
                    {month.month}
                  </span>
                  <div className="flex-1 bg-gray-200 rounded-full h-6">
                    <div
                      className="bg-green-600 h-6 rounded-full transition-all duration-500"
                      style={{ width: `${height}%` }}
                    ></div>
                  </div>
                  <span className="text-sm font-bold text-gray-800 w-20 text-right">
                    {formatNumber(works)}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

// Comparison Chart
const ComparisonChart = ({ data, getNumeric, formatNumber }) => {
  const stats = data.map((m) => ({
    month: m.month,
    completed: getNumeric(m.Number_of_Completed_Works),
    ongoing: getNumeric(m.Number_of_Ongoing_Works),
    total: getNumeric(m.Total_No_of_Works_Takenup),
  }));

  const maxValue = Math.max(
    ...stats.map((s) => Math.max(s.completed, s.ongoing, s.total))
  );

  return (
    <div>
      <h2 className="text-2xl font-bold text-gray-800 mb-6">
        Month-over-Month Comparison
      </h2>

      <div className="space-y-4">
        {stats.map((stat, index) => (
          <div
            key={index}
            className="border-l-4 border-blue-500 bg-gray-50 p-4 rounded-r-lg"
          >
            <div className="flex justify-between items-center mb-2">
              <h3 className="font-semibold text-gray-800">{stat.month}</h3>
              <div className="flex gap-4 text-sm">
                <span className="text-green-600">
                  ✓ {formatNumber(stat.completed)}
                </span>
                <span className="text-orange-600">
                  ⏳ {formatNumber(stat.ongoing)}
                </span>
              </div>
            </div>
            <div className="flex gap-2 h-4">
              <div
                className="bg-green-600 rounded"
                style={{ width: `${(stat.completed / maxValue) * 50}%` }}
              ></div>
              <div
                className="bg-orange-600 rounded"
                style={{ width: `${(stat.ongoing / maxValue) * 50}%` }}
              ></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

// Distribution Chart
const DistributionChart = ({ data, getNumeric }) => {
  const totalSC = data.reduce((sum, m) => sum + getNumeric(m.SC_persondays), 0);
  const totalST = data.reduce((sum, m) => sum + getNumeric(m.ST_persondays), 0);
  const totalWomen = data.reduce(
    (sum, m) => sum + getNumeric(m.Women_Persondays),
    0
  );
  const grandTotal = totalSC + totalST + totalWomen || 1;

  return (
    <div>
      <h2 className="text-2xl font-bold text-gray-800 mb-6">
        Annual Workforce Distribution
      </h2>

      <div className="grid grid-cols-3 gap-6 mb-8">
        <div className="text-center bg-purple-100 p-6 rounded-lg">
          <div className="text-5xl font-bold text-purple-700 mb-2">
            {((totalSC / grandTotal) * 100).toFixed(1)}%
          </div>
          <p className="text-lg font-semibold text-gray-800">SC Workers</p>
          <p className="text-sm text-gray-600">
            {totalSC.toLocaleString("en-IN")} persondays
          </p>
        </div>

        <div className="text-center bg-indigo-100 p-6 rounded-lg">
          <div className="text-5xl font-bold text-indigo-700 mb-2">
            {((totalST / grandTotal) * 100).toFixed(1)}%
          </div>
          <p className="text-lg font-semibold text-gray-800">ST Workers</p>
          <p className="text-sm text-gray-600">
            {totalST.toLocaleString("en-IN")} persondays
          </p>
        </div>

        <div className="text-center bg-pink-100 p-6 rounded-lg">
          <div className="text-5xl font-bold text-pink-700 mb-2">
            {((totalWomen / grandTotal) * 100).toFixed(1)}%
          </div>
          <p className="text-lg font-semibold text-gray-800">Women Workers</p>
          <p className="text-sm text-gray-600">
            {totalWomen.toLocaleString("en-IN")} persondays
          </p>
        </div>
      </div>

      <div className="bg-blue-50 p-6 rounded-lg">
        <p className="text-sm text-gray-600 mb-2">Total Persondays Generated</p>
        <p className="text-3xl font-bold text-blue-700">
          {(totalSC + totalST + totalWomen).toLocaleString("en-IN")}
        </p>
      </div>
    </div>
  );
};

export default MonthlyCharts;
