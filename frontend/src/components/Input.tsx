import React from "react";
import { FieldValues, UseFormRegister } from "react-hook-form";

type InputProps = {
  type:
    | "text"
    | "number"
    | "email"
    | "date"
    | "datetime-local"
    | "hidden"
    | "checkbox"
    | undefined;
  placeholder: string;
  value?: string;
  id: string;
  register: UseFormRegister<FieldValues>;
};

const Input: React.FC<InputProps> = ({
  placeholder,
  type,
  value,
  id,
  register,
}) => {
  return (
    <div className="w-full flex flex-col gap-2">
      <label htmlFor={id} className="text-sm font-semibold">
        {id} :{" "}
      </label>
      <input
        id={id}
        {...register(id)}
        type={type}
        className="focus:outline-none ring-1 placeholder:text-gray-400 p-2 w-full text-slate-900 focus:ring-sky-500 rounded-md shadow-md"
        placeholder={placeholder}
        value={value}
      />
    </div>
  );
};

export default Input;
