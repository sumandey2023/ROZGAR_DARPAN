const express = require("express");
const connectDB = require("./db/db");
const cors = require("cors");
const districtRoutes = require("./routes/district.routes");
const aiRoutes = require("./routes/ai.routes");

const app = express();
connectDB();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// CORS configuration
const corsOptions = {
  origin: ["http://localhost:5173", "https://rozgar-darpan.vercel.app"],
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: false,
};

app.use(cors(corsOptions));
// Explicitly handle preflight across routes
app.options("*", cors(corsOptions));
// Routes

app.use("/api/district", districtRoutes);
app.use("/api/ai", aiRoutes);

module.exports = app;
