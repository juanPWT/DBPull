import React from "react";
import { Link, useLocation } from "react-router-dom";
import { CiSettings } from "react-icons/ci";
import { getTheme } from "../../utils/getTheme";

const NavbarPrimary = () => {
  const { pathname } = useLocation();

  return (
    <div
      className={`fixed top-0 w-full  flex justify-between items-center  shadow-sm py-3 px-2`}
      style={{ backgroundColor: `${getTheme()}` }}
    >
      <div className="flex items-center">
        <Link to={"/"} className="font-bold text-lg text-slate-100">
          DBPull
        </Link>
        <span className="rounded-full ring-1 p-2 text-sm mx-2 text-slate-100 ring-slate-100">
          DEV
        </span>
      </div>
      {pathname === "/" ? (
        <div className="flex items-center">
          <Link to={"/setting"} className="rounded-full p-2 hover:bg-slate-900">
            <CiSettings size={30} className="text-slate-100 text-lg" />
          </Link>
        </div>
      ) : null}
    </div>
  );
};

export default NavbarPrimary;
