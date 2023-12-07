import React, { useState } from "react";
import Sidebar from "../../../component/ArtistComponent/Sidebar";
import ProfileComponent from "../../../component/ArtistComponent/ProfileComponent";
import ListSongArtist from "../../../component/SasandoMenu/ListSongArtist";

const ProfilePage = () => {
  const [isSidebar, setIsSidebar] = useState(true);
  return (
    <div className="AppGlass">
      <Sidebar isSidebar={isSidebar} />
      <main className="contentSidebar">
        <ProfileComponent />
        <ListSongArtist />
      </main>
    </div>
  );
};

export default ProfilePage;
