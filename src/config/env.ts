import dotenv from "dotenv";

dotenv.config();

export const { PORT, NODE_ENV, MONGO_DB_URI, COINGECKO_API_KEY } = {
  PORT: process.env.PORT,
  NODE_ENV: process.env.NEXT_PUBLIC_NODE_ENV,
  MONGO_DB_URI: `mongodb+srv://${process.env.MONGO_DB_USER_NAME}:${process.env.MONGO_DB_PASSWORD}@${process.env.MONGO_DB_CLUSTER}/?retryWrites=true&w=majority&appName=KoinX-Cluster`,
  COINGECKO_API_KEY: process.env.COINGECKO_API_KEY,
};
