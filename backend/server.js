const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");

const connectDB = require("./config/db");

const reportRoutes = require("./routes/reportRoutes");
const authRoutes = require("./routes/authRoutes");



dotenv.config();

// Connect MongoDB
connectDB();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/reports", reportRoutes);
app.use("/api/auth", authRoutes);

app.get("/hello", (req, res) => {
  res.send("HELLO MIRAJ");
});
// Test Route
app.get("/api/test", (req, res) => {
  res.send("API Test OK");
});

// Home Route
app.get("/", (req, res) => {
  res.send("Backend Running Successfully");
});

// Start Server
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`✅ Server Running On Port ${PORT}`);
});