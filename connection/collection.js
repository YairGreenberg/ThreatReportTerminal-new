import { MongoClient } from "mongodb";
import "dotenv/config";

const mongodb_URL = process.env.CONNECTION;
const mongoDb_NAME = process.env.DB_NAME;

async function connecdMongoDb() {
  try {
    const client = new MongoClient(mongodb_URL);
    await client.connect();
    const db = client.db(mongoDb_NAME);
    console.log("connect successfully");
    return db;
  } catch (error) {
    console.error(`Error coonected to mongoDb: ${error}`);
  }
}

const dataBase = await connecdMongoDb()
export default dataBase;