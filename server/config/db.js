const mongoose = require("mongoose");
const dotenv = require("dotenv");

const connectDB = async () => {
  const conn = await mongoose
    .connect(
      `mongodb://${process.env.MONGO_IP}:${process.env.MONGO_PORT}/${process.env.MONGO_DB}`,
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      }
    )
    .then(() => {
      console.log("Successfully connected to MongoDB");
    })
    .catch((err) => {
      console.log(`Connection error: ${err}`);
      process.exit(0);
    });
};

module.exports = connectDB;
