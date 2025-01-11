import { Document } from "mongoose";

export interface ICryptoData extends Document {
  coin: string;
  price: number;
  marketCap: number;
  change24h: number;
  timestamp: Date;
}

export interface ErrorResponse {
  statusCode: number;
  message: string;
}

export interface CoinData {
  id: string;
  current_price: number;
  market_cap: number;
  price_change_24h: number;
}
