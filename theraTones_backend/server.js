const express = require("express");
const app = express();

// Basic middleware
app.use(express.json());

// Test route
app.get("/", (req, res) => {
  res.send("TheraTones Backend Server is Running");
});

// Health check route
app.get("/api/health", (req, res) => {
  res.json({ status: "ok", message: "TheraTones API is running" });
});

// Start server with error handling
const PORT = process.env.PORT || 6051;

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
