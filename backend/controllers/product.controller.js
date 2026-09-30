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
      supplier,
      reorderLevel,
      unitOfMeasure,
    } = req.body.formData;

    // Basic validations
    if (!sku || !name || !category || !costPrice || !sellingPrice) {
      return res.status(400).json({ message: "Required fields are missing" });
    }

    if (quantity < 0) {
      return res.status(400).json({ message: "Quantity cannot be negative" });
    }

    if (costPrice > sellingPrice) {
      return res
        .status(400)
        .json({ message: "Selling price must be greater than cost price" });
    }

    // Check SKU uniqueness
    const existingProduct = await Product.findOne({ sku });
    if (existingProduct) {
      return res.status(400).json({ message: "SKU already exists" });
    }

    // Check if supplier exists
    const supplierDoc = await Supplier.findById(supplier);
    if (!supplierDoc) {
      return res.status(404).json({ message: "Supplier not found" });
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
      supplier,
      reorderLevel,
      unitOfMeasure,
    });

    await product.save();
    // Updates Supplier's productSupplied list
    if (product.supplier) {
      await Supplier.findByIdAndUpdate(product.supplier, {
        $push: { productsSupplied: product._id },
      });
    }

    res.status(201).json({ message: "Product created successfully", product, success: true });
  } catch (err) {
    res.status(500).json({ message: err.message });
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
