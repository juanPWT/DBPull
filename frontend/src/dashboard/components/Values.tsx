import React from "react";
import NavTable from "./NavTable";
import { getTheme } from "../../utils/getTheme";

type ValuesProps = {
  id: number;
  table: string | null;
  column: Array<string> | undefined;
  values: Array<any> | undefined;
};

const Values: React.FC<ValuesProps> = ({ column, id, table, values }) => {
  return (
    <div
      className="w-full flex flex-col items-center p-4  rounded-md gap-2 break-words"
      style={{ backgroundColor: getTheme() }}
    >
      {table != null ? (
        <>
          <NavTable id={id} table={table ?? "undefined table"} />
          <div className="w-full overflow-x-auto">
            <table className="w-full text-xs text-center text-gray-500 dark:text-slate-100 p-4">
              <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-slate-900 dark:text-gray-400 ">
                <tr>
                  {column?.length !== 0 && column ? (
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
                {values?.length !== 0 ? (
                  values?.map((value, j) => {
                    return (
                      <tr
                        key={j}
                        className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
                      >
                        {column?.map((data, i) => {
                          return (
                            <td key={i} className="py-4 px-6 sm:px-4">
                              {value[`${data}`] ? (
                                String(value[`${data}`])
                              ) : value[`${data}`] === false ? (
                                <span className="font-light text-red-500">
                                  false
                                </span>
                              ) : value[`${data}`] === true ? (
                                <span className="font-light text-green-500">
                                  true
                                </span>
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
                    <td
                      className="py-4 px-6 sm:px-4 dark:text-slate-100"
                      colSpan={column?.length}
                    >
                      No data
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </>
      ) : (
        <div className="w-full text-sm flex justify-center items-center ">
          <h1 className="text-xl font-semibold text-slate-100">Choose table</h1>
        </div>
      )}
    </div>
  );
};

export default Values;
