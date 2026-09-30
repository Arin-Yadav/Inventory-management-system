import axios from "axios";
import { useContext, useState } from "react";
import { InventoryContext } from "../context/Context";
import { toast } from "react-toastify";

const CategoryForm = () => {
  const { backendURL, token, setCategories } = useContext(InventoryContext);

  const initialFormData = {
    name: "",
    description: "",
  };
  const [formData, setFormData] = useState(initialFormData);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        backendURL + "/categories",
        { formData },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      if (response.data.success) {
        const newCategory = response.data.category;
        setCategories((prev) => [...prev, newCategory]);
        setFormData(initialFormData);
        toast.success("Category added successfully");
      }
    } catch (error) {
      console.log("Error: ", error);
    }
  };
  return (
    <div className="max-w-3xl mx-auto p-6 bg-white shadow-md rounded-lg">
      <h2 className="text-2xl font-semibold mb-6 text-gray-800">
        Add new category
      </h2>
      <form onSubmit={handleSubmit} className="flex flex-col gap-6">
        <div className="w-full">
          <label className="block text-sm font-medium text-gray-700">
            Name
          </label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="mt-1 block w-full border rounded-md p-2"
          />
        </div>

        <div className="w-full">
          <label className="block text-sm font-medium text-gray-700">
            Description
          </label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            className="mt-1 block w-full border rounded-md p-2"
          />
        </div>

        <div className="md:col-span-2">
          <button
            type="submit"
            className="w-full bg-blue-600 cursor-pointer text-white py-2 px-4 rounded-md hover:bg-blue-700 transition">
            Add Category
          </button>
        </div>
      </form>
    </div>
  );
};

export default CategoryForm;
