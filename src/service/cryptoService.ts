import { createErrorResponse } from "../helper/errorHelper";
import cryptoDataModel from "../models/cryptoDataModel";

export const getCryptoStats = async (coin: string | undefined) => {
  if (!coin) {
    throw createErrorResponse(
      400,
      "Coin name is required in query parameters."
    );
  }

  const latestData = await cryptoDataModel
    .findOne({ coin })
    .sort({ timestamp: -1 });

  if (!latestData) {
    throw createErrorResponse(404, "No data found for the given coin.");
  }

  return {
    price: latestData.price,
    marketCap: latestData.marketCap,
    "24hChange": latestData.change24h,
  };
};
