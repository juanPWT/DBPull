import React, { useEffect, useState } from "react";
import PrimaryLayout from "../layout/PrimaryLayout";
import { Link, useNavigate } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";
import toast from "react-hot-toast";
import { TestConnectDB, SaveTemplateToFile } from "../../wailsjs/go/main/App";

const NewConnection = () => {
  const [db, setDb] = useState("");
  const [name, setName] = useState("");
  const [url, setUrl] = useState("");
  const navigate = useNavigate();

  const testConnect = () => {
    if (db !== "" && url !== "") {
      TestConnectDB(url, db).then((res: boolean) => {
        if (res) {
          toast.success("Connection success, ok!");
        } else {
          toast.error("Connection failed, check your url");
        }
      });
    } else {
      toast.error("Please fill all fields");
    }
  };

  const saveConnection = () => {
    if (db !== "" && url !== "" && name != "") {
      SaveTemplateToFile(url, db, name).then((res: string) => {
        toast(res);
        navigate("/");
      });
    } else {
      toast.error("Please fill all fields");
    }
  };

  const onChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    if (e.target.value === "Select DB") return;
    setDb(e.target.value);
    if (e.target.value === "mysql") {
      setUrl(
        "[user]:[password]@tcp(127.0.0.1:3306)/[dbname]?charset=utf8mb4&parseTime=True&loc=Local"
      );
    } else {
      setUrl(
        "host=localhost user=postgres password=password dbname=dbname port=5432 sslmode=disable TimeZone=Asia/Shanghai"
      );
    }
  };

  return (
    <PrimaryLayout>
      <div className="w-full flec flex-col justify-center">
        <div className="w-full flex justify-between items-center">
          <Link to={"/"} className="text-sm text-slate-900 ">
            <FaArrowLeft size={20} />
          </Link>
          <h1 className="font-bold text-slate-900 text-lg">New Connection</h1>
        </div>
        <div className="w-full my-5 grid grid-cols-1 justify-center gap-5">
          <div className="w-full flex justify-center items-center gap-4">
            <select
              onChange={onChange}
              value={db}
              name="db"
              id="db"
              className="w-full rounded-md text-slate-900 p-2 ring-1 ring-slate-900 focus:outline-sky-500"
            >
              <option value={""} selected>
                Select DB
              </option>
              <option value="mysql" className="p-2">
                MySQL
              </option>
              <option value="postgres" className="p-2">
                Postgres
              </option>
            </select>
          </div>
          <div className="w-full flex flex-col gap-2">
            <label htmlFor="name" className="font-semibold">
              Name The Config
            </label>
            <input
              onChange={(e) => setName(e.target.value)}
              id="name"
              className="w-full rounded-md ring-1 ring-slate-900 focus:outline-sky-500 p-2"
            />
          </div>
          <div className="w-full flex flex-col gap-2">
            <label htmlFor="url" className="font-semibold">
              Enter your url database
            </label>
            <textarea
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              rows={5}
              id="url"
              className="w-full rounded-md ring-1 ring-slate-900 focus:outline-sky-500 p-2"
            />
          </div>
          <div className="w-full flex justify-start items-start gap-3">
            <button
              onClick={saveConnection}
              type="button"
              className="w-full bg-sky-500 rounded-md p-3 text-white text-lg font-bold hover:bg-sky-200 hover:text-sky-600"
            >
              Save
            </button>
            <button
              type="button"
              onClick={testConnect}
              className="w-full bg-green-500 rounded-md p-3 text-white text-lg font-bold hover:bg-green-200 hover:text-green-600"
            >
              Test
            </button>
          </div>
        </div>
      </div>
    </PrimaryLayout>
  );
};

export default NewConnection;
