import { useEffect, useState } from "react";
import api from "../api/api";

export default function Suppliers() {
  const [suppliers, setSuppliers] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
  });

  // Fetch suppliers
  useEffect(() => {
    const fetchSuppliers = async () => {
      const res = await api.get("/suppliers");
      setSuppliers(res.data);
    };
    fetchSuppliers();
  }, []);

  // Handle form input
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Submit new supplier
  const handleSubmit = async (e) => {
    e.preventDefault();
    await api.post("/suppliers", formData);
    setShowModal(false);
    const res = await api.get("/suppliers");
    setSuppliers(res.data);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Suppliers</h2>
        <button
          onClick={() => setShowModal(true)}
          className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600">
          + Add Supplier
        </button>
      </div>

      {/* Table */}
      <div className="overflow-x-auto bg-white shadow rounded">
        <table className="min-w-full text-sm text-left">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-4 py-2">Name</th>
              <th className="px-4 py-2">Email</th>
              <th className="px-4 py-2">Phone</th>
              <th className="px-4 py-2">Address</th>
            </tr>
          </thead>
          <tbody>
            {suppliers.map((s) => (
              <tr key={s._id} className="border-t hover:bg-gray-50">
                <td className="px-4 py-2">{s.name}</td>
                <td className="px-4 py-2">{s.email}</td>
                <td className="px-4 py-2">{s.phone}</td>
                <td className="px-4 py-2">{s.address || "—"}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40">
          <div className="bg-white p-6 rounded shadow-lg w-full max-w-md">
            <h3 className="text-xl font-semibold mb-4">Add Supplier</h3>
            <form onSubmit={handleSubmit} className="space-y-3">
              <input
                type="text"
                name="name"
                placeholder="Supplier Name"
                value={formData.name}
                onChange={handleChange}
                className="w-full border p-2 rounded"
              />
              <input
                type="email"
                name="email"
                placeholder="Email"
                value={formData.email}
                onChange={handleChange}
                className="w-full border p-2 rounded"
              />
              <input
                type="text"
                name="phone"
                placeholder="Phone"
                value={formData.phone}
                onChange={handleChange}
                className="w-full border p-2 rounded"
              />
              <input
                type="text"
                name="address"
                placeholder="Address"
                value={formData.address}
                onChange={handleChange}
                className="w-full border p-2 rounded"
              />
              <button
                type="submit"
                className="w-full bg-green-500 text-white py-2 rounded hover:bg-green-600">
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
