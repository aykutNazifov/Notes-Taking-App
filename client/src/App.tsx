import { Navigate, RouterProvider, createBrowserRouter } from "react-router-dom";

import { ToastContainer } from 'react-toastify';

import LandingPage from "./pages/LandingPage";
import NotesPage from "./pages/NotesPage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import Layout from "./components/Layout";
import { useAuth } from "./hooks/useAuth";
import { useEffect, useState } from "react";
import apiClient from "./utils/apiClient";
import Loading from "./components/Loading";

function App() {
  const [loading, setLoading] = useState(false)
  const { user, setUser } = useAuth()

  const checkUser = async () => {
    try {
      setLoading(true)
      const res = await apiClient("/auth/user")

      if (res.data.user) {
        setUser(res.data.user)
      }
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    checkUser()
  }, [])

  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
      children: [
        {
          path: "/",
          element: user ? <Navigate to={"/notes"} /> : <LandingPage />,
        },
        {
          path: "/notes",
          element: user ? <NotesPage /> : <Navigate to={"/"} />,
        },
        {
          path: "/login",
          element: user ? <Navigate to={"/notes"} /> : <LoginPage />,
        },
        {
          path: "/register",
          element: user ? <Navigate to={"/notes"} /> : <RegisterPage />,
        },
      ]
    }
  ]);

  return (
    <div>
      {loading ? <div className="w-screen h-screen"><Loading /></div> : (
        <RouterProvider router={router} />
      )}
      <ToastContainer position="bottom-right" />
    </div>
  )
}

export default App
