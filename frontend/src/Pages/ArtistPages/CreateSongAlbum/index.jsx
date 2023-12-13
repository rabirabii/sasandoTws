import React, { useState } from "react";
import Sidebar from "../../../component/ArtistComponent/Sidebar";
import CreateSongForAlbum from "../../../ArtistUI/CreateAlbums";

const CreateSongAlbumPage = () => {
  const [isSidebar, setIsSidebar] = useState(true);
  return (
    <div className="AppGlass">
      <Sidebar isSidebar={isSidebar} />
      <main className="contentSidebar">
        <CreateSongForAlbum />
      </main>
    </div>
  );
};

export default CreateSongAlbumPage;
