import React from "react";
import NavTable from "./NavTable";
import { ColumnType } from "./Table";
import { getTheme } from "../../utils/getTheme";

type StructureProps = {
  id: number;
  table: string | null;
  columnType: Array<ColumnType> | undefined;
};

const CardStructure = ({ column, type }: { column: string; type: string }) => {
  return (
    <div className="max-w-sm flex justify-between items-center p-3 ring-1 ring-slate-900 rounded-md shadow-md dark:ring-slate-100 dark:text-slate-100">
      <div className="flex gap-3 items-center">
        <span className="font-bold text-sm">{column}</span>
        <p className="font-light text-md">{type}</p>
      </div>
      {/* <div className="flex items-center gap-3">
        <button type="button" className="text-sky-500 hover:underline text-sm">
          edit
        </button>
        <button type="button" className="text-red-500 hover:underline text-sm">
          drop
        </button>
      </div> */}
    </div>
  );
};

const Structure: React.FC<StructureProps> = ({ id, table, columnType }) => {
  return (
    <div
      className="w-full flex flex-col items-center p-4 rounded-md gap-2 break-words "
      style={{ backgroundColor: getTheme() }}
    >
      <NavTable id={id} table={table ?? "undefined table"} />
      <div className="w-full overflow-x-auto">
        <div className="w-full bg-white grid grid-cols-1 gap-3 rounded-md p-3 shadow-md dark:bg-slate-900">
          {columnType?.length !== 0 ? (
            columnType?.map((data, i) => {
              return (
                <CardStructure
                  key={i}
                  column={data.column}
                  type={data.type === "TINYINT" ? "BOOLEAN" : data.type}
                />
              );
            })
          ) : (
            <div className="w-full flex justify-center dark:text-slate-100">
              <h1>No Field in table please add field in this table</h1>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Structure;
