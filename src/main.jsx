import React from "react";
import { HelmetProvider } from "react-helmet-async";
import ReactDOM from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import "./index.css";
import { router } from "./Routes/Routes";
import AuthProvider from "./providers/AuthProviders";

ReactDOM.createRoot(document.getElementById("root")).render(
  <AuthProvider>

  <HelmetProvider>
    <React.StrictMode>
      <RouterProvider router={router} />
    </React.StrictMode>
  </HelmetProvider>
  </AuthProvider>
);
