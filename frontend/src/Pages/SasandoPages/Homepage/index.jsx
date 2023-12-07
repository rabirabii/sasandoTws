import React, { useState } from "react";
import Navbar from "../../../component/SasandoMenu/Navbar";
import AudioPlayer from "../../../component/SasandoMenu/AudioPlayer";
import { useSelector } from "react-redux";
import Homepage from "../../../component/SasandoMenu/Homepage";
import Sidebar from "../../../component/SasandoMenu/Sidebar";
import Topbar from "../../../component/SasandoMenu/Topbar";

const SasandoHomePage = () => {
  const [isSidebar, setIsSidebar] = useState(true);
  const { currentSong } = useSelector((state) => state.audioPlayer);
  return (
    <div>
      {/* <Sidebar isSidebar={isSidebar} /> */}
      {/* <main className="contentSidebar"> */}
      {/* <Topbar setIsSidebar={setIsSidebar} /> */}
      <Homepage />
      {/* <AudioPlayer /> */}
      {/* </main> */}
    </div>
  );
};

export default SasandoHomePage;
