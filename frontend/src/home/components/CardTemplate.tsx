import React from "react";
import toast from "react-hot-toast";
import { CiTrash } from "react-icons/ci";
import { DeleteConfigDB } from "../../../wailsjs/go/main/App";
import { useNavigate, Link } from "react-router-dom";
import { getTheme } from "../../utils/getTheme";

type CardTemplateProps = {
  id: number;
  name: string;
  db: string;
  url: string;
};

const CardTemplate: React.FC<CardTemplateProps> = ({ db, name, url, id }) => {
  const navigate = useNavigate();

  const handleDelete = () => {
    if (!id) return;
    DeleteConfigDB(id).then((res: boolean) => {
      if (res) {
        toast.success("Config Deleted");
        navigate(0);
      } else {
        toast.error("Error deleting config");
        navigate(0);
      }
    });
  };

  return (
    <div className="w-full bg-gray-500 px-2 py-4 rounded-md shadow-md text-white flex items-center justify-between ">
      <Link
        to={`/dashboard/${id}?db=${name}&platfrom=${db}`}
        className="flex group"
      >
        <p className="dark:text-slate-100">{name}</p>
        {/* db tag  */}
        {db === "mysql" ? (
          <span className="p-1 rounded-sm ring-2 text-orange-300 ring-orange-300 text-xs mx-2">
            MySQL
          </span>
        ) : (
          <span className="p-1 rounded-sm ring-2 text-sky-300 ring-sky-300 text-xs mx-2">
            Postgres
          </span>
        )}
      </Link>
      <div className="">
        <button
          type="button"
          onClick={handleDelete}
          className="p-4 rounded-full hover:ring-2  hover:bg-gray-100  bg-gray-900 text-white"
          style={{ border: `1px solid ${getTheme()}`, color: getTheme() }}
        >
          <CiTrash size={15} />
        </button>
      </div>
    </div>
  );
};

export default CardTemplate;
