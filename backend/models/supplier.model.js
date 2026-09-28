import mongoose from "mongoose";

const supplierSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      required: true,
    },
    address: {
      type: String,
    },
    productsSupplied: [
      { type: mongoose.Schema.Types.ObjectId, ref: "Product" },
    ],
  },
  { timestamps: true },
);

const Supplier = mongoose.model("Supplier", supplierSchema);

export default Supplier;
