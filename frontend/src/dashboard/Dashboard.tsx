import React, { useEffect } from "react";
import PrimaryLayout from "../layout/PrimaryLayout";
import { useParams } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import Table from "./components/Table";

const Dashboard = () => {
  const { id } = useParams<{ id: string }>();
  return (
    <PrimaryLayout>
      <div className="w-full flex  gap-3">
        <Sidebar id={Number(id)} />
        <Table name={"table"} />
      </div>
    </PrimaryLayout>
  );
};

export default Dashboard;
