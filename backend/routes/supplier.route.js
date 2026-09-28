import express from "express";
import { authMiddleware } from "../middlewares/auth.middleware.js";
import { createSupplier, getSuppliers } from "../controllers/supplier.controller.js";

const router = express.Router();

router.post("/", authMiddleware, createSupplier);
router.get("/", authMiddleware, getSuppliers);

export default router;
