import express from "express";
import { authMiddleware } from "../middlewares/auth.middleware.js";
import {
  createStockMovement,
  deleteStockMovementById,
  getProductMovements,
  getStockMovements,
} from "../controllers/stockMovement.controller.js";

const router = express.Router();

router.post("/", authMiddleware, createStockMovement);
router.get("/", authMiddleware, getStockMovements);
router.get("/:productId", authMiddleware, getProductMovements);
router.delete("/:id", authMiddleware, deleteStockMovementById);

export default router;
