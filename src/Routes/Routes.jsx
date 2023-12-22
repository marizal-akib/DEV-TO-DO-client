import { createBrowserRouter } from "react-router-dom";
import Main from "../components/Layouts/Main";
import Home from "../components/Pages/Home/Home";
import Projects from "../components/Pages/Projects/Projects";
import Login from "../components/Auth/Login";
import SignUp from "../components/Auth/SignUp";

import AddProjects from "../components/Dash/AddProjects";
import Dashboard from "../components/Layouts/Dashboard";

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
      {
        path: "/signUp",
        element: <SignUp></SignUp>,
      },
    ],
  },
  {
    path: "dashboard",
    element:<Dashboard></Dashboard>,

    children:[{
      path:"add",
      element:<AddProjects></AddProjects>
    }]
  }
]);
