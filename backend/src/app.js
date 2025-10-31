const express = require("express");
const connectDB = require("./db/db");
const cors = require("cors");
const districtRoutes = require("./routes/district.routes");
const aiRoutes = require("./routes/ai.routes");

const app = express();
connectDB();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "https://rozgar-darpan.vercel.app/",
    ].filter(Boolean),
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  })
);
// Routes

app.use("/api/district", districtRoutes);
app.use("/api/ai", aiRoutes);

module.exports = app;
