import React, { useState } from "react";
import Sidebar from "../../../component/ArtistComponent/Sidebar";
import LineChartArtist from "../../../component/ArtistComponent/ArtistLineChart";

const LinechartPage = () => {
  const [isSidebar, setIsSidebar] = useState(true);
  return (
    <div className="AppGlass">
      <Sidebar isSidebar={isSidebar} />
      <main className="contentSidebar">
        <LineChartArtist />
      </main>
    </div>
  );
};

export default LinechartPage;
