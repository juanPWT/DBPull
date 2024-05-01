import React from "react";
import { getTheme } from "../../utils/getTheme";

const Widget = () => {
  return (
    <div
      className={`w-full shadow-md rounded-md p-4 flex flex-col `}
      style={{
        backgroundColor: `${getTheme()}2A`,
        border: `1px solid ${getTheme()}`,
      }}
    >
      <h2 className="text-lg font-semibold text-slate-900 dark:text-slate-100">
        Welcome to DBPull
      </h2>
      <p className="text-sm text-slate-700 mt-1 dark:text-slate-100">
        Management Database App MySQL and Postgres, still progrest.
      </p>
      <p className="text-lg text-slate-900 mt-1 dark:text-slate-100">
        create by{" "}
        <a
          href="https://github.com/juanPWT"
          target="_blank"
          className={`hover:underline`}
          style={{ color: `${getTheme()}` }}
        >
          JuanPWT
        </a>
      </p>
    </div>
  );
};

export default Widget;
