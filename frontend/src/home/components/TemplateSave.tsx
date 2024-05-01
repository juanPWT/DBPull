import React, { useEffect, useState } from "react";
import CardTemplate from "./CardTemplate";
import { Link, useNavigate } from "react-router-dom";
import { AllConfigDB, DeleteAllConfig } from "../../../wailsjs/go/main/App";
import toast from "react-hot-toast";
import { getTheme } from "../../utils/getTheme";

type configProps = {
  id: number;
  name: string;
  url: string;
  db: string;
};

const TemplateSave = () => {
  const [allConfig, setAllConfig] = useState<Array<configProps>>([]);
  const navigate = useNavigate();

  const handleClearAll = () => {
    DeleteAllConfig().then(() => {
      toast.success("clear all config");
      navigate(0);
    });
  };

  useEffect(() => {
    AllConfigDB().then((data: Array<configProps>) => {
      if (data.length !== 0) {
        setAllConfig(data);
      }
    });
  }, [AllConfigDB]);

  return (
    <div className="w-full bg-gray-200 shadow-md rounded-md  p-4 flex flex-col dark:bg-gray-800">
      <p className="text-sm text-slate-700 mt-1 dark:text-slate-100">
        Saving Template
      </p>
      <div className="w-full grid grid-cols-1 gap-3 my-3">
        {allConfig.length !== 0 ? (
          allConfig.map((data) => {
            return (
              <CardTemplate
                key={data.id}
                db={data.db}
                name={data.name}
                url={data.url}
                id={data.id}
              />
            );
          })
        ) : (
          <p className="text-center text-gray-500 dark:text-slate-100">
            create new conection now 😁
          </p>
        )}
      </div>
      <div className="w-full flex gap-4 justify-center my-4">
        <button
          type="button"
          onClick={handleClearAll}
          className={`p-3 font-bold text-white rounded-md shadow-md`}
          style={{
            backgroundColor: getTheme(),
          }}
        >
          clear all
        </button>
        <Link
          to={"/new-connection"}
          className={`p-3 font-bold bg-gray-700 text-white rounded-md shadow-md `}
          style={{
            border: `1px solid ${getTheme()}`,
          }}
        >
          New Connection
        </Link>
      </div>
    </div>
  );
};

export default TemplateSave;
