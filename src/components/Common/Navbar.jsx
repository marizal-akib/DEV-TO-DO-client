import { Link, NavLink } from "react-router-dom";
import useAuth from "../../Hooks/useAuth";

const Navbar = () => {
  const { user } = useAuth();
  const nav = (
    <>
      <li className="text-blue-400 font-medium">
        <NavLink to={"/"}>Home</NavLink>
      </li>
      {/* <li className="text-blue-400 font-medium">
        <NavLink to={'/projects'} >Projects</NavLink>
      </li> */}
      <li className="text-blue-400 font-medium">
        <NavLink to={"/dashboard"}>Dashboard</NavLink>
      </li>
      <li className="text-blue-400 font-medium">
        <NavLink to={"/about"}>About</NavLink>
      </li>
    </>
  );
  return (
    <div className="navbar bg-base-100">
      <div className="navbar-start">
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />
            </svg>
          </div>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52"
          >
            {nav}
          </ul>
        </div>
        <Link
          to={"/"}
          className="btn bg-gray-800 text-blue-400 btn-ghost md:text-xl"
        >
          <span className="text-yellow-300 font-semibold">DEV</span> TO-DO
        </Link>
      </div>
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1">{nav}</ul>
      </div>
      <div className="navbar-end">
        {!user&&
        (
          <>
            <Link
              to={"/login"}
              className="btn rounded-none btn-xs md:btn-md bg-yellow-300 text-blue-400 text-sm"
            >
              Login
            </Link>
            <Link
              to={"/signUp"}
              className="btn rounded-none bg-blue-400 btn-xs md:btn-md text-white ml-3"
            >
              Sign-Up
            </Link>
          </>
        )}
      </div>
    </div>
  );
};

export default Navbar;
