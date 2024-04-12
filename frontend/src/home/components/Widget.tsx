import React from "react";

const Widget = () => {
  return (
    <div className="w-full bg-gray-500/10 shadow-md rounded-md ring-1 ring-slate-900 p-4 flex flex-col">
      <h2 className="text-lg font-semibold text-slate-900">
        Welcome to DBPull 😁
      </h2>
      <p className="text-sm text-slate-700 mt-1">
        Management Database App MySQL and Postgres, still progrest.
      </p>
      <p className="text-lg text-slate-900 mt-1">
        create by{" "}
        <a
          href="https://github.com/juanPWT"
          target="_blank"
          className="text-sky-500 hover:underline"
        >
          JuanPWT
        </a>
      </p>
    </div>
  );
};

export default Widget;
