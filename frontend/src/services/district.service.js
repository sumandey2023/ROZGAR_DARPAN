import axios from "axios";
import API_BASE_URL from "../config/api.config";

export const fetchDistrictData = async (params) => {
  try {
    const response = await axios.post(
      `${API_BASE_URL}/district/get-or-fetch`,
      params
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching district data:", error);
    throw error;
  }
};

export const getDistrictData = async (queryParams) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/district`, {
      params: queryParams,
    });
    return response.data;
  } catch (error) {
    console.error("Error getting district data:", error);
    throw error;
  }
};

export const saveDistrictData = async (params) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/district/fetch`, params);
    return response.data;
  } catch (error) {
    console.error("Error saving district data:", error);
    throw error;
  }
};
