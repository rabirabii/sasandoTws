import React, { useState } from "react";
import CreateSong from "../../../component/ArtistComponent/CreateSong";
import Sidebar from "../../../component/ArtistComponent/Sidebar";

const CreateSongPage = () => {
  const [isSidebar, setIsSidebar] = useState(true);
  return (
    <div className="AppGlass">
      <Sidebar isSidebar={isSidebar} />
      <main className="contentSidebar">
        <CreateSong />
      </main>
    </div>
  );
};

export default CreateSongPage;
