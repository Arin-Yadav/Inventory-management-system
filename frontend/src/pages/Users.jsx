import { useContext } from "react";
import { InventoryContext } from "../context/Context";
import { Trash } from "lucide-react";
import axios from "axios";
import { toast } from "react-toastify";

export default function Users() {
  const { allUsers, setAllUsers, backendURL, token } =
    useContext(InventoryContext);

  const handleDelete = async (userId) => {
    try {
      const response = await axios.delete(`${backendURL}/user/${userId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.data.success) {
        toast.success("User deleted successfully");
        setAllUsers((prev) => prev.filter((u) => u._id !== userId));
      }
    } catch (error) {
      console.log("Error: ", error);
    }
  };

  return (
    <div className="w-full space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Users</h2>
        {/* <Link
          to={RouteProductsForm}
          className="bg-blue-500 text-white px-4 py-2 cursor-pointer rounded hover:bg-blue-600">
          Add Product
        </Link> */}
      </div>

      {/* Table */}
      <div className="min-w-0 md:max-w-full overflow-x-auto shadow rounded">
        {allUsers.length > 0 ? (
          <table className="min-w-full text-sm text-left">
            <thead className="bg-gray-100">
              <tr>
                <th className="px-4 py-2">Name</th>
                <th className="px-4 py-2">Email</th>
                <th className="px-4 py-2">Role</th>
                <th className="px-4 py-2">Action</th>
              </tr>
            </thead>
            <tbody>
              {allUsers.map((user) => (
                <tr key={user._id} className="border-t hover:bg-gray-50">
                  <td className="px-4 py-2">{user.name}</td>
                  <td className="px-4 py-2">{user.email}</td>
                  <td className="px-4 py-2">{user.role}</td>
                  <td className="px-4 py-2">
                    <button
                      className="cursor-pointer hover:text-red-700"
                      onClick={() => handleDelete(user._id)}>
                      <Trash strokeWidth={1} size={16} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <div>
            <p className="p-6">No Users available</p>
          </div>
        )}
      </div>
    </div>
  );
}
