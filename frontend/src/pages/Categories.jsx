import { useContext } from "react";
import { InventoryContext } from "../context/Context";
import { Link } from "react-router-dom";
import { RouteCategoriesForm } from "../helpers/RouteName";
import axios from "axios";
import { toast } from "react-toastify";
import { Trash } from "lucide-react";

export default function Categories() {
  const { categories, backendURL, setCategories, token } =
    useContext(InventoryContext);

  const handleDelete = async (id) => {
    try {
      const response = await axios.delete(`${backendURL}/categories/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.data.success) {
        toast.success(response.data.message);
        setCategories((prev) => prev.filter((c) => c._id !== id));
      }
    } catch (error) {
      console.log("Error: ", error);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Categories</h2>
        <Link
          to={RouteCategoriesForm}
          className="bg-purple-500 text-white px-4 py-2 cursor-pointer rounded hover:bg-purple-600">
          Add Category
        </Link>
      </div>

      {/* Table */}
      <div className="overflow-x-auto bg-white shadow rounded">
        <table className="min-w-full text-sm text-left">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-4 py-2">Name</th>
              <th className="px-4 py-2">Description</th>
              <th className="px-4 py-2 text-center">Action</th>
            </tr>
          </thead>
          <tbody>
            {categories.map((c) => (
              <tr key={c._id} className="border-t hover:bg-gray-50">
                <td className="px-4 py-2">{c.name}</td>
                <td className="px-4 py-2">{c.description || "—"}</td>
                <td className="py-2 text-center">
                  <button
                    className="cursor-pointer hover:text-red-700"
                    onClick={() => handleDelete(c._id)}>
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
