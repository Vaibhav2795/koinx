import axios from "axios";
import schedule from "node-schedule";

import { CoinData } from "../interface/index";
import { COINGECKO_API_KEY } from "../config/env";
import cryptoDataModel from "../models/cryptoDataModel";

const COINGECKO_URL = `https://api.coingecko.com/api/v3/coins/markets`;

const COINS = ["bitcoin", "matic-network", "ethereum"];
const COIN_Ids = COINS.join(",");
const VS_COIN = "usd";
const COIN_PARAMS = `vs_currency=${VS_COIN}&ids=${COIN_Ids}`;

export const startCryptoDataJob = () => {
  schedule.scheduleJob("0 0 */2 * * *", async () => {
    try {
      const options = {
        method: "GET",
        headers: {
          accept: "application/json",
          "x-cg-demo-api-key": COINGECKO_API_KEY,
        },
      };
      const { data } = await axios.get(
        `${COINGECKO_URL}?${COIN_PARAMS}`,
        options
      );

      const cryptoData = data.map((coinData: CoinData) => ({
        coin: coinData.id,
        price: coinData.current_price,
        marketCap: coinData.market_cap,
        change24h: coinData.price_change_24h,
      }));

      if (cryptoData.length > 0) {
        let attempts = 0;
        let success = false;

        while (attempts < 3 && !success) {
          try {
            await cryptoDataModel.insertMany(cryptoData);
            console.log(
              `Crypto data successfully fetched and stored at ${new Date().toISOString()}`
            );
            success = true;
          } catch (error) {
            attempts++;
            console.error(`Attempt ${attempts} failed:`, error);
            if (attempts < 3) {
              console.log("Retrying...");
            }
          }
        }

        if (!success) {
          console.error("Failed to insert data after 3 attempts.");
        }
      } else {
        console.log("No data fetched.");
      }
    } catch (err) {
      console.log(err);
    }
  });
};
