import React, { useEffect, useState } from "react";
import { useQuery } from "../../utils/useQuery";
import { GetColumnTable, GetValuesTable } from "../../../wailsjs/go/main/App";
import toast from "react-hot-toast";

type TableProps = {
  id: number;
};

const Table: React.FC<TableProps> = ({ id }) => {
  const [column, setColumn] = useState<Array<string>>([]);
  const [values, setValues] = useState<Array<any>>([]);
  const table = useQuery().get("table");

  useEffect(() => {
    if (table != null) {
      // get column
      GetColumnTable(table, id).then((res: Array<string>) => {
        if (res != null) {
          setColumn(res);
        } else {
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
    }
  }, [table, GetColumnTable, GetValuesTable, id]);

  return (
    <div className="w-full overflow-x-auto">
      <div className="w-full flex flex-col items-center p-4 bg-gray-100 rounded-md gap-2 break-words">
        <h1 className="text-xl text-slate-900 font-semibold">{table}</h1>
        {table != null ? (
          <div className="w-full overflow-x-auto">
            <table className="w-full text-xs text-center text-gray-500 dark:text-gray-400 p-4">
              <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400 ">
                <tr>
                  {column.length !== 0 && column ? (
                    column.map((data, i) => {
                      return (
                        <th key={i} scope="col" className="py-3 px-6">
                          {data}
                        </th>
                      );
                    })
                  ) : (
                    <th scope="col" className="py-3 px-6">
                      No Column Table
                    </th>
                  )}
                </tr>
              </thead>
              <tbody>
                {values.length !== 0 ? (
                  values.map((value, j) => {
                    return (
                      <tr
                        key={j}
                        className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
                      >
                        {column.map((data, i) => {
                          return (
                            <td key={i} className="py-4 px-6 sm:px-4">
                              {value[`${data}`] ? (
                                value[`${data}`]
                              ) : (
                                <span className="font-light text-red-500">
                                  null
                                </span>
                              )}
                            </td>
                          );
                        })}
                      </tr>
                    );
                  })
                ) : (
                  <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                    <td className="py-4 px-6 sm:px-4" colSpan={column.length}>
                      No data
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="w-full text-sm flex justify-center items-center text-gray-500 dark:text-gray-400">
            <h1 className="text-xl font-semibold text-slate-900">
              Choose table
            </h1>
          </div>
        )}
      </div>
    </div>
  );
};

export default Table;
