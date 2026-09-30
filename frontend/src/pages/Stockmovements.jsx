import { useContext } from "react";
import { InventoryContext } from "../context/Context";
import { Link } from "react-router-dom";
import { RouteStockmovementsForm } from "../helpers/RouteName";

export default function StockMovements() {
  const { stockmovements } = useContext(InventoryContext);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Stock Movements</h2>
        <Link
          to={RouteStockmovementsForm}
          className="bg-indigo-500 text-white px-4 py-2 cursor-pointer rounded hover:bg-indigo-600">
          Record Movement
        </Link>
      </div>

      {/* Table */}
      <div className="overflow-x-auto bg-white shadow rounded">
        <table className="min-w-full text-sm text-left">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-4 py-2">Product</th>
              <th className="px-4 py-2">Type</th>
              <th className="px-4 py-2">Quantity</th>
              <th className="px-4 py-2">Reason</th>
              <th className="px-4 py-2">Performed By</th>
              <th className="px-4 py-2">Date</th>
            </tr>
          </thead>
          <tbody>
            {stockmovements.map((m) => (
              <tr key={m._id} className="border-t hover:bg-gray-50">
                <td className="px-4 py-2">{m.product?.name || "—"}</td>
                <td className="px-4 py-2">
                  <span
                    className={`px-2 py-1 rounded text-white ${
                      m.type === "IN"
                        ? "bg-green-500"
                        : m.type === "OUT"
                          ? "bg-red-500"
                          : "bg-yellow-500"
                    }`}>
                    {m.type}
                  </span>
                </td>
                <td className="px-4 py-2">{m.quantity}</td>
                <td className="px-4 py-2">{m.reason}</td>
                <td className="px-4 py-2">{m.performedBy?.name || "—"}</td>
                <td className="px-4 py-2">
                  {new Date(m.createdAt).toLocaleString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
