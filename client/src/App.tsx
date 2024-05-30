import { Navigate, RouterProvider, createBrowserRouter } from "react-router-dom";

import LandingPage from "./pages/LandingPage";
import NotesPage from "./pages/NotesPage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import Layout from "./components/Layout";

function App() {

  const user = false

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
      <RouterProvider router={router} />
    </div>
  )
}

export default App
