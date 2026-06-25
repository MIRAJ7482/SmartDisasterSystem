const { MongoClient } = require("mongodb");
require("dotenv").config();

const client = new MongoClient(process.env.MONGO_URI);

async function run() {
  try {
    await client.connect();
    console.log("Connected!");
  } catch (e) {
    console.error(e);
  } finally {
    await client.close();
  }
}

run();