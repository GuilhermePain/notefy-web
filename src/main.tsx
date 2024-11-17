import * as React from "react";
import * as ReactDOM from "react-dom/client";
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import "./index.css";
import LandingPage from "./pages/LandingPage";
import Login from "./pages/Login";
import Register from "./pages/Register";
import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPassword";
import MyNotes from "./pages/MyNotes";
import MyNotesWrite from "./pages/MyNotesWrite";
import { Toaster } from "sonner";

const router = createBrowserRouter([
  {
    path: "/",
    element: <LandingPage />,
  },
  {
    path: "/entrar",
    element: <Login />,
  },
  {
    path: "/cadastro",
    element: <Register />,
  },
  {
    path: "/esqueceusuasenha",
    element: <ForgotPassword />
  },
  {
    path: "/redefinirsenha",
    element: <ResetPassword />
  },
  {
    path: "/minhasnotas",
    element: <MyNotes />
  },
  {
    path: "minhasnotas/:id",
    element: <MyNotesWrite />
  }
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
    <Toaster position="top-center" toastOptions={{
      style: {
        background: '#6F3AB6',
        color: 'white'
      }
    }}
    />
  </React.StrictMode>
);