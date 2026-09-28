import jwt from "jsonwebtoken";
import User from "../models/user.model.js";

// Verify JWT
export const authMiddleware = async (req, res, next) => {
  try {
    const authHeader = req.header("Authorization");
    if (!authHeader) {
      return res.status(401).json({ error: "Authorization header missing" });
    }

    const token = authHeader.replace("Bearer ", "").trim();
    if (!token)
      return res.status(401).json({ message: "You are Unauthorized" });

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = await User.findById(decoded.id).select("-passwordHash");

    if (!req.user) return res.status(401).json({ message: "Invalid token" });

    next();
  } catch (err) {
    res.status(401).json({ message: "Unauthorized" });
    console.log("Error", err);
  }
};

// Role-based access
export const roleMiddleware = (roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return res.status(403).json({ message: "Access denied" });
    }
    next();
  };
};
