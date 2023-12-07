import React, { useState } from "react";
import Sidebar from "../../../component/ArtistComponent/Sidebar";
import Dashboard from "../../../component/ArtistComponent/ArtistDashboard";

const ArtistDashboardPage = () => {
  const [isSidebar, setIsSidebar] = useState(true);
  return (
    <div className="SideBar">
      <div className="AppGlass">
        <Sidebar isSidebar={isSidebar} />
        <Dashboard />
      </div>
    </div>
  );
};

export default ArtistDashboardPage;
