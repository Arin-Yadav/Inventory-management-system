import express from "express";
import { authMiddleware } from "../middlewares/auth.middleware.js";
import { createProduct, getProducts, updateStock } from "../controllers/product.controller.js";

const router = express.Router();

router.post("/", authMiddleware, createProduct);
router.get("/", authMiddleware, getProducts);
router.put("/stock", authMiddleware, updateStock);

export default router;
