import { useState } from "react";
import api from "../api/api";
import { useContext } from "react";
import { InventoryContext } from "../context/Context";

export default function Categories() {
  const [showModal, setShowModal] = useState(false);

  const { categories, setCategories } = useContext(InventoryContext);

  const [formData, setFormData] = useState({
    name: "",
    description: "",
  });

  // Handle form input
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Submit new category
  const handleSubmit = async (e) => {
    e.preventDefault();
    await api.post("/categories", formData);
    setShowModal(false);
    const res = await api.get("/categories");
    setCategories(res.data);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Categories</h2>
        <button
          onClick={() => setShowModal(true)}
          className="bg-purple-500 text-white px-4 py-2 cursor-pointer rounded hover:bg-purple-600">
          Add Category
        </button>
      </div>

      {/* Table */}
      <div className="overflow-x-auto bg-white shadow rounded">
        <table className="min-w-full text-sm text-left">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-4 py-2">Name</th>
              <th className="px-4 py-2">Description</th>
            </tr>
          </thead>
          <tbody>
            {categories.map((c) => (
              <tr key={c._id} className="border-t hover:bg-gray-50">
                <td className="px-4 py-2">{c.name}</td>
                <td className="px-4 py-2">{c.description || "—"}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40">
          <div className="bg-white p-6 rounded shadow-lg w-full max-w-md">
            <h3 className="text-xl font-semibold mb-4">Add Category</h3>
            <form onSubmit={handleSubmit} className="space-y-3">
              <input
                type="text"
                name="name"
                placeholder="Category Name"
                value={formData.name}
                onChange={handleChange}
                className="w-full border p-2 rounded"
              />
              <input
                type="text"
                name="description"
                placeholder="Description"
                value={formData.description}
                onChange={handleChange}
                className="w-full border p-2 rounded"
              />
              {/* <select
                name="category"
                value={formData.category}
                onChange={handleChange}
                className="w-full border p-2 rounded">
                <option value="">Select Category</option>
                {categories.map((c) => (
                  <option key={c._id} value={c._id}>
                    {c.name}
                  </option>
                ))}
              </select> */}

              <button
                type="submit"
                className="w-full bg-purple-500 text-white py-2 rounded hover:bg-purple-600">
                Save
              </button>
              <button
                type="button"
                onClick={() => setShowModal(false)}
                className="w-full bg-gray-300 py-2 rounded hover:bg-gray-400">
                Cancel
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
