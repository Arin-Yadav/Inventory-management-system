import Supplier from "../models/supplier.model.js";
import User from "../models/user.model.js";
import bcrypt from "bcrypt";

// Create supplier
export const createSupplier = async (req, res) => {
  try {
    const {
      name,
      // supplierId,
      email,
      password,
      phone,
      address,
      productsSupplied,
    } = req.body.formData;

    const isExists = await Supplier.findOne({ email });
    if (isExists) {
      return res.status(409).json({
        success: false,
        message: "Supplier already exists",
      });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new User({
      name,
      email,
      password: hashedPassword,
      role: "Seller",
    });

    await newUser.save();

    const supplier = new Supplier({
      name,
      email,
      phone,
      address,
      supplierId: newUser._id,
      productsSupplied,
      role: "Seller",
    });

    await supplier.save();

    res.status(201).json({
      success: true,
      supplier,
      user: newUser,
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

// Get all suppliers
export const getSupplierProducts = async (req, res) => {
  try {
    const id = req.user.id;

    const supplier = await Supplier.findOne({ supplierId: id }).populate(
      "productsSupplied",
    );

    // console.log(supplier)

    if (!supplier) {
      return res
        .status(404)
        .json({ success: false, message: "Supplier not found" });
    }

    // console.log(supplier.productsSupplied)

    res.status(200).json({
      success: true,
      products: supplier.productsSupplied,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: err.message });
  }
};

export const deleteSupplierById = async (req, res) => {
  try {
    const supplierId = req.params.id;

    const deletedSupplier = await Supplier.findByIdAndDelete(supplierId);

    if (!deletedSupplier) {
      return res
        .status(404)
        .json({ success: false, message: "Supplier not found" });
    }

    // Delete linked user if exists
    if (deletedSupplier.supplierId) {
      await User.findByIdAndDelete(deletedSupplier.supplierId);
    }

    res.status(200).json({
      success: true,
      message: "Supplier and linked user deleted successfully",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: error.message });
  }
};
