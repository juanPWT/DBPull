import React from "react";
import Modal from "../../components/Modal";
import Input from "../../components/Input";
import { ColumnType } from "./Table";
import { useForm } from "react-hook-form";
import { InsertRow } from "../../../wailsjs/go/main/App";
import toast from "react-hot-toast";

type ModalAddValueProps = {
  table: string | null;
  columns: ColumnType[];
  id: number;
};

const modalTypeSelection = (type: string) => {
  if (type.includes("VARCHAR")) {
    return "text";
  } else if (type.includes("TEXT")) {
    return "text";
  } else if (type.includes("INT") && type !== "TINYINT") {
    return "number";
  } else if (type.includes("FLOAT")) {
    return "number";
  } else if (type.includes("DATE")) {
    return "date";
  } else if (type.includes("DATETIME")) {
    return "datetime-local";
  } else if (type.includes("TIMESTAMP")) {
    return "datetime-local";
  } else if (type === "TINYINT" || type === "BOOLEAN") {
    return "number";
  }
};

const ModalAddValue: React.FC<ModalAddValueProps> = ({
  columns,
  table,
  id,
}) => {
  const { register, handleSubmit, reset } = useForm();

  const onSubmit = (data: any) => {
    console.log(data);
    if (table !== null) {
      InsertRow(data, id, table).then((res: string) => {
        reset();
        if (res.includes("success")) {
          toast.success(res);
        } else if (res.includes("error")) {
          toast.error(res);
        }
      });
    }
  };

  return (
    <div className="w-full mb-2 flex justify-end">
      <Modal
        label="add value"
        title={`Add Value ${table ?? "table undifined"}`}
      >
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="w-full bg-gray-100 p-2 shadow-md "
        >
          <div className="w-full grid grid-cols-2 gap-3">
            {columns.map((columns, i) => {
              const type = modalTypeSelection(columns.type);

              return (
                <Input
                  key={i}
                  id={columns.column}
                  placeholder={`enter here ${columns.column}`}
                  type={type}
                  register={register}
                />
              );
            })}
          </div>
          <div className="w-full my-2 flex justify-end ">
            <button
              type="submit"
              className="p-3 bg-sky-500 rounded-md shadow-md hover:bg-sky-300 text-white font-semibold"
            >
              Insert
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
};

export default ModalAddValue;
