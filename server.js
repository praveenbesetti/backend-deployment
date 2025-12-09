require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const userRoutes = require("./routes/userRoutes");

const app = express();
app.use(express.json());
app.use(cors({
  origin: "http://localhost:3000",
  methods: "GET,POST",
  credentials: true
}));

// root route
app.get("/", (req, res) => {
  res.send("hello this is server");
});

// routes
app.use("/api", userRoutes);

// mongodb connect
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.log("MongoDB error:", err));

app.listen(process.env.PORT, () =>
  console.log(`Server running on port ${process.env.PORT}`)
);
