import express from "express";
import { PORT, MONGO_DB_URI } from "./config/env";
import connectDB from "./helper/db";
import { startCryptoDataJob } from "./jobs/fetchCryptoData";

const app = express();

app.use(express.json());

const startServer = async () => {
  try {
    await connectDB(MONGO_DB_URI);

    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });

    startCryptoDataJob();
  } catch (error) {
    process.exit(1);
  }
};

startServer();
