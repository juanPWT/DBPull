import React from "react";
import { Link } from "react-router-dom";

const NavbarPrimary = () => {
  return (
    <div className="fixed top-0 w-full  flex justify-between bg-gray-100 shadow-sm py-3 px-2">
      <div className="flex items-center">
        <Link to={"/"} className="font-bold text-lg text-slate-900">
          DBPull
        </Link>
        <span className="rounded-full ring-1 ring-red-400 text-red-400 p-2 text-sm mx-2">
          DEV
        </span>
      </div>
    </div>
  );
};

export default NavbarPrimary;
