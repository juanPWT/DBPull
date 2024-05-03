import React from "react";
import { MdOutlineDataset } from "react-icons/md";
import { AiFillDatabase } from "react-icons/ai";
import { LuRefreshCcw } from "react-icons/lu";
import { useNavigate, useLocation, Link } from "react-router-dom";
import { useQuery } from "../../utils/useQuery";
import { useQueryClient } from "react-query";
import SqlCodeEditor from "../../SQL/SqlCodeEditor";

type NavTableProps = {
  table: string;
  id: number;
};

const NavTable: React.FC<NavTableProps> = ({ id, table }) => {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const nameConfig = useQuery().get("db");
  const nav = useQuery().get("nav");
  const platfrom = useQuery().get("platfrom");
  const queryClient = useQueryClient();

  const clickNavigateTable = (nav: string) => {
    const to = `${pathname}?db=${nameConfig}&platfrom=${platfrom}&table=${table}&nav=${nav}`;
    navigate(to);
  };

  const refreshTable = () => {
    queryClient.invalidateQueries({
      queryKey: ["getColumnTable", table, id],
    });
    queryClient.invalidateQueries({
      queryKey: ["getValueTable", table, id],
    });
    queryClient.invalidateQueries({
      queryKey: ["getColumnType", table, id],
    });
  };

  return (
    <div className="w-full flex flex-col gap-3">
      <div className="w-full text-center">
        <h1 className="text-xl text-slate-100 font-semibold ">
          {nav === "values" || nav === null
            ? `values ${table}`
            : `structure ${table}`}
        </h1>
      </div>
      <div className="w-full p-2 flex justify-between bg-gray-200 rounded-md gap-3">
        <div className="flex items-center gap-2">
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
            <MdOutlineDataset size={14} />
          </button>
          <button
            type="button"
            onClick={() => clickNavigateTable("structure")}
            className={`rounded-md ${
              nav === "structure"
                ? " bg-gray-100 text-gray-600  "
                : "bg-gray-600 text-white"
            } p-2 ${
              nav === "values"
                ? "hover:bg-gray-600 hover:text-white"
                : "hover:bg-gray-100 hover:text-gray-600"
            } `}
          >
            <AiFillDatabase size={14} />
          </button>
        </div>

        <div className="flex items-center p-2 gap-2">
          <SqlCodeEditor />
          <button
            type="button"
            onClick={refreshTable}
            className="rounded-md bg-gray-600 text-gray-100 p-2 hover:bg-gray-100 hover:text-gray-600"
          >
            <LuRefreshCcw size={14} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default NavTable;
