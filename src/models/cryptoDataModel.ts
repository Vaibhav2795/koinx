import mongoose, { Schema } from "mongoose";
import { ICryptoData } from "../interface";

const CryptoDataSchema: Schema = new Schema({
  coin: {
    type: String,
    required: true,
    enum: ["bitcoin", "matic-network", "ethereum"],
  },
  price: { type: Number, required: true },
  marketCap: { type: Number, required: true },
  change24h: { type: Number, required: true },
  timestamp: { type: Date, default: Date.now },
});

CryptoDataSchema.index({ coin: 1, timestamp: -1 });

export default mongoose.model<ICryptoData>("CryptoData", CryptoDataSchema);
