import PrimaryLayout from "../layout/PrimaryLayout";
import { useParams, Link } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import Table from "./components/Table";
import { FaArrowLeft } from "react-icons/fa";

const Dashboard = () => {
  const { id } = useParams<{ id: string }>();

  return (
    <PrimaryLayout>
      <div className="w-full flex justify-between items-center mb-4">
        <Link to={"/"} className="text-sm text-slate-900 dark:text-slate-100">
          <FaArrowLeft size={20} />
        </Link>
      </div>
      <div className="w-full flex  gap-3">
        <Sidebar id={Number(id)} />
        <Table id={Number(id)} />
      </div>
    </PrimaryLayout>
  );
};

export default Dashboard;
