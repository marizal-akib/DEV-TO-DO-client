import { Helmet } from "react-helmet-async";
import DashNav from "../Common/DashNav";
import { Outlet } from "react-router-dom";

const Dashboard = () => {
  return (
    <>
      <Helmet>
        <title>TO-DO Board</title>
      </Helmet>
      <div className="flex">
      <DashNav></DashNav>
      
      <Outlet></Outlet>

      </div>
    </>
  );
};

export default Dashboard;
