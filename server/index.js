const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const connectDB = require("./config/db");

// Connect to DB
connectDB();

// Initialize express server
const app = express();

var corsOptions = {
  origin: "http://localhost:3000",
};

//  Middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Include routes
const relaysRoutes = require("./routes/relay.routes");

app.use("/api/v1/relays", relaysRoutes);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server running on port: ${PORT}`);
});
