import React, { useState } from "react";
import { useSelector } from "react-redux";
import LibraryPlaylist from "../../../component/SasandoMenu/LibraryPlaylist";
import Sidebar from "../../../component/SasandoMenu/Sidebar";
import AudioPlayer from "../../../component/SasandoMenu/AudioPlayer";
import Topbar from "../../../component/SasandoMenu/Topbar";

const LibraryPlaylistPage = () => {
  const [isSidebar, setIsSidebar] = useState(true);
  const { currentSong } = useSelector((state) => state.audioPlayer);
  return (
    <div>
      <LibraryPlaylist />
      {/* </main> */}
    </div>
  );
};

export default LibraryPlaylistPage;
