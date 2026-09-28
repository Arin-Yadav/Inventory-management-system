import express from "express";
import {
  handleCreateUser,
  handleUserLogin,
} from "../controllers/user.controller.js";

const router = express.Router();

router.post("/register", handleCreateUser);
router.post("/login", handleUserLogin);

export default router;
