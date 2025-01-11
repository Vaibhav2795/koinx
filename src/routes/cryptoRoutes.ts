import express from "express";
import { getStats } from "../controller/cryptoController";

const router = express.Router();

router.get("/stats", getStats);

export default router;
