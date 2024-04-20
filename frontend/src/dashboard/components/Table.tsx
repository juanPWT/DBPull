import React, { useEffect, useState } from "react";
import { useQuery } from "../../utils/useQuery";
import {
  GetColumnTable,
  GetValuesTable,
  GetTypeColumn,
} from "../../../wailsjs/go/main/App";
import toast from "react-hot-toast";
import Values from "./Values";
import Structure from "./Structure";

type TableProps = {
  id: number;
};

export type ColumnType = {
  column: string;
  type: string;
};

const Table: React.FC<TableProps> = ({ id }) => {
  const [column, setColumn] = useState<Array<string>>([]);
  const [values, setValues] = useState<Array<any>>([]);
  const [columnType, setColumnTypes] = useState<Array<any>>([]);
  const table = useQuery().get("table");
  const nav = useQuery().get("nav");

  useEffect(() => {
    if (table != null) {
      // get column
      GetColumnTable(table, id).then((res: Array<string>) => {
        if (res != null) {
          setColumn(res);
        } else {
          setColumn([]);
          toast.error("error: failed to read, chack your database");
        }
      });
      // get value
      GetValuesTable(table, id).then((res: Array<any>) => {
        if (res != null) {
          setValues(res);
        } else {
          setValues([]);
        }
      });
      // get column type
      GetTypeColumn(table, id).then((res: Array<ColumnType>) => {
        if (res != null) {
          setColumnTypes(res);
        } else {
          setColumnTypes([]);
        }
      });
    }
  }, [table, GetColumnTable, GetValuesTable, id, GetTypeColumn]);

  if (nav === "values" || nav === null) {
    return (
      <div className="w-full overflow-x-auto">
        <Values column={column} id={id} table={table ?? null} values={values} />
      </div>
    );
  } else if (nav === "structure") {
    return (
      <div className="w-full overflow-x-auto">
        <Structure id={id} table={table} columnType={columnType} />
      </div>
    );
  }

  return null;
};

export default Table;
