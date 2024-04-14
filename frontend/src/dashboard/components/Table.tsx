import React, { useEffect } from "react";

type TableProps = {
  name: string;
};

const Table: React.FC<TableProps> = ({ name }) => {
  return (
    <div className="w-full flex flex-col  items-center p-4 bg-gray-100 ring-1 ring-slate-900 rounded-md gap-2">
      <h1 className="text-xl text-slate-900 font-semibold">{name}</h1>
      <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            <th scope="col" className="py-3 px-6">
              col 1
            </th>
            <th scope="col" className="py-3 px-6">
              col 2
            </th>
            <th scope="col" className="py-3 px-6">
              col 3
            </th>
            <th scope="col" className="py-3 px-6">
              col 4
            </th>
          </tr>
        </thead>
        <tbody>
          <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
            <td className="py-4 px-6">col 1</td>
            <td className="py-4 px-6">col 2</td>
            <td className="py-4 px-6">col 3</td>
            <td className="py-4 px-6">col 4</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default Table;
