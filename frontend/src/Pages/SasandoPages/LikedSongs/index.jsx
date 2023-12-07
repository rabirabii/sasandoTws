import React, { useState } from "react";
import LikeSongComponent from "../../../component/SasandoMenu/LikeSongsComponent";
import Sidebar from "../../../component/SasandoMenu/Sidebar";
import Topbar from "../../../component/SasandoMenu/Topbar";
import { useSelector } from "react-redux";
import AudioPlayer from "../../../component/SasandoMenu/AudioPlayer";

const LikeSongsPage = () => {
  const [isSidebar, setIsSidebar] = useState(true);
  const { currentSong } = useSelector((state) => state.audioPlayer);
  return (
    <div>
      {/* <main className="contentSidebar"> */}
      {/* <Topbar setIsSidebar={setIsSidebar} /> */}
      <LikeSongComponent />
      {/* <AudioPlayer /> */}
      {/* </main> */}
    </div>
  );
};

export default LikeSongsPage;
