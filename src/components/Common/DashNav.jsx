import { useState } from "react";
import { MdOutlineArrowBackIos } from "react-icons/md";
import useAuth from "../../Hooks/useAuth";
import { NavLink } from "react-router-dom";

const DashNav = () => {
  const [open, setOpen] = useState(true);
  const { user, logOut } = useAuth();
  const handleLogout = () => {
    logOut()
      .then(() => {})
      .catch((error) => console.error(error));
  };
  const Menus = [
    {
      to: "tasks",
      title: "All task",
      src: "https://i.ibb.co/k59q5sJ/Screenshot-2023-12-22-105223-removebg-preview.png",
    },
    {
      to: "projects",
      title: "Project",
      src: "https://i.ibb.co/Hxvg23J/Screenshot-2023-12-22-095725-removebg-preview.png",
    },
    //   {to:"reminders", title: "Project", src: "https://i.ibb.co/Hxvg23J/Screenshot-2023-12-22-095725-removebg-preview.png", gap: true },
    // {onClick:"handleLogout", title: "Logout", src: "Setting", gap: true },
  ];

  return (
    <div className="flex">
      <div
        className={`${
          open ? "w-72" : "w-20 "
        } bg-gray-800 h-screen  p-5  pt-8 relative duration-300`}
      >
        <p
          onClick={() => setOpen(!open)}
          className={`absolute cursor-pointer -right-3 top-9 w-7 bg-slate-600 text-blue-400 border-blue-400
           border-2 rounded-full  ${!open && "rotate-180"}`}
        >
          <MdOutlineArrowBackIos />
        </p>

        <div className="flex  md:flex-row flex-col gap-x-4 items-center">
          {user ? (
            <img
              src={`${user?.photoURL}`}
              className={`w-36 cursor-pointer duration-500 ${
                open && "rotate-[360deg]"
              }`}
            />
          ) : (
            <span className="loading loading-spinner text-info"></span>
          )}
          <h1
            className={`text-blue-400 origin-left font-medium text-lg md:text-xl duration-200 ${
              !open && "scale-0"
            }`}
          >
            {user?.displayName}
          </h1>
        </div>
        <ul className="pt-6">
          {Menus.map((Menu, index) => (
            <NavLink
              to={`${Menu.to}`}
              key={index}
              className={`flex  rounded-md p-2 cursor-pointer hover:bg-light-white text-blue-400 text-sm items-center gap-x-4 
                  ${Menu.gap ? "mt-9" : "mt-2"} ${index === 0} `}
            >
              <img className="w-4" src={`${Menu.src}`} />
              <span className={`${!open && "hidden"} origin-left duration-200`}>
                {Menu.title}
              </span>
            </NavLink>
          ))}
          <button
            onClick={handleLogout}
            className={`flex  rounded-md p-2 cursor-pointer hover:bg-light-white text-blue-400 text-sm items-center gap-x-4 
                  mt-9 `}
          >
            <img
              className="w-4"
              src="https://i.ibb.co/vwKk87x/Screenshot-2023-12-22-173728-removebg-preview.png"
            />
            <span className={`${!open && "hidden"} origin-left duration-200`}>
              Logout
            </span>
          </button>
        </ul>
      </div>
    </div>
  );
};

export default DashNav;
