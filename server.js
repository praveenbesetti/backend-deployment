require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const userRoutes = require("./routes/userRoutes");

const app = express();
app.use(express.json());
app.use(cors({
  origin: ["*"],
  methods: ["GET", "POST"],
  credentials: true
}));

// root route
app.get("/", (req, res) => {
  res.send("hello this is server");
  console.log("hii")
});

// routes
app.use("/api", userRoutes);

const PORT = process.env.PORT || 5000; // Fallback to 5000 if .env is missing
app.listen(PORT, () =>
  console.log(`Server running on port ${PORT}`)
);
