import React from "react";
import NavTable from "./NavTable";
import { ColumnType } from "./Table";

type StructureProps = {
  id: number;
  table: string | null;
  columnType: Array<ColumnType>;
};

const CardStructure = ({ column, type }: { column: string; type: string }) => {
  return (
    <div className="max-w-sm flex justify-between items-center p-3 ring-1 ring-slate-900 rounded-md shadow-md">
      <div className="flex gap-3 items-center">
        <span className="font-bold text-sm">{column}</span>
        <p className="font-light text-md">{type}</p>
      </div>
      <div className="flex items-center gap-3">
        <button type="button" className="text-sky-500 hover:underline text-sm">
          edit
        </button>
        <button type="button" className="text-red-500 hover:underline text-sm">
          drop
        </button>
      </div>
    </div>
  );
};

const Structure: React.FC<StructureProps> = ({ id, table, columnType }) => {
  return (
    <div className="w-full flex flex-col items-center p-4 bg-gray-100 rounded-md gap-2 break-words">
      <NavTable id={id} table={table ?? "undifined table"} />
      <div className="w-full overflow-x-auto">
        <div className="w-full bg-white grid grid-cols-1 gap-3 rounded-md p-3 shadow-md">
          {columnType.length !== 0 ? (
            columnType.map((data, i) => {
              return (
                <CardStructure key={i} column={data.column} type={data.type} />
              );
            })
          ) : (
            <div className="w-full flex justify-center">
              <h1>No Field in table please add field in this table</h1>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Structure;
