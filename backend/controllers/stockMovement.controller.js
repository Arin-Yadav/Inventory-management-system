import StockMovement from "../models/stockMovement.model.js";
import Product from "../models/product.model.js";

// Create new stock movements
export const createStockMovement = async (req, res) => {
  const { product, type, quantity, reason } = req.body.formData;
  const userId = req.user.id;
  const newQuantity = Number(quantity)

  // Validate Product
  const productDoc = await Product.findById(product);
  if (!productDoc) {
    return res.status(404).json({ message: "Product not found" });
  }

  // Adjust Product Stock
  if (type === "IN") {
    productDoc.quantity += newQuantity;
  } else if (type === "OUT") {
    if (productDoc.quantity < newQuantity) {
      return res.status(400).json({ message: "Not enough stock" });
    }
    productDoc.quantity -= newQuantity;
  } else if (type === "ADJUSTMENT") {
    productDoc.quantity = quantity;
  }

  await productDoc.save();

  // Log Stock Movement
  const movements = await StockMovement.create({
    product,
    type,
    quantity,
    reason,
    performedBy: userId,
  });

  res.status(201).json({
    message: "Stock movement recorder",
    movements,
    product: productDoc,
    success: true
  });
};

// Get all stock movements
export const getStockMovements = async (req, res) => {
  try {
    const movements = await StockMovement.find()
      // .populate("product performedBy") // replaces the ObjectIds with full product and user documents.
      .populate({
        path: "product",
        select: "name sku supplier"
      })
      .populate({
        path: "performedBy",
        select: "name role"
      })
      .sort({ createdAt: -1 })
      .lean();
    res.json(movements);

    // Pagination
    // const { page = 1, limit = 20 } = req.query;
    // const movements = await StockMovement.find()
    //   .populate("product performedBy")
    //   .sort({ createdAt: -1 })
    //   .skip((page - 1) * limit)
    //   .limit(limit);

    // Allow filtering by product, type, or date range:
    // const { productId, type, startDate, endDate } = req.query;
    // const filter = {};
    // if (productId) filter.product = productId;
    // if (type) filter.type = type;
    // if (startDate && endDate)
    //   filter.createdAt = { $gte: startDate, $lte: endDate };

    // const movements = await StockMovement.find(filter)
    //   .populate("product performedBy")
    //   .sort({ createdAt: -1 });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get movements for a specific product
// export const getProductMovements = async (req, res) => {
//   try {
//     const { productId } = req.params;
//     const movements = await StockMovement.find({ product: productId })
//       .populate("performedBy")
//       .sort({ createdAt: -1 });
//     res.status(200).json({ movements });
//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// };

export const getProductMovements = async (req, res) => {
  try {
    const { productId } = req.params;
    const { startDate, endDate } = req.query;

    const filter = { product: productId };
    if (startDate && endDate) {
      filter.createdAt = { $gte: new Date(startDate), $lte: new Date(endDate) };
    }

    const movements = await StockMovement.find(filter)
      .populate({
        path: "performedBy",
        select: "name email role", // only include safe fields
      })
      .populate({
        path: "product",
        select: "sku name category", // optional: limit product fields too
      })
      .sort({ createdAt: -1 });

    res.json(movements);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
