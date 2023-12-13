import React, { useState } from "react";
import ArtistBarChart from "../../../component/ArtistBarChart";
import Sidebar from "../../../component/ArtistComponent/Sidebar";

const BarChartPage = () => {
  const [isSidebar, setIsSidebar] = useState(true);
  return (
    <div className="AppGlass">
      <Sidebar isSidebar={isSidebar} />
      <main className="contentSidebar">
        <ArtistBarChart />
      </main>
    </div>
  );
};

export default BarChartPage;
