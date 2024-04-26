import React from "react";
import { useQuery } from "../../utils/useQuery";
import {
  GetColumnTable,
  GetValuesTable,
  GetTypeColumn,
} from "../../../wailsjs/go/main/App";
import toast from "react-hot-toast";
import Values from "./Values";
import Structure from "./Structure";
import ModalAddValue from "./ModalAddValue";
import { useQuery as query } from "react-query";

type TableProps = {
  id: number;
};

export type ColumnType = {
  column: string;
  type: string;
};

const Table: React.FC<TableProps> = ({ id }) => {
  const table = useQuery().get("table");
  const nav = useQuery().get("nav");

  // query
  const { data: column } = query(["getColumnTable", table, id], async () => {
    if (table == null) return [];
    const res: Array<string> = await GetColumnTable(table, id);
    if (res != null) {
      return res;
    } else {
      toast.error("error: failed to read, chack your database");
      return [];
    }
  });

  const { data: values } = query(["getValueTable", table, id], async () => {
    if (table == null) return [];
    const res: Array<any> = await GetValuesTable(table, id);
    if (res != null) {
      return res;
    } else {
      toast.error("error: failed to read, chack your database");
      return [];
    }
  });

  const { data: columnType } = query(["getColumnType", table, id], async () => {
    if (table == null) return [];
    const res: Array<ColumnType> = await GetTypeColumn(table, id);
    if (res != null) {
      return res;
    } else {
      toast.error("error: failed to read, chack your database");
      return [];
    }
  });

  if (nav === "values" || nav === null) {
    return (
      <div className="w-full overflow-x-auto">
        {table != null && (nav === "values" || nav === null) ? (
          <ModalAddValue table={table} columns={columnType} id={id} />
        ) : null}
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
