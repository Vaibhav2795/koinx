import { Request, Response } from "express";
import { getCryptoDeviation, getCryptoStats } from "../service/cryptoService";

interface QueryParams {
  coin?: string;
}

export const getStats = async (
  req: Request<{}, {}, {}, QueryParams>,
  res: Response
) => {
  try {
    const { coin } = req.query;

    const cryptoData = await getCryptoStats(coin);

    res.status(200).json(cryptoData);
  } catch (error: any) {
    res.status(error.statusCode || 500).json({ message: error.message });
  }
};

export const getDeviation = async (
  req: Request<{}, {}, {}, QueryParams>,
  res: Response
) => {
  try {
    const { coin } = req.query;

    const cryptoData = await getCryptoDeviation(coin);

    res.status(200).json({ deviation: cryptoData });
  } catch (error: any) {
    res.status(error.statusCode || 500).json({ message: error.message });
  }
};
