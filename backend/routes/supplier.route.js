import express from "express";
import { authMiddleware } from "../middlewares/auth.middleware.js";
import { createSupplier, getSupplierProducts, getSuppliers } from "../controllers/supplier.controller.js";

const router = express.Router();

router.post("/", authMiddleware, createSupplier);
router.get("/", authMiddleware, getSuppliers);
router.get("/me/products", authMiddleware, getSupplierProducts);

export default router;
