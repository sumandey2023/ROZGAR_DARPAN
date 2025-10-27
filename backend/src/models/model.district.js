const mongoose = require("mongoose");

const districtSchema = new mongoose.Schema(
  {
    fin_year: {
      type: String,
      required: true,
      trim: true,
    },
    month: {
      type: String,
      required: true,
      trim: true,
    },
    state_code: {
      type: String,
      required: true,
      trim: true,
    },
    state_name: {
      type: String,
      required: true,
      trim: true,
    },
    district_code: {
      type: String,
      required: true,
      trim: true,
    },
    district_name: {
      type: String,
      required: true,
      trim: true,
    },
    Approved_Labour_Budget: {
      type: Number,
      default: 0,
    },
    Average_Wage_rate_per_day_per_person: {
      type: Number,
      default: 0,
    },
    Average_days_of_employment_provided_per_Household: {
      type: Number,
      default: 0,
    },
    Differently_abled_persons_worked: {
      type: Number,
      default: 0,
    },
    Material_and_skilled_Wages: {
      type: Number,
      default: 0,
    },
    Number_of_Completed_Works: {
      type: Number,
      default: 0,
    },
    Number_of_GPs_with_NIL_exp: {
      type: Number,
      default: 0,
    },
    Number_of_Ongoing_Works: {
      type: Number,
      default: 0,
    },
    Persondays_of_Central_Liability_so_far: {
      type: Number,
      default: 0,
    },
    SC_persondays: {
      type: Number,
      default: 0,
    },
    SC_workers_against_active_workers: {
      type: Number,
      default: 0,
    },
    ST_persondays: {
      type: Number,
      default: 0,
    },
    ST_workers_against_active_workers: {
      type: Number,
      default: 0,
    },
    Total_Adm_Expenditure: {
      type: Number,
      default: 0,
    },
    Total_Exp: {
      type: Number,
      default: 0,
    },
    Total_Households_Worked: {
      type: Number,
      default: 0,
    },
    Total_Individuals_Worked: {
      type: Number,
      default: 0,
    },
    Total_No_of_Active_Job_Cards: {
      type: Number,
      default: 0,
    },
    Total_No_of_Active_Workers: {
      type: Number,
      default: 0,
    },
    Total_No_of_HHs_completed_100_Days_of_Wage_Employment: {
      type: Number,
      default: 0,
    },
    Total_No_of_JobCards_issued: {
      type: Number,
      default: 0,
    },
    Total_No_of_Workers: {
      type: Number,
      default: 0,
    },
    Total_No_of_Works_Takenup: {
      type: Number,
      default: 0,
    },
    Wages: {
      type: Number,
      default: 0,
    },
    Women_Persondays: {
      type: Number,
      default: 0,
    },
    percent_of_Category_B_Works: {
      type: Number,
      default: 0,
    },
    percent_of_Expenditure_on_Agriculture_Allied_Works: {
      type: Number,
      default: 0,
    },
    percent_of_NRM_Expenditure: {
      type: Number,
      default: 0,
    },
    percentage_payments_gererated_within_15_days: {
      type: Number,
      default: 0,
    },
    Remarks: {
      type: String,
      default: "NA",
      trim: true,
    },
  },
  {
    timestamps: true,
  }
);

// Create compound index for efficient querying
districtSchema.index({ district_code: 1, fin_year: 1, month: 1 });
districtSchema.index({ state_code: 1, fin_year: 1 });

const District = mongoose.model("District", districtSchema);

module.exports = District;
