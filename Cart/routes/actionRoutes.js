import express from "express";
import { addToCart } from "../controllers/actionController.js";
const router = express.Router();

router.use(express.json());

router.post("/", addToCart);

export default router;
