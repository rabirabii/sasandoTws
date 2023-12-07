import React, { useState } from "react";
import CreateAlbumComponent from "../../../component/ArtistComponent/CreateAlbum";
import Sidebar from "../../../component/ArtistComponent/Sidebar";

const CreateAlbum = () => {
  const [isSidebar, setIsSidebar] = useState(true);
  return (
    <div className="AppGlass">
      <Sidebar isSidebar={isSidebar} />
      <main className="contentSidebar">
        <CreateAlbumComponent />
      </main>
    </div>
  );
};

export default CreateAlbum;
