import React from "react";
import ReactDOM from "react-dom/client";

import "./index.css";

import { createBrowserRouter, RouterProvider } from "react-router-dom";

import Vitrine from "./routes/vitrine.jsx";
import ErrorPage from "./error-page.jsx";

import Login from "./routes/auth/login.jsx";
import Register from "./routes/auth/register.jsx";
import { AuthProvider } from "./components/AuthProvider.jsx";

import Home from "./routes/home.jsx";

/*
See the documentation for more information:
https://reactrouter.com/en/main/start/tutorial
*/
const router = createBrowserRouter([
  {
    path: "/",
    element: <Vitrine />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/login",
    element: <Login />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/register",
    element: <Register />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/home",
    element: <Home />,
    errorElement: <ErrorPage />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  </React.StrictMode>,
);
