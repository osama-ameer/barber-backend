const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const connectDB = require("./config/db");
const swaggerSetup = require("./utils/swagger");

// Routes Import
const authRoutes = require("./routes/authRoutes");
const reservationRoutes = require("./routes/reservationRoutes");
const barberRoutes = require("./routes/barberRoutes");

dotenv.config();
connectDB();

const app = express();

app.use(cors());
app.use(express.json());

// Catch JSON parsing errors
app.use((err, req, res, next) => {
  if (err instanceof SyntaxError && err.status === 400 && "body" in err) {
    return res.status(400).json({ error: "Invalid JSON format" });
  }
  next();
});

// Test Api
app.get("/", async (req, res) => {
  res.json({ message: "Welcome to the API" });
});

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/reservation", reservationRoutes);
app.use("/api/barber", barberRoutes);

swaggerSetup(app);

const PORT = process.env.PORT || 5001;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
