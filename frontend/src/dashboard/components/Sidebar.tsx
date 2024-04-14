import React, { useEffect, useState } from "react";
import { GetAllTable } from "../../../wailsjs/go/main/App";
import { useQuery } from "../../utils/useQuery";

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

  useEffect(() => {
    GetAllTable(id).then((res: Array<string>) => {
      if (res.length !== 0) setTables(res);
    });
  }, []);

  return (
    <div className="w-full rounded-md ring-1 ring-slate-900 bg-gray-100 p-3 flex flex-col max-w-xs">
      <h1 className="text-lg font-semibold">{nameConfig}</h1>
      <div className="mt-2 w-full grid grid-cols-1 gap-2 ">
        {tables.length === 0 ? (
          <div className="text-center">No tables</div>
        ) : (
          tables.map((table, i) => {
            return <ButtonTable key={i} name={table} />;
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
      className="w-full flex justify-between items-center bg-white p-2 hover:bg-gray-200"
    >
      <div className="text-sm">{name}</div>
      {/* <div className="text-sm">2</div> */}
    </button>
  );
};
export default Sidebar;
