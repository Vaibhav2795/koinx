import dotenv from "dotenv";

dotenv.config();

export const { PORT } = {
  PORT: process.env.PORT || 3000,
};
