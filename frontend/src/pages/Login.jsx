import { useContext, useState } from "react";
// import api from "../api/api";
import { useNavigate } from "react-router-dom";
import { RouteIndex } from "../helpers/RouteName";
import axios from "axios";
import { InventoryContext } from "../context/Context";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  // const [error, setError] = useState("");
  const navigate = useNavigate();

  const {backendURL, setToken} = useContext(InventoryContext)

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // const res = await api.post("/user/login", { email, password });
      const res = await axios.post(backendURL + "/user/login", {email, password})
      localStorage.setItem("token", res.data?.token);
      setToken(res.data?.token)
      navigate(RouteIndex);
    } catch (err) {
      console.log("Error: ", err)
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded shadow-md w-80">
        <h2 className="text-2xl font-bold mb-4 text-center">Login</h2>

        {/* {error && <p className="text-red-500 text-sm mb-2">{error}</p>} */}

        <input
          type="email"
          placeholder="Email"
          className="w-full p-2 mb-3 border rounded"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          className="w-full p-2 mb-3 border rounded"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button
          type="submit"
          className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600">
          Login
        </button>
      </form>
    </div>
  );
}
