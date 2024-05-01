import React, { useEffect, useState } from "react";
import PrimaryLayout from "../layout/PrimaryLayout";
import { useQuery } from "../utils/useQuery";
import { Link, useLocation } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";
import { useQuery as reactQuery } from "react-query";
import { RawQuery } from "../../wailsjs/go/main/App";
import TableResult from "./components/TableResult";
import toast from "react-hot-toast";

type RawRes = {
  status: string;
  data: Array<any>;
};

const ResultSQL = () => {
  const [column, setColumn] = useState<Array<string>>([]);
  const query = useQuery().get("query");
  const platfrom = useQuery().get("platfrom");
  const location = useLocation();

  const { data: result } = reactQuery(
    ["executeQuery", query],
    async () => {
      if (!query || !platfrom) return;
      const res: RawRes = await RawQuery(query);

      if (res.status.includes("Success")) {
        toast.success(res.status);

        if (res.data != null) {
          // get key object
          const key = Object.keys(res.data[0]);
          setColumn(key);

          return res;
        } else {
          const resultFalse: RawRes = {
            status: "Error but ok: maybe the data you want not exist",
            data: [],
          };

          return resultFalse;
        }
      } else if (res.status.includes("Error")) {
        toast.error(res.status);
        return res;
      }
    },
    { refetchOnWindowFocus: false }
  );

  return (
    <PrimaryLayout>
      <div className="w-full">
        <div className="w-full flex justify-between items-center">
          <Link
            to={location.state.prev}
            className="text-sm text-slate-900 dark:text-slate-100"
          >
            <FaArrowLeft size={20} />
          </Link>
        </div>
        <div className="w-full mt-10 bg-slate-100 rounded-md p-4 shadow-md flex dark:bg-slate-700">
          <p className="text-lg font-semibold dark:text-slate-100">
            {result?.status}, <span className="font-light">"{query}"</span>
          </p>
        </div>
        {result?.data.length !== 0 ? (
          <TableResult Column={column} Data={result?.data} />
        ) : (
          <div className="w-full mt-10 bg-slate-100 rounded-md p-4 shadow-md flex dark:bg-slate-700 justify-center">
            <p className="text-lg font-semibold dark:text-slate-100">No Data</p>
          </div>
        )}
      </div>
    </PrimaryLayout>
  );
};

export default ResultSQL;
