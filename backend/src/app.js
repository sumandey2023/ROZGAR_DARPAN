const express = require("express");
const connectDB = require("./db/db");
const cors = require("cors");

const app = express();
connectDB();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());

// Routes
const districtRoutes = require("./routes/district.routes");

app.use("/api/district", districtRoutes);

module.exports = app;
