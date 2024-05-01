import React from "react";

type TableResultProps = {
  Column: Array<string>;
  Data: Array<any> | undefined;
};

const TableResult: React.FC<TableResultProps> = ({ Column, Data }) => {
  return (
    <div className="w-full overflow-x-auto mt-5">
      <table className="w-full text-xs text-center text-gray-500 dark:text-slate-100 p-4">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-slate-900 dark:text-gray-400 ">
          <tr>
            {Column.map((data, i) => {
              return (
                <th key={i} scope="col" className="py-3 px-6">
                  {data}
                </th>
              );
            })}
          </tr>
        </thead>
        <tbody>
          {Data?.length !== 0 ? (
            Data?.map((value, i) => {
              return (
                <tr
                  key={i}
                  className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
                >
                  {Column.map((data, i) => {
                    return (
                      <td key={i} className="py-4 px-6 sm:px-4">
                        {value[`${data}`] ? (
                          String(value[`${data}`])
                        ) : value[`${data}`] === false ? (
                          <span className="font-light text-red-500">false</span>
                        ) : value[`${data}`] === true ? (
                          <span className="font-light text-green-500">
                            true
                          </span>
                        ) : (
                          <span className="font-light text-red-500">null</span>
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
                colSpan={Column?.length}
              >
                No data
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default TableResult;
