const District = require("../models/model.district");
const axios = require("axios");

const DISTRICT_API_BASE_URL =
  "https://api.data.gov.in/resource/ee03643a-ee4c-48c2-ac30-9f2ff26ab722";
const API_KEY = process.env.API_KEY;

function convertToNumber(value) {
  if (value === null || value === undefined || value === "") {
    return 0;
  }
  const num = parseFloat(value);
  return isNaN(num) ? 0 : num;
}


const fetchDistrictData = async (req, res) => {
  try {
    const { state_name, fin_year, district_name, month } = req.body;

  
    if (!state_name || !fin_year || !district_name) {
      return res.status(400).json({
        success: false,
        message:
          "Missing required parameters: state_name, fin_year, and district_name are required",
      });
    }

    
    const filters = {
      "filters[state_name]": state_name.toUpperCase(),
      "filters[fin_year]": fin_year.toUpperCase(),
    };

    
    if (district_name && district_name !== "") {
      filters["filters[district_name]"] = district_name.toUpperCase();
    }
   

    const params = new URLSearchParams({
      "api-key": API_KEY,
      format: "json",
      offset: "1",
      limit: "1000",
      ...filters,
    });

    const apiUrl = `${DISTRICT_API_BASE_URL}?${params.toString()}`;

    console.log("Fetching from API:", apiUrl);

    // Call the external API
    const apiResponse = await axios.get(apiUrl);

    // Check if API call was successful
    if (apiResponse.data.status !== "ok") {
      return res.status(500).json({
        success: false,
        message: "Failed to fetch data from external API",
        error: apiResponse.data,
      });
    }

    let records = apiResponse.data.records;

    // Filter by month locally if month is specified
    if (month && month !== "") {
      records = records.filter((record) => record.month === month);

      if (records.length === 0) {
        return res.status(404).json({
          success: false,
          message: `No records found for the month: ${month}`,
        });
      }
    } else if (!records || records.length === 0) {
      return res.status(404).json({
        success: false,
        message: "No records found for the specified filters",
      });
    }

    let savedCount = 0;
    let skippedCount = 0;
    let errorCount = 0;

    // Process and save each record
    for (const record of records) {
      try {
        // Convert string numbers to actual numbers
        const processedRecord = {
          fin_year: record.fin_year,
          month: record.month,
          state_code: record.state_code,
          state_name: record.state_name,
          district_code: record.district_code,
          district_name: record.district_name,
          Approved_Labour_Budget: convertToNumber(
            record.Approved_Labour_Budget
          ),
          Average_Wage_rate_per_day_per_person: convertToNumber(
            record.Average_Wage_rate_per_day_per_person
          ),
          Average_days_of_employment_provided_per_Household: convertToNumber(
            record.Average_days_of_employment_provided_per_Household
          ),
          Differently_abled_persons_worked: convertToNumber(
            record.Differently_abled_persons_worked
          ),
          Material_and_skilled_Wages: convertToNumber(
            record.Material_and_skilled_Wages
          ),
          Number_of_Completed_Works: convertToNumber(
            record.Number_of_Completed_Works
          ),
          Number_of_GPs_with_NIL_exp: convertToNumber(
            record.Number_of_GPs_with_NIL_exp
          ),
          Number_of_Ongoing_Works: convertToNumber(
            record.Number_of_Ongoing_Works
          ),
          Persondays_of_Central_Liability_so_far: convertToNumber(
            record.Persondays_of_Central_Liability_so_far
          ),
          SC_persondays: convertToNumber(record.SC_persondays),
          SC_workers_against_active_workers: convertToNumber(
            record.SC_workers_against_active_workers
          ),
          ST_persondays: convertToNumber(record.ST_persondays),
          ST_workers_against_active_workers: convertToNumber(
            record.ST_workers_against_active_workers
          ),
          Total_Adm_Expenditure: convertToNumber(record.Total_Adm_Expenditure),
          Total_Exp: convertToNumber(record.Total_Exp),
          Total_Households_Worked: convertToNumber(
            record.Total_Households_Worked
          ),
          Total_Individuals_Worked: convertToNumber(
            record.Total_Individuals_Worked
          ),
          Total_No_of_Active_Job_Cards: convertToNumber(
            record.Total_No_of_Active_Job_Cards
          ),
          Total_No_of_Active_Workers: convertToNumber(
            record.Total_No_of_Active_Workers
          ),
          Total_No_of_HHs_completed_100_Days_of_Wage_Employment:
            convertToNumber(
              record.Total_No_of_HHs_completed_100_Days_of_Wage_Employment
            ),
          Total_No_of_JobCards_issued: convertToNumber(
            record.Total_No_of_JobCards_issued
          ),
          Total_No_of_Workers: convertToNumber(record.Total_No_of_Workers),
          Total_No_of_Works_Takenup: convertToNumber(
            record.Total_No_of_Works_Takenup
          ),
          Wages: convertToNumber(record.Wages),
          Women_Persondays: convertToNumber(record.Women_Persondays),
          percent_of_Category_B_Works: convertToNumber(
            record.percent_of_Category_B_Works
          ),
          percent_of_Expenditure_on_Agriculture_Allied_Works: convertToNumber(
            record.percent_of_Expenditure_on_Agriculture_Allied_Works
          ),
          percent_of_NRM_Expenditure: convertToNumber(
            record.percent_of_NRM_Expenditure
          ),
          percentage_payments_gererated_within_15_days: convertToNumber(
            record.percentage_payments_gererated_within_15_days
          ),
          Remarks: record.Remarks || "NA",
        };

        // Check if record already exists
        const existingRecord = await District.findOne({
          district_code: processedRecord.district_code,
          fin_year: processedRecord.fin_year,
          month: processedRecord.month,
        });

        if (existingRecord) {
          skippedCount++;
          console.log(
            `Skipped existing record: ${processedRecord.district_name} - ${processedRecord.month} ${processedRecord.fin_year}`
          );
        } else {
          await District.create(processedRecord);
          savedCount++;
          console.log(
            `Saved record: ${processedRecord.district_name} - ${processedRecord.month} ${processedRecord.fin_year}`
          );
        }
      } catch (error) {
        errorCount++;
        console.error("Error processing record:", error.message);
      }
    }

    return res.status(200).json({
      success: true,
      message: "Data processed successfully",
      savedRecords: savedCount,
      skippedRecords: skippedCount,
      errorRecords: errorCount,
      totalRecords: records.length,
      data: records,
    });
  } catch (error) {
    console.error("Error in fetchDistrictData:", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message,
    });
  }
};

// Get district data from database with optional filters
const getDistrictData = async (req, res) => {
  try {
    const {
      state_name,
      state_code,
      district_name,
      district_code,
      fin_year,
      month,
      limit = 1000,
      offset = 0,
    } = req.query;

    // Build query object
    const query = {};
    if (state_name) query.state_name = new RegExp(state_name, "i");
    if (state_code) query.state_code = state_code;
    if (district_name) query.district_name = new RegExp(district_name, "i");
    if (district_code) query.district_code = district_code;
    if (fin_year) query.fin_year = fin_year;
    if (month) query.month = month;

    // Execute query
    const districts = await District.find(query)
      .limit(parseInt(limit))
      .skip(parseInt(offset))
      .sort({ createdAt: -1 });

    const totalCount = await District.countDocuments(query);

    return res.status(200).json({
      success: true,
      count: districts.length,
      total: totalCount,
      data: districts,
    });
  } catch (error) {
    console.error("Error in getDistrictData:", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message,
    });
  }
};

// Fetch data from API or return from DB if exists
const fetchOrGetDistrictData = async (req, res) => {
  try {
    const { state_name, fin_year, district_name, district_code, month } =
      req.body;

    console.log(month);
    // Validate required parameters
    if (!state_name || !fin_year) {
      return res.status(400).json({
        success: false,
        message:
          "Missing required parameters: state_name and fin_year are required",
      });
    }

    // Build database query
    const dbQuery = {
      state_name: new RegExp(state_name, "i"),
      fin_year: fin_year,
    };

    if (district_name && district_name !== "") {
      dbQuery.district_name = new RegExp(district_name, "i");
    }
    if (district_code && district_code !== "") {
      dbQuery.district_code = district_code;
    }
    if (month && month !== "") {
      dbQuery.month = month;
    }

    // Check if data exists in database
    const existingData = await District.find(dbQuery);

    if (existingData && existingData.length > 0) {
      // Data exists in DB, return it
      return res.status(200).json({
        success: true,
        message: "Data retrieved from database",
        source: "database",
        count: existingData.length,
        data: existingData,
      });
    }

    // Data doesn't exist in DB, fetch from API
    console.log("Data not found in DB, fetching from external API...");

    // Build the API URL - convert to uppercase for external API (NO MONTH FILTER)
    const filters = {
      "filters[state_name]": state_name.toUpperCase(),
      "filters[fin_year]": fin_year.toUpperCase(),
    };

    if (district_name && district_name !== "") {
      filters["filters[district_name]"] = district_name.toUpperCase();
    }
    if (district_code && district_code !== "") {
      filters["filters[district_code]"] = district_code.toUpperCase();
    }
    // NOTE: NOT filtering by month in API call - will fetch all months

    const params = new URLSearchParams({
      "api-key": API_KEY,
      format: "json",
      offset: "1",
      limit: "1000",
      ...filters,
    });

    const apiUrl = `${DISTRICT_API_BASE_URL}?${params.toString()}`;

    console.log("Fetching from API:", apiUrl);

    // Call the external API
    const apiResponse = await axios.get(apiUrl);

    if (apiResponse.data.status !== "ok") {
      return res.status(500).json({
        success: false,
        message: "Failed to fetch data from external API",
        error: apiResponse.data,
      });
    }

    let records = apiResponse.data.records;

    if (!records || records.length === 0) {
      return res.status(404).json({
        success: false,
        message: "No records found for the specified filters",
      });
    }

    // Filter by month locally if month is specified
    if (month && month !== "") {
      records = records.filter((record) => record.month === month);

      if (records.length === 0) {
        return res.status(404).json({
          success: false,
          message: `No records found for the month: ${month}`,
        });
      }
    }

    let savedCount = 0;
    let skippedCount = 0;

    // Save records to database (already filtered by month)
    for (const record of records) {
      try {
        const processedRecord = {
          fin_year: record.fin_year,
          month: record.month,
          state_code: record.state_code,
          state_name: record.state_name,
          district_code: record.district_code,
          district_name: record.district_name,
          Approved_Labour_Budget: convertToNumber(
            record.Approved_Labour_Budget
          ),
          Average_Wage_rate_per_day_per_person: convertToNumber(
            record.Average_Wage_rate_per_day_per_person
          ),
          Average_days_of_employment_provided_per_Household: convertToNumber(
            record.Average_days_of_employment_provided_per_Household
          ),
          Differently_abled_persons_worked: convertToNumber(
            record.Differently_abled_persons_worked
          ),
          Material_and_skilled_Wages: convertToNumber(
            record.Material_and_skilled_Wages
          ),
          Number_of_Completed_Works: convertToNumber(
            record.Number_of_Completed_Works
          ),
          Number_of_GPs_with_NIL_exp: convertToNumber(
            record.Number_of_GPs_with_NIL_exp
          ),
          Number_of_Ongoing_Works: convertToNumber(
            record.Number_of_Ongoing_Works
          ),
          Persondays_of_Central_Liability_so_far: convertToNumber(
            record.Persondays_of_Central_Liability_so_far
          ),
          SC_persondays: convertToNumber(record.SC_persondays),
          SC_workers_against_active_workers: convertToNumber(
            record.SC_workers_against_active_workers
          ),
          ST_persondays: convertToNumber(record.ST_persondays),
          ST_workers_against_active_workers: convertToNumber(
            record.ST_workers_against_active_workers
          ),
          Total_Adm_Expenditure: convertToNumber(record.Total_Adm_Expenditure),
          Total_Exp: convertToNumber(record.Total_Exp),
          Total_Households_Worked: convertToNumber(
            record.Total_Households_Worked
          ),
          Total_Individuals_Worked: convertToNumber(
            record.Total_Individuals_Worked
          ),
          Total_No_of_Active_Job_Cards: convertToNumber(
            record.Total_No_of_Active_Job_Cards
          ),
          Total_No_of_Active_Workers: convertToNumber(
            record.Total_No_of_Active_Workers
          ),
          Total_No_of_HHs_completed_100_Days_of_Wage_Employment:
            convertToNumber(
              record.Total_No_of_HHs_completed_100_Days_of_Wage_Employment
            ),
          Total_No_of_JobCards_issued: convertToNumber(
            record.Total_No_of_JobCards_issued
          ),
          Total_No_of_Workers: convertToNumber(record.Total_No_of_Workers),
          Total_No_of_Works_Takenup: convertToNumber(
            record.Total_No_of_Works_Takenup
          ),
          Wages: convertToNumber(record.Wages),
          Women_Persondays: convertToNumber(record.Women_Persondays),
          percent_of_Category_B_Works: convertToNumber(
            record.percent_of_Category_B_Works
          ),
          percent_of_Expenditure_on_Agriculture_Allied_Works: convertToNumber(
            record.percent_of_Expenditure_on_Agriculture_Allied_Works
          ),
          percent_of_NRM_Expenditure: convertToNumber(
            record.percent_of_NRM_Expenditure
          ),
          percentage_payments_gererated_within_15_days: convertToNumber(
            record.percentage_payments_gererated_within_15_days
          ),
          Remarks: record.Remarks || "NA",
        };

        const existingRecord = await District.findOne({
          district_code: processedRecord.district_code,
          fin_year: processedRecord.fin_year,
          month: processedRecord.month,
        });

        if (existingRecord) {
          skippedCount++;
        } else {
          await District.create(processedRecord);
          savedCount++;
        }
      } catch (error) {
        console.error("Error processing record:", error.message);
      }
    }

    // Fetch the saved data again to return
    const savedData = await District.find(dbQuery);

    return res.status(200).json({
      success: true,
      message: "Data fetched from API and saved to database",
      source: "api",
      savedRecords: savedCount,
      skippedRecords: skippedCount,
      count: savedData.length,
      data: savedData,
    });
  } catch (error) {
    console.error("Error in fetchOrGetDistrictData:", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message,
    });
  }
};

module.exports = {
  fetchDistrictData,
  getDistrictData,
  fetchOrGetDistrictData,
};
