import React, { useEffect, useState } from "react";
import { GetAllTable } from "../../../wailsjs/go/main/App";
import { useQuery } from "../../utils/useQuery";
import { useNavigate, useLocation } from "react-router-dom";
import toast from "react-hot-toast";

type TableProps = {
  name: string;
  onClick?: () => void;
};

type SidebarProps = {
  id: number;
};

const Sidebar: React.FC<SidebarProps> = ({ id }) => {
  const [tables, setTables] = useState<Array<string>>([]);
  const nameConfig = useQuery().get("db");
  const platfrom = useQuery().get("platfrom");
  const navigate = useNavigate();
  const { pathname } = useLocation();

  useEffect(() => {
    GetAllTable(id).then((res: Array<string>) => {
      if (res === null) {
        navigate("/");
        toast.error("cant connect to database");
      }

      if (res.length !== 0) setTables(res);
    });
  }, [id, GetAllTable]);

  const getValues = (table: string) => {
    const to = `${pathname}?db=${nameConfig}&platfrom=${platfrom}&table=${table}`;
    navigate(to);
  };

  return (
    <div className="w-full rounded-md ring-1 ring-slate-900 bg-gray-100 p-3 hidden md:flex flex-col max-w-xs dark:bg-slate-900">
      <h1 className="text-lg font-semibold dark:text-slate-100">
        {nameConfig}
      </h1>
      <div className="mt-2 w-full grid grid-cols-1 gap-2 ">
        {tables.length === 0 ? (
          <div className="text-center dark:text-slate-100">No tables</div>
        ) : (
          tables.map((table, i) => {
            return (
              <ButtonTable
                key={i}
                name={table}
                onClick={() => getValues(table)}
              />
            );
          })
        )}
      </div>
    </div>
  );
};

const ButtonTable: React.FC<TableProps> = ({ name, onClick }) => {
  return (
    <button
      type="button"
      onClick={onClick}
      className="w-full flex justify-between items-center bg-white p-2 hover:bg-gray-200 rounded-md dark:bg-slate-700 dark:text-slate-100 dark:hover:bg-slate-800 dark:hover:text-slate-100"
    >
      <div className="text-sm">{name}</div>
    </button>
  );
};
export default Sidebar;
