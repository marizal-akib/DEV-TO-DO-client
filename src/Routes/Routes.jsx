import { createBrowserRouter } from "react-router-dom";
import Main from "../components/Layouts/Main";
import Home from "../components/Pages/Home/Home";
import Projects from "../components/Pages/Projects/Projects";
import Login from "../components/Auth/Login";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Main></Main>,
    children: [
      { path: "/", element: <Home></Home> },
      {
        path: "/projects",
        element: <Projects></Projects>,
      },
      {
        path: "/login",
        element: <Login></Login>,
      },
    ],
  },
]);
