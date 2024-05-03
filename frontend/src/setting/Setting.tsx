import React from "react";
import PrimaryLayout from "../layout/PrimaryLayout";
import { Link } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";
import Theme from "./components/Theme";

const Setting = () => {
  return (
    <PrimaryLayout>
      <div className="w-full flex flex-col gap-5">
        <div className="w-full flex justify-between items-center">
          <Link to={"/"} className="text-sm text-slate-900 dark:text-slate-100">
            <FaArrowLeft size={20} />
          </Link>
          <h1 className="font-bold text-slate-900 text-lg dark:text-slate-100">
            Settings
          </h1>
        </div>
        <Theme />
      </div>
    </PrimaryLayout>
  );
};

export default Setting;
