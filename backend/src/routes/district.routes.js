const express = require("express");
const router = express.Router();
const {
  fetchDistrictData,
  getDistrictData,
  fetchOrGetDistrictData,
} = require("../controllers/district.controller");

// POST - Fetch data from external API and store in DB
router.post("/fetch", fetchDistrictData);

// POST - Get data from DB if exists, otherwise fetch from API and store
router.post("/get-or-fetch", fetchOrGetDistrictData);

// GET - Query data from database only
router.get("/", getDistrictData);

module.exports = router;
