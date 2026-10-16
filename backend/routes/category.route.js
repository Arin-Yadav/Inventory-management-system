import express from "express";
import { authMiddleware } from "../middlewares/auth.middleware.js";
import {
  createCategory,
  deleteCategoryById,
  getCategories,
  updateCategory,
} from "../controllers/category.controller.js";

const router = express.Router();

router.post("/", authMiddleware, createCategory);
router.get("/", authMiddleware, getCategories);
router.put("/:id", authMiddleware, updateCategory);
router.delete("/:id", authMiddleware, deleteCategoryById);

export default router;
