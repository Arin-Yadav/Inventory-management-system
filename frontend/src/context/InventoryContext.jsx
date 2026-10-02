import { useEffect, useState } from "react";
import { InventoryContext } from "./Context";
import axios from "axios";

const backendURL = import.meta.env.VITE_API_URL;

const InventoryContextProvider = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [user, setUser] = useState({});
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [suppliers, setSuppliers] = useState([]);
  const [stockmovements, setStockmovements] = useState([]);
  const [allUsers, setAllUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  //   const token = localStorage.getItem("token");

  useEffect(() => {
    if (!token) return;

    const fetchProducts = async () => {
      try {
        const response = await axios.get(`${backendURL}/products`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setProducts(response.data);
      } catch (error) {
        console.log("Error:", error);
      }
    };

    fetchProducts();
  }, [token]);

  useEffect(() => {
    if (!token) return;

    const fetchCategories = async () => {
      try {
        const response = await axios.get(backendURL + "/categories", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setCategories(response.data);
      } catch (error) {
        console.log("Error: ", error);
      }
    };
    fetchCategories();
  }, [token]);

  useEffect(() => {
    if (!token) return;

    const fetchSuppliers = async () => {
      try {
        const response = await axios.get(backendURL + "/suppliers", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setSuppliers(response.data);
      } catch (error) {
        console.log("Error: ", error);
      }
    };
    fetchSuppliers();
  }, [token]);

  useEffect(() => {
    if (!token) return;

    const fetchStockmovements = async () => {
      try {
        const response = await axios.get(backendURL + "/stockmovements", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setStockmovements(response.data);
      } catch (error) {
        console.log("Error: ", error);
      }
    };
    fetchStockmovements();
  }, [token]);

  useEffect(() => {
    if (!token) {
      setLoading(false);
      return;
    }

    const fetchUser = async () => {
      try {
        const response = await axios.get(backendURL + "/user/me", {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (response.data.success) {
          setUser(response.data.user);
        } else {
          setUser(null);
        }
      } catch (error) {
        console.error("Error fetching user:", error);
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, [token]);

  useEffect(() => {
    if (!token) {
      setLoading(false);
      return;
    }

    const fetchAllUsers = async () => {
      try {
        const response = await axios.get(backendURL + "/user", {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (response.data.success) {
          setAllUsers(response.data.users);
        } else {
          setAllUsers(null);
        }
      } catch (error) {
        console.error("Error fetching users:", error);
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    fetchAllUsers();
  }, [token]);

  const value = {
    backendURL,
    products,
    setProducts,
    categories,
    setCategories,
    suppliers,
    setSuppliers,
    stockmovements,
    setStockmovements,
    token,
    setToken,
    user,
    setUser,
    loading,
    setLoading,
    allUsers,
    setAllUsers,
  };

  return (
    <InventoryContext.Provider value={value}>
      {children}
    </InventoryContext.Provider>
  );
};

export default InventoryContextProvider;
