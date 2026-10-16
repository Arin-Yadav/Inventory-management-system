import { useContext } from "react";
import { InventoryContext } from "../context/Context";
import { Link } from "react-router-dom";
import { RouteSuppliersForm } from "../helpers/RouteName";
import { Trash } from "lucide-react";
import axios from "axios";
import { toast } from "react-toastify";

export default function Suppliers() {
  const { suppliers, backendURL, token, setSuppliers } =
    useContext(InventoryContext);

  const handleDelete = async (id) => {
    try {
      const response = await axios.delete(`${backendURL}/suppliers/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.data.success) {
        toast.success(response.data.message);
        setSuppliers((prev) => prev.filter((s) => s._id !== id));
      }
    } catch (error) {
      console.log("Error: ", error);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Suppliers</h2>
        <Link
          to={RouteSuppliersForm}
          className="bg-green-500 text-white px-4 py-2 cursor-pointer rounded hover:bg-green-600">
          Add Supplier
        </Link>
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
              <th className="px-4 py-2 text-center">Action</th>
            </tr>
          </thead>
          <tbody>
            {suppliers.map((s) => (
              <tr key={s._id} className="border-t hover:bg-gray-50">
                <td className="px-4 py-2">{s.name}</td>
                <td className="px-4 py-2">{s.email}</td>
                <td className="px-4 py-2">{s.phone}</td>
                <td className="px-4 py-2">{s.address || "—"}</td>
                <td className="py-2 text-center">
                  <button
                    className="cursor-pointer hover:text-red-700"
                    onClick={() => handleDelete(s._id)}>
                    <Trash strokeWidth={1} size={16} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
