import React, { useEffect, useState } from "react";
import { AiOutlineClose } from "react-icons/ai";
import { getTheme } from "../utils/getTheme";

type ModalProps = {
  label?: string;
  customButton?: boolean;
  icon?: any;
  nav?: boolean;
  children?: React.ReactNode;
  title: string;
};

const Modal: React.FC<ModalProps> = ({
  label,
  children,
  title,
  customButton,
  icon: Icon,
  nav,
}) => {
  const [show, setShow] = useState<boolean>(false);

  return (
    <>
      <button
        onClick={() => setShow(true)}
        className={
          nav
            ? `rounded-md bg-gray-600 text-gray-100 p-2 hover:bg-gray-100 hover:text-gray-600 `
            : `p-2  rounded-md shadow-md text-white`
        }
        {...(nav ? null : { style: { backgroundColor: getTheme() } })}
      >
        {customButton ? <Icon /> : label}
      </button>

      {show ? (
        <>
          <div className="flex justify-center items-center overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none bg-slate-200/70 dark:bg-slate-900/70">
            <div className="relative w-auto my-6 mx-auto max-w-3xl">
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none dark:bg-slate-900">
                <div className="flex items-center gap-3 justify-between p-5 border-b border-solid border-gray-300 rounded-t ">
                  <h3 className="text-xl font=semibold text-slate-900 dark:text-slate-100">
                    {title}
                  </h3>
                  <button
                    onClick={() => setShow(false)}
                    className="font-bold p-3 rounded-full hover:bg-gray-200 dark:text-slate-100 dark:hover:text-slate-900"
                  >
                    <AiOutlineClose />
                  </button>
                </div>
                <div className="relative p-6 flex-auto">{children}</div>
              </div>
            </div>
          </div>
        </>
      ) : null}
    </>
  );
};

export default Modal;
