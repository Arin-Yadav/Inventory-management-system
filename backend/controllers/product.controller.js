import Product from "../models/product.model.js";
import StockMovement from "../models/stockMovement.model.js";
import Supplier from "../models/supplier.model.js";

// Create product
export const createProduct = async (req, res) => {
  try {
    const {
      sku,
      name,
      description,
      category,
      quantity,
      costPrice,
      sellingPrice,
      reorderLevel,
      unitOfMeasure,
      supplierId, // only used by Admin/Employee
    } = req.body.formData;

    const userId = req.user.id;
    const userRole = req.user.role;

    // Basic validations
    if (!sku || !name || !category || !costPrice || !sellingPrice) {
      return res
        .status(400)
        .json({ success: false, message: "Required fields are missing" });
    }
    if (quantity < 0) {
      return res
        .status(400)
        .json({ success: false, message: "Quantity cannot be negative" });
    }
    if (costPrice > sellingPrice) {
      return res
        .status(400)
        .json({
          success: false,
          message: "Selling price must be greater than cost price",
        });
    }

    // Check SKU uniqueness
    const existingProduct = await Product.findOne({ sku });
    if (existingProduct) {
      return res
        .status(400)
        .json({ success: false, message: "SKU already exists" });
    }

    let supplier;

    if (userRole === "Seller") {
      // Seller can only use their own supplier record
      supplier = await Supplier.findOne({ supplierId: userId });
      if (!supplier) {
        return res
          .status(403)
          .json({
            success: false,
            message: "Supplier not found or not authorized",
          });
      }
    } else {
      // Admin/Employee must provide supplierId explicitly
      if (!supplierId) {
        return res
          .status(400)
          .json({
            success: false,
            message: "SupplierId is required for Admin/Employee",
          });
      }
      supplier = await Supplier.findById(supplierId);
      if (!supplier) {
        return res
          .status(404)
          .json({ success: false, message: "Supplier not found" });
      }
    }

    // Create product
    const product = new Product({
      sku,
      name,
      description,
      category,
      quantity,
      costPrice,
      sellingPrice,
      supplier: supplier._id,
      reorderLevel,
      unitOfMeasure,
    });

    await product.save();

    // Update supplier's productsSupplied
    supplier.productsSupplied.push(product._id);
    await supplier.save();

    res.status(201).json({
      success: true,
      message: "Product created successfully",
      product,
    });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// Get all products
export const getProducts = async (req, res) => {
  try {
    const products = await Product.find().populate("category supplier");
    res.json(products);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Update stock with audit log
export const updateStock = async (req, res) => {
  try {
    const { productId, quantity, type, reason } = req.body;
    const userId = req.user.id;

    const product = await Product.findById(productId);
    if (!product) return res.status(404).json({ message: "Product not found" });

    if (type === "IN") product.quantity += quantity;
    if (type === "OUT") {
      if (product.quantity < quantity)
        return res.status(400).json({ message: "Not enough stock" });
      product.quantity -= quantity;
    }
    if (type === "ADJUSTMENT") product.quantity = quantity;

    await product.save();

    const movement = new StockMovement({
      product: productId,
      type,
      quantity,
      reason,
      performedBy: userId,
    });
    await movement.save();

    res.json({ message: "Stock updated", product });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
