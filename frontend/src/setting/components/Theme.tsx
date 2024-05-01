import React, { useState } from "react";
import toast from "react-hot-toast";
import { getTheme } from "../../utils/getTheme";

const Theme = () => {
  const theme: string = getTheme();
  const [color, setColor] = useState<string>(theme);

  const onClickSetTheme = () => {
    localStorage.setItem("theme", color);
    toast.success(
      "Theme updated successfully, just back to home page to see the changes."
    );
  };

  return (
    <>
      <div className="w-full flex justify-start items-center">
        <span className="text-slate-800 dark:text-slate-100">Theme</span>
      </div>
      <div className="w-full flex justify-between items-center">
        <div>
          <label
            htmlFor="hs-color-input"
            className="block text-sm font-medium mb-2 dark:text-slate-100 text-slate-800"
          >
            Color picker
          </label>
          <input
            type="color"
            onChange={(e) => setColor(e.target.value)}
            className="p-1 h-10 w-14 block bg-white border border-gray-200 cursor-pointer rounded-lg disabled:opacity-50 disabled:pointer-events-none dark:bg-slate-800 dark:border-slate-700 dark:text-slate-100 text-slate-800"
            id="hs-color-input"
            defaultValue={color}
            title="Choose your color"
          />
        </div>
        <button
          type="button"
          onClick={onClickSetTheme}
          className=" text-white p-2 rounded-md hover:bg-slate-500"
          style={{ backgroundColor: color }}
        >
          set theme
        </button>
      </div>
      <hr className="w-full" />
    </>
  );
};

export default Theme;
