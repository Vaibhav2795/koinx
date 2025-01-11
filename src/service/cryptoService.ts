import cryptoDataModel from "../models/cryptoDataModel";
import { createErrorResponse } from "../helper/errorHelper";
import { calculateStandardDeviation } from "../helper/utils";

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

export const getCryptoDeviation = async (coin: string | undefined) => {
  const records = await cryptoDataModel
    .find({ coin })
    .sort({ timestamp: -1 })
    .limit(100);

  const prices = records.map((record) => record.price);
  if (prices.length < 2) {
    throw createErrorResponse(400, "Not enough data to calculate deviation.");
  }

  return calculateStandardDeviation(prices);
};
