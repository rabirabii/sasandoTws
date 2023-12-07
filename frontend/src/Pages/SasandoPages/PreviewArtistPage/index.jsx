import React, { useState } from "react";
import Topbar from "../../../component/SasandoMenu/Topbar";
import ArtistPreview from "../../../component/SasandoMenu/ArtistPreview";
import Sidebar from "../../../component/SasandoMenu/Sidebar";
import ListSongPreview from "../../../component/SasandoMenu/ArtistPreview/ListSongPreview";
import AudioPlayer from "../../../component/SasandoMenu/AudioPlayer";
import PopularSong from "../../../component/SasandoMenu/ArtistPreview/PopularSong";

const PreviewArtistPage = () => {
  const [isSidebar, setIsSidebar] = useState(true);
  return (
    <div>
      <ArtistPreview isOwner={false} />
      <PopularSong />
      <ListSongPreview />
    </div>
  );
};

export default PreviewArtistPage;
