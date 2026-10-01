import { useContext } from "react";
import { Link } from "react-router-dom";
import { InventoryContext } from "../context/Context";
import { RouteProductsForm } from "../helpers/RouteName";

export default function Products() {
  const { products } = useContext(InventoryContext);

  return (
    <div className="w-full space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Products</h2>
        <Link
          to={RouteProductsForm}
          className="bg-blue-500 text-white px-4 py-2 cursor-pointer rounded hover:bg-blue-600">
          Add Product
        </Link>
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
                <th className="px-4 py-2">SupplierId</th>
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
                  <td className="px-4 py-2">{p.supplier?.name || "-"}</td>
                  <td className="px-4 py-2">{p.supplier?.supplierId || "-"}</td>
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
    </div>
  );
}
