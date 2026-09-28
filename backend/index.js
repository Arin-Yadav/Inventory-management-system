import express from "express";
import "dotenv/config";
import cors from "cors";
import connectToMongoDB from "./config/db.js";

import userRoutes from "./routes/user.route.js";
import productRoutes from "./routes/product.route.js";
import supplierRoutes from "./routes/supplier.route.js";
import categoryRoutes from "./routes/category.route.js";
import stockMovementRoutes from "./routes/stockMovement.route.js";

const app = express();
const PORT = process.env.PORT || 5000;

// MongoDB Connection
await connectToMongoDB();

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  cors({
    origin: process.env.FRONTEND_URL,
    credentials: true,
  }),
);

// Routes
app.use("/api/user", userRoutes);
app.use("/api/products", productRoutes);
app.use("/api/suppliers", supplierRoutes);
app.use("/api/categories", categoryRoutes);
app.use("/api/stockmovements", stockMovementRoutes);

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
