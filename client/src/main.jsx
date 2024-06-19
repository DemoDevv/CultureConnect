import React from "react";
import ReactDOM from "react-dom/client";

import "./index.css";

import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";

import Vitrine from "./routes/vitrine.jsx";
import ErrorPage from "./error-page.jsx";

import Login from "./routes/auth/login.jsx";
import Register from "./routes/auth/register.jsx";
import { AuthProvider } from "./components/AuthProvider.jsx";

import Home from "./routes/home.jsx";
import RequireAuth from "./components/RequireAuth.jsx";

import constants from "./constants/development.js";

/*
See the documentation for more information:
https://reactrouter.com/en/main/start/tutorial
*/
const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="/" element={<Vitrine />} errorElement={<ErrorPage />} />
      <Route path="/login" element={<Login />} errorElement={<ErrorPage />} />
      <Route
        path="/register"
        element={<Register />}
        errorElement={<ErrorPage />}
      />
      <Route
        path="home"
        element={
          constants.DEVELOPMENT ? (
            <Home />
          ) : (
            <RequireAuth>
              <Home />
            </RequireAuth>
          )
        }
        errorElement={<ErrorPage />}
      />
    </>,
  ),
);

ReactDOM.createRoot(document.getElementById("root")).render(
	<React.StrictMode>
		<AuthProvider>
			<RouterProvider router={router} />
		</AuthProvider>
	</React.StrictMode>,
);
