import { useEffect, useState } from "react";
import api from "../api/api";

export default function StockMovements() {
  const [movements, setMovements] = useState([]);
  const [products, setProducts] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    product: "",
    type: "IN",
    quantity: 0,
    reason: "",
  });

  // Fetch movements + products
  useEffect(() => {
    const fetchData = async () => {
      const [movementsRes, productsRes] = await Promise.all([
        api.get("/stockmovements"),
        api.get("/products"),
      ]);
      setMovements(movementsRes.data);
      setProducts(productsRes.data);
    };
    fetchData();
  }, []);

  // Handle form input
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Submit new movement
  const handleSubmit = async (e) => {
    e.preventDefault();
    await api.post("/stockmovements", formData);
    setShowModal(false);
    const res = await api.get("/stockmovements");
    setMovements(res.data);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Stock Movements</h2>
        <button
          onClick={() => setShowModal(true)}
          className="bg-indigo-500 text-white px-4 py-2 rounded hover:bg-indigo-600">
          + Record Movement
        </button>
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
            {movements.map((m) => (
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

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-100 bg-opacity-40">
          <div className="bg-white p-6 rounded shadow-lg w-full max-w-md">
            <h3 className="text-xl font-semibold mb-4">
              Record Stock Movement
            </h3>
            <form onSubmit={handleSubmit} className="space-y-3">
              {/* Product dropdown */}
              <select
                name="product"
                value={formData.product}
                onChange={handleChange}
                className="w-full border p-2 rounded">
                <option value="">Select Product</option>
                {products.map((p) => (
                  <option key={p._id} value={p._id}>
                    {p.name} (SKU: {p.sku})
                  </option>
                ))}
              </select>

              {/* Movement type */}
              <select
                name="type"
                value={formData.type}
                onChange={handleChange}
                className="w-full border p-2 rounded">
                <option value="IN">IN (Add Stock)</option>
                <option value="OUT">OUT (Remove Stock)</option>
                <option value="ADJUSTMENT">ADJUSTMENT</option>
              </select>

              {/* Quantity */}
              <input
                type="number"
                name="quantity"
                placeholder="Quantity"
                value={formData.quantity}
                onChange={handleChange}
                className="w-full border p-2 rounded"
              />

              {/* Reason */}
              <input
                type="text"
                name="reason"
                placeholder="Reason"
                value={formData.reason}
                onChange={handleChange}
                className="w-full border p-2 rounded"
              />

              <button
                type="submit"
                className="w-full bg-indigo-500 text-white py-2 rounded hover:bg-indigo-600">
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

// This is the stockmovement form which use product id instead of prodcut name
// import { useEffect, useState } from "react";
// import api from "../api/api";

// export default function StockMovements() {
//   const [movements, setMovements] = useState([]);
//   const [showModal, setShowModal] = useState(false);
//   const [formData, setFormData] = useState({
//     product: "",
//     type: "IN",
//     quantity: 0,
//     reason: "",
//   });

//   // Fetch movements
//   useEffect(() => {
//     const fetchMovements = async () => {
//       const res = await api.get("/stockmovements");
//       setMovements(res.data);
//     };
//     fetchMovements();
//   }, []);

//   // Handle form input
//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   // Submit new movement
//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     await api.post("/stockmovements", formData);
//     setShowModal(false);
//     const res = await api.get("/stockmovements");
//     setMovements(res.data);
//   };

//   return (
//     <div className="space-y-6">
//       {/* Header */}
//       <div className="flex justify-between items-center">
//         <h2 className="text-2xl font-bold">Stock Movements</h2>
//         <button
//           onClick={() => setShowModal(true)}
//           className="bg-indigo-500 text-white px-4 py-2 rounded hover:bg-indigo-600">
//           + Record Movement
//         </button>
//       </div>

//       {/* Table */}
//       <div className="overflow-x-auto bg-white shadow rounded">
//         <table className="min-w-full text-sm text-left">
//           <thead className="bg-gray-100">
//             <tr>
//               <th className="px-4 py-2">Product</th>
//               <th className="px-4 py-2">Type</th>
//               <th className="px-4 py-2">Quantity</th>
//               <th className="px-4 py-2">Reason</th>
//               <th className="px-4 py-2">Performed By</th>
//               <th className="px-4 py-2">Date</th>
//             </tr>
//           </thead>
//           <tbody>
//             {movements.map((m) => (
//               <tr key={m._id} className="border-t hover:bg-gray-50">
//                 <td className="px-4 py-2">{m.product?.name || "—"}</td>
//                 <td className="px-4 py-2">
//                   <span
//                     className={`px-2 py-1 rounded text-white ${
//                       m.type === "IN"
//                         ? "bg-green-500"
//                         : m.type === "OUT"
//                           ? "bg-red-500"
//                           : "bg-yellow-500"
//                     }`}>
//                     {m.type}
//                   </span>
//                 </td>
//                 <td className="px-4 py-2">{m.quantity}</td>
//                 <td className="px-4 py-2">{m.reason}</td>
//                 <td className="px-4 py-2">{m.performedBy?.name || "—"}</td>
//                 <td className="px-4 py-2">
//                   {new Date(m.createdAt).toLocaleString()}
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>

//       {/* Modal */}
//       {showModal && (
//         <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40">
//           <div className="bg-white p-6 rounded shadow-lg w-full max-w-md">
//             <h3 className="text-xl font-semibold mb-4">
//               Record Stock Movement
//             </h3>
//             <form onSubmit={handleSubmit} className="space-y-3">
//               <input
//                 type="text"
//                 name="product"
//                 placeholder="Product ID"
//                 value={formData.product}
//                 onChange={handleChange}
//                 className="w-full border p-2 rounded"
//               />
//               <select
//                 name="type"
//                 value={formData.type}
//                 onChange={handleChange}
//                 className="w-full border p-2 rounded">
//                 <option value="IN">IN (Add Stock)</option>
//                 <option value="OUT">OUT (Remove Stock)</option>
//                 <option value="ADJUSTMENT">ADJUSTMENT</option>
//               </select>
//               <input
//                 type="number"
//                 name="quantity"
//                 placeholder="Quantity"
//                 value={formData.quantity}
//                 onChange={handleChange}
//                 className="w-full border p-2 rounded"
//               />
//               <input
//                 type="text"
//                 name="reason"
//                 placeholder="Reason"
//                 value={formData.reason}
//                 onChange={handleChange}
//                 className="w-full border p-2 rounded"
//               />
//               <button
//                 type="submit"
//                 className="w-full bg-indigo-500 text-white py-2 rounded hover:bg-indigo-600">
//                 Save
//               </button>
//               <button
//                 type="button"
//                 onClick={() => setShowModal(false)}
//                 className="w-full bg-gray-300 py-2 rounded hover:bg-gray-400">
//                 Cancel
//               </button>
//             </form>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }
