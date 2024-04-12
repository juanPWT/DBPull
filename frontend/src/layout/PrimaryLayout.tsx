import React from "react";
import NavbarPrimary from "./components/NavbarPrimary";
import { Toaster } from "react-hot-toast";

type PrimaryLayoutProps = {
  children: React.ReactNode;
};

const PrimaryLayout: React.FC<PrimaryLayoutProps> = ({ children }) => {
  return (
    <div className="min-h-screen w-full flex flex-col ">
      <Toaster />
      <NavbarPrimary />
      <div className="w-full mt-20 px-5">{children}</div>
    </div>
  );
};

export default PrimaryLayout;
