import { useState } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import { AuthContextProvider, UserAuth } from "./context/AuthContext";
import "./index.css";
import UsersRoutes from "./routes/UsersRoutes";
import NonUsersRoutes from "./routes/NonUsersRoutes";

function App() {
  const { isLoggedOut } = UserAuth();

  return (
    <div>
      <NonUsersRoutes />
    </div>
  );
}

export default App;
