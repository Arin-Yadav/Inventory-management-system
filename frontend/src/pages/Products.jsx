import { useContext, useState } from "react";
import api from "../api/api";
import { InventoryContext } from "../context/Context";

export default function Products() {
  const [showModal, setShowModal] = useState(false);

  const { products, setProducts, suppliers } = useContext(InventoryContext);

  const [formData, setFormData] = useState({
    sku: "",
    name: "",
    description: "",
    quantity: 0,
    costPrice: 0,
    sellingPrice: 0,
    reorderLevel: 10,
    unitOfMeasure: "pcs",
    category: "",
    supplier: "",
  });

  // Handle form input
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Submit new product
  const handleSubmit = async (e) => {
    e.preventDefault();
    await api.post("/products", formData);
    setShowModal(false);
    const res = await api.get("/products");
    setProducts(res.data);
  };

  return (
    <div className="w-full space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Products</h2>
        <button
          onClick={() => setShowModal(true)}
          className="bg-blue-500 text-white px-4 py-2 cursor-pointer rounded hover:bg-blue-600">
          Add Product
        </button>
      </div>

      {/* Table */}
      <div className="min-w-0 md:max-w-full overflow-x-auto shadow rounded">
        {products.length > 0 ? (
          <table className="min-w-full text-sm text-left">
            <thead className="bg-gray-100">
              <tr>
                <th className="px-4 py-2">SKU</th>
                <th className="px-4 py-2">Name</th>
                <th className="px-4 py-2">Quantity</th>
                <th className="px-4 py-2">Cost</th>
                <th className="px-4 py-2">Price</th>
                <th className="px-4 py-2">Supplier</th>
              </tr>
            </thead>
            <tbody>
              {products.map((p) => (
                <tr key={p._id} className="border-t hover:bg-gray-50">
                  <td className="px-4 py-2">{p.sku}</td>
                  <td className="px-4 py-2">{p.name}</td>
                  <td className="px-4 py-2">{p.quantity}</td>
                  <td className="px-4 py-2">₹{p.costPrice}</td>
                  <td className="px-4 py-2">₹{p.sellingPrice}</td>
                  <td className="px-4 py-2">{p.supplier?.name || "—"}</td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <div>
            <p className="p-6">No Products available</p>
          </div>
        )}
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-100 bg-opacity-40">
          <div className="bg-white p-6 rounded shadow-lg w-full max-w-md">
            <h3 className="text-xl font-semibold mb-4">Add Product</h3>
            <form onSubmit={handleSubmit} className="space-y-3">
              <input
                type="text"
                name="sku"
                placeholder="SKU"
                value={formData.sku}
                onChange={handleChange}
                className="w-full border p-2 rounded"
              />
              <input
                type="text"
                name="name"
                placeholder="Name"
                value={formData.name}
                onChange={handleChange}
                className="w-full border p-2 rounded"
              />
              <input
                type="number"
                name="quantity"
                placeholder="Quantity"
                value={formData.quantity}
                onChange={handleChange}
                className="w-full border p-2 rounded"
              />
              <input
                type="number"
                name="costPrice"
                placeholder="Cost Price"
                value={formData.costPrice}
                onChange={handleChange}
                className="w-full border p-2 rounded"
              />
              <input
                type="number"
                name="sellingPrice"
                placeholder="Selling Price"
                value={formData.sellingPrice}
                onChange={handleChange}
                className="w-full border p-2 rounded"
              />
              <select
                name="supplier"
                value={formData.supplier}
                onChange={handleChange}
                className="w-full border p-2 rounded">
                <option value="">Select Supplier</option>
                {suppliers.map((s) => (
                  <option key={s._id} value={s._id}>
                    {s.name} ({s.email})
                  </option>
                ))}
              </select>

              <button
                type="submit"
                className="w-full bg-blue-500 text-white py-2 rounded cursor-pointer hover:bg-blue-600">
                Save
              </button>
              <button
                type="button"
                onClick={() => setShowModal(false)}
                className="w-full bg-gray-300 py-2 rounded cursor-pointer hover:bg-gray-400">
                Cancel
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
