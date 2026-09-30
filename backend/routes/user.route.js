import express from "express";
import {
  handleCreateUser,
  handleUserDetails,
  handleUserLogin,
} from "../controllers/user.controller.js";
import { authMiddleware } from "../middlewares/auth.middleware.js";

const router = express.Router();

router.post("/register", handleCreateUser);
router.post("/login", handleUserLogin);
router.get("/me", authMiddleware, handleUserDetails)

export default router;
