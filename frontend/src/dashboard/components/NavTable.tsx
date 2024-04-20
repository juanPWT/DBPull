import React from "react";
import { MdOutlineDataset } from "react-icons/md";
import { AiFillDatabase } from "react-icons/ai";
import { useNavigate, useLocation } from "react-router-dom";
import { useQuery } from "../../utils/useQuery";

type NavTableProps = {
  table: string;
  id: number;
};

const NavTable: React.FC<NavTableProps> = ({ id, table }) => {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const nameConfig = useQuery().get("db");
  const nav = useQuery().get("nav");

  const clickNavigateTable = (nav: string) => {
    const to = `${pathname}?db=${nameConfig}&table=${table}&nav=${nav}`;
    navigate(to);
  };

  return (
    <div className="w-full flex flex-col gap-3">
      <div className="w-full text-center">
        <h1 className="text-xl text-slate-900 font-semibold">
          {nav === "values" || nav === null
            ? `values ${table}`
            : `structure ${table}`}
        </h1>
      </div>
      <div className="w-full p-2 flex justify-start bg-gray-200 rounded-md gap-3">
        <button
          type="button"
          onClick={() => clickNavigateTable("values")}
          className={`rounded-md ${
            nav === "values" || nav === null
              ? " bg-gray-100 text-gray-600"
              : "bg-gray-600 text-white"
          } p-2 ${
            nav === "values"
              ? "hover:bg-gray-600 hover:text-white"
              : "hover:bg-gray-100 hover:text-gray-600"
          } `}
        >
          <MdOutlineDataset size={10} />
        </button>
        <button
          type="button"
          onClick={() => clickNavigateTable("structure")}
          className={`rounded-md ${
            nav === "structure"
              ? " bg-gray-100 text-gray-600"
              : "bg-gray-600 text-white"
          } p-2 ${
            nav === "values"
              ? "hover:bg-gray-600 hover:text-white"
              : "hover:bg-gray-100 hover:text-gray-600"
          } `}
        >
          <AiFillDatabase size={10} />
        </button>
      </div>
    </div>
  );
};

export default NavTable;
