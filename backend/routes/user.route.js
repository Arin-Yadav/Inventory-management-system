import express from "express";
import {
  getAllUsers,
  handleCreateUser,
  handleDeleteUser,
  handleUserDetails,
  handleUserLogin,
} from "../controllers/user.controller.js";
import { authMiddleware } from "../middlewares/auth.middleware.js";

const router = express.Router();

router.post("/register", handleCreateUser);
router.post("/login", handleUserLogin);
router.get("/me", authMiddleware, handleUserDetails);
router.get("/", authMiddleware, getAllUsers);
router.delete("/:userId", authMiddleware, handleDeleteUser)

export default router;
