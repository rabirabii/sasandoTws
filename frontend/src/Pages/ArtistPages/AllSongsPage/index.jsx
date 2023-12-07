import React, { useState } from "react";
import Sidebar from "../../../component/ArtistComponent/Sidebar";
import AllSongComponent from "../../../component/ArtistComponent/AllSongs";

const AllSongsPage = () => {
  const [isSidebar, setIsSidebar] = useState(true);
  return (
    <div className="AppGlass">
      <Sidebar isSidebar={isSidebar} />
      <main className="contentSidebar">
        <AllSongComponent />
      </main>
    </div>
  );
};

export default AllSongsPage;
