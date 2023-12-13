import React, { useState } from "react";
import CreateSong from "../../../component/ArtistComponent/CreateSong";
import Sidebar from "../../../component/ArtistComponent/Sidebar";
import ArtistPieChart from "../../../component/ArtistComponent/ArtistPieChart";

const PiechartPage = () => {
  const [isSidebar, setIsSidebar] = useState(true);
  return (
    <div className="AppGlass">
      <Sidebar isSidebar={isSidebar} />
      <main className="contentSidebar">
        <ArtistPieChart />
      </main>
    </div>
  );
};

export default PiechartPage;
