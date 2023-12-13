import React, { useEffect, useState } from "react";
import Sidebar from "../../../component/ArtistComponent/Sidebar";
import YourAlbumsComponent from "../../../component/ArtistComponent/YourAlbumsComponent";
import axios from "axios";
import { server } from "../../../server";
import { useSelector } from "react-redux";

const YourAlbumPage = () => {
  const [albums, setAlbums] = useState([]);
  const { musisi } = useSelector((state) => state.musisi);
  useEffect(() => {
    // Fetching the album data from the backend
    const fetchYourAlbums = async () => {
      try {
        const response = await axios.get(
          `${server}/album/get-all-albums/${musisi._id}`,
          {
            withCredentials: true,
          }
        );
        const fetchedYourAlbums = response.data.albums;
        setAlbums(fetchedYourAlbums);
      } catch (error) {
        console.error("Error fetching playlists:", error);
      }
    };

    fetchYourAlbums();
  }, []);

  const [isSidebar, setIsSidebar] = useState(true);
  return (
    <div className="AppGlass">
      <Sidebar isSidebar={isSidebar} />
      <main className="contentSidebar">
        <YourAlbumsComponent albums={albums} isArtist={true} />
      </main>
    </div>
  );
};

export default YourAlbumPage;
