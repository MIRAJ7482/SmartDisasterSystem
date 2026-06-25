require("dns").setServers(["8.8.8.8", "1.1.1.1"]);

const mongoose = require("mongoose");
require("dotenv").config();

async function run() {
  try {
    console.log("URI:", process.env.MONGO_URI);

    await mongoose.connect(process.env.MONGO_URI, {
      serverSelectionTimeoutMS: 10000,
    });

    console.log("✅ MongoDB Connected");
  } catch (err) {
    console.error("FULL ERROR:");
    console.error(err);
  }
}

run();