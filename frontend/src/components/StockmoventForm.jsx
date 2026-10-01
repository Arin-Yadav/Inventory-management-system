import axios from "axios";
import { useContext, useState } from "react";
import { InventoryContext } from "../context/Context";
import { toast } from "react-toastify";

const StockmovementForm = () => {
  const { backendURL, token, setStockmovements } = useContext(InventoryContext);

  const initialFormData = {
    productsku: "",
    type: "IN",
    quantity: 0,
    reason: "",
  };
  const [formData, setFormData] = useState(initialFormData);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        backendURL + "/stockmovements",
        { formData },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      if (response.data.success) {
        const newStockmovements = response.data?.movements;
        setStockmovements((prev) => [...prev, newStockmovements]);
        setFormData(initialFormData);
        toast.success("Stockmovement created successfully");
      }
    } catch (error) {
      console.log("Error: ", error);
    }
  };
  return (
    <div className="max-w-3xl mx-auto p-6 bg-white shadow-md rounded-lg">
      <h2 className="text-2xl font-semibold mb-6 text-gray-800">
        Add new Stockmovement
      </h2>
      <form onSubmit={handleSubmit} className="flex flex-col gap-6">
        {/* <div>
          <label className="block text-sm font-medium text-gray-700">
            Product id
          </label>
          <input
            type="text"
            name="product"
            value={formData.product}
            onChange={handleChange}
            className="mt-1 block w-full border rounded-md p-2"
          />
        </div> */}

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Product SKU (Stock keeping unit)
          </label>
          <input
            type="text"
            name="productsku"
            value={formData.product}
            onChange={handleChange}
            className="mt-1 block w-full border rounded-md p-2"
          />
        </div>

        {/* Product dropdown */}
        {/* <div>
          <label className="block text-sm font-medium text-gray-700">
            Product
          </label>
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
        </div> */}

        {/* Movement type */}
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Type
          </label>
          <select
            name="type"
            value={formData.type}
            onChange={handleChange}
            className="mt-1 block w-full border rounded-md p-2 cursor-pointer">
            <option value="IN">IN (Add Stock)</option>
            <option value="OUT">OUT (Remove Stock)</option>
            <option value="ADJUSTMENT">ADJUSTMENT</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Quantity
          </label>
          <input
            type="number"
            min={1}
            name="quantity"
            value={formData.quantity}
            onChange={handleChange}
            className="mt-1 block w-full border rounded-md p-2"
          />
        </div>

        <div className="w-full">
          <label className="block text-sm font-medium text-gray-700">
            Reason
          </label>
          <textarea
            name="reason"
            value={formData.reason}
            onChange={handleChange}
            className="mt-1 block w-full border rounded-md p-2"
          />
        </div>

        <div className="md:col-span-2">
          <button
            type="submit"
            className="w-full bg-blue-600 cursor-pointer text-white py-2 px-4 rounded-md hover:bg-blue-700 transition">
            Add Supplier
          </button>
        </div>
      </form>
    </div>
  );
};

export default StockmovementForm;
