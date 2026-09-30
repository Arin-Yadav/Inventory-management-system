import Supplier from "../models/supplier.model.js";

// Create supplier
export const createSupplier = async (req, res) => {
  try {
    // const supplier = new Supplier(req.body);
    const { name, email, phone, address, productsSupplied } = req.body.formData;

    const supplier = new Supplier({
      name,
      email,
      phone,
      address,
      productsSupplied,
    });

    await supplier.save();
    res.status(201).json({
      success: true,
      supplier,
    });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Get all suppliers
export const getSuppliers = async (req, res) => {
  try {
    const suppliers = await Supplier.find().populate("productsSupplied");
    res.json(suppliers);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
