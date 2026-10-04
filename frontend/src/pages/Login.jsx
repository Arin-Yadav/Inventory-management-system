import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { RouteIndex, RouteRegister } from "../helpers/RouteName";
import { InventoryContext } from "../context/Context";
import { toast } from "react-toastify";
import axios from "axios";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  // const [error, setError] = useState("");
  const navigate = useNavigate();

  const { backendURL, setToken, setUser } = useContext(InventoryContext);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(backendURL + "/user/login", {
        email,
        password,
      });
      if (res.data.success) {
        localStorage.setItem("token", res.data?.token);
        setToken(res.data?.token);
        setUser(res.data?.user);
        navigate(RouteIndex);
        toast.success("Logged in successfully");
      }
    } catch (err) {
      toast.error(err.response.data.message || "Something went wrong");
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
          required
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          className="w-full p-2 mb-3 border rounded"
          value={password}
          required
          onChange={(e) => setPassword(e.target.value)}
        />

        <button
          type="submit"
          className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600">
          Login
        </button>

        <p className="text-sm w-full text-center mt-5">
          Didn't have an account?{" "}
          <Link to={RouteRegister} className="text-blue-500 hover:underline">
            Register now
          </Link>
        </p>
      </form>
    </div>
  );
}
