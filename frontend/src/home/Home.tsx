import React, { useEffect } from "react";
import PrimaryLayout from "../layout/PrimaryLayout";
import Widget from "./components/Widget";
import TemplateSave from "./components/TemplateSave";

const Home = () => {
  return (
    <PrimaryLayout>
      <div className="w-full flex gap-4 justify-center">
        <Widget />
        <TemplateSave />
      </div>
    </PrimaryLayout>
  );
};

export default Home;
