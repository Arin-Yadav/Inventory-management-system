import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";
import InventoryContextProvider from "./context/InventoryContext.jsx";
import { ToastContainer } from "react-toastify";

createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <InventoryContextProvider>
      <ToastContainer />
      <App />
    </InventoryContextProvider>
  </BrowserRouter>,
);
