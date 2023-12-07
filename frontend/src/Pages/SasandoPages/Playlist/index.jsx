import React, { useState } from "react";
import Navbar from "../../../component/SasandoMenu/Navbar";
import AudioPlayer from "../../../component/SasandoMenu/AudioPlayer";
import { useSelector } from "react-redux";
import Homepage from "../../../component/SasandoMenu/Homepage";
import Sidebar from "../../../component/SasandoMenu/Sidebar";
import Playlist from "../../../component/SasandoMenu/Playlist";
import CobaPlayer from "../../../component/SasandoMenu/CobaPlayer";
import Topbar from "../../../component/SasandoMenu/Topbar";

const PlaylistPage = () => {
  const [isSidebar, setIsSidebar] = useState(true);
  const { currentSong } = useSelector((state) => state.audioPlayer);
  return (
    <div>
      {/* <Sidebar isSidebar={isSidebar} /> */}
      {/* <main className="contentSidebar"> */}
      {/* <Topbar setIsSidebar={setIsSidebar} /> */}
      <Playlist />
      {/* <AudioPlayer /> */}
      {/* <CobaPlayer /> */}
      {/* </main> */}
    </div>
  );
};

export default PlaylistPage;
