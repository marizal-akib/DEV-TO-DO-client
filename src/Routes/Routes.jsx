import { createBrowserRouter } from "react-router-dom";
import Main from "../components/Layouts/Main";
import Home from "../components/Pages/Home/Home";
import Login from "../components/Auth/Login";
import SignUp from "../components/Auth/SignUp";
import Dashboard from "../components/Layouts/Dashboard";

import AllTask from "../components/Dash/AllTask/AllTask";
import Projects from "../components/Dash/Projects/Projects";
import PrivateRoutes from "./PrivateRoutes";
import AddProjects from "../components/Dash/Projects/AddProjects";
import AddTasks from "../components/Dash/AllTask/AddTasks";
import TaskUpdate from "../components/Dash/AllTask/TaskUpdate";

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
    element: (
      <PrivateRoutes>
        <Dashboard></Dashboard>,
      </PrivateRoutes>
    ),

    children: [
      {
        path: "add",
        element: (
          <PrivateRoutes>
            <AddProjects></AddProjects>,
          </PrivateRoutes>
        ),
      },
      {
        path: "tasks",
        element: (
          <PrivateRoutes>
            <AllTask></AllTask>,
          </PrivateRoutes>
        ),
      },
      {
        path: "projects",
        element: (
          <PrivateRoutes>
            <Projects></Projects>,
          </PrivateRoutes>
        ),
      },
      {
        path: "projects/addProjects",
        element: (
          <PrivateRoutes>
            <AddProjects></AddProjects>,
          </PrivateRoutes>
        ),
      },
      {
        path: "tasks/addTasks",
        element: (
          <PrivateRoutes>
            <AddTasks></AddTasks>,
          </PrivateRoutes>
        ),
      },
      {
        path: "update/:id",
        element: (
          <PrivateRoutes>
            <TaskUpdate></TaskUpdate>,
          </PrivateRoutes>
        ),
      },
      
    ],
  },
]);
