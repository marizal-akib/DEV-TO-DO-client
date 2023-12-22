import { createBrowserRouter } from "react-router-dom";
import Main from "../components/Layouts/Main";
import Home from "../components/Pages/Home/Home";
import Login from "../components/Auth/Login";
import SignUp from "../components/Auth/SignUp";
import Dashboard from "../components/Layouts/Dashboard";
import AddProjects from "../components/Dash/AddProjects/AddProjects";
import AllTask from "../components/Dash/AllTask/AllTask";
import Projects from "../components/Dash/Projects/Projects";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Main></Main>,
    children: [
      { path: "/", element: <Home></Home> },
      
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
    element: <Dashboard></Dashboard>,

    children: [
      {
        path: "add",
        element: <AddProjects></AddProjects>,
      },
      {
        path: "tasks",
        element: <AllTask></AllTask>,
      },
      {
        path: "projects",
        element: <Projects></Projects>,
      },
    ],
  },
]);
