import React, { useState } from "react";
import Sidebar from "../../../component/ArtistComponent/Sidebar";
import ArtistFormComponent from "../../../component/ArtistComponent/ArtistFormComponent";

const ArtistUpdateProfile = () => {
  const [isSidebar, setIsSidebar] = useState(true);
  return (
    <div className="AppGlass">
      <Sidebar isSidebar={isSidebar} />
      <main className="contentSidebar">
        <ArtistFormComponent />
      </main>
    </div>
  );
};

export default ArtistUpdateProfile;
