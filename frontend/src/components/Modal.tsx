import React, { useEffect, useState } from "react";
import { AiOutlineClose } from "react-icons/ai";

type ModalProps = {
  label: string;
  children?: React.ReactNode;
  title: string;
};

const Modal: React.FC<ModalProps> = ({ label, children, title }) => {
  const [show, setShow] = useState<boolean>(false);

  return (
    <>
      <button
        onClick={() => setShow(true)}
        className="p-2 bg-sky-500 rounded-md shadow-md text-white hover:bg-sky-300"
      >
        {label}
      </button>
      {show ? (
        <>
          <div className="flex justify-center items-center overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none bg-gray-200/70">
            <div className="relative w-auto my-6 mx-auto max-w-3xl">
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                <div className="flex items-center gap-3 justify-between p-5 border-b border-solid border-gray-300 rounded-t ">
                  <h3 className="text-xl font=semibold">{title}</h3>
                  <button
                    onClick={() => setShow(false)}
                    className="font-bold p-3 rounded-full hover:bg-gray-200"
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
