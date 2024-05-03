import React, { useCallback, useState } from "react";
import CodeMirror from "@uiw/react-codemirror";
import { MySQL, PostgreSQL } from "@codemirror/lang-sql";
import { useQuery } from "../utils/useQuery";
import { AiOutlineConsoleSql } from "react-icons/ai";
import { tokyoNight } from "@uiw/codemirror-theme-tokyo-night";
import Modal from "../components/Modal";
import { getTheme } from "../utils/getTheme";
import { useNavigate } from "react-router-dom";

const SqlCodeEditor = () => {
  const platfrom = useQuery().get("platfrom");
  const db = useQuery().get("db");
  const navigate = useNavigate();
  const [value, setValue] = useState<string>(`select * from yourTable`);
  const onChange = useCallback((val: string, viewUpdate: any) => {
    setValue(val);
  }, []);

  const onClick = () => {
    if (value === "" || value === `select * from yourTable`) return;

    navigate(`/execute?platfrom=${platfrom}&query=${value}`, {
      state: { prev: `${location.pathname}?db=${db}&platfrom=${platfrom}` },
    });
  };

  return (
    <Modal
      customButton
      nav
      icon={AiOutlineConsoleSql}
      title={`query ${platfrom}`}
    >
      <div className="w-full flex flex-col gap-5">
        <CodeMirror
          value={value}
          height="200px"
          width="500px"
          extensions={platfrom === "mysql" ? [MySQL] : [PostgreSQL]}
          onChange={onChange}
          theme={tokyoNight}
          basicSetup={{
            autocompletion: true,
          }}
        />
        <div className="w-full flex justify-end ">
          <button
            onClick={onClick}
            className="p-2 rounded-md text-white font-semibold hover:bg-slate-500"
            style={{ backgroundColor: getTheme() }}
          >
            run
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default SqlCodeEditor;
