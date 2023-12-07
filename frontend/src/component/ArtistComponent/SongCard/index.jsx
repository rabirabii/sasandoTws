import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { MoreHorizOutlined, PlayCircleOutline } from "@mui/icons-material";
import axios from "axios";
import { backend_url_img, server } from "../../../server";
import PlaylistMenu from "../../SasandoMenu/PlaylistMenu";
import { setCurrentSong } from "../../../redux/musicPlayer";
import { IconButton } from "@mui/material";
import { Link } from "react-router-dom";

const SongCard = ({ song, playlist, handleRemoveSong }) => {
  const { user } = useSelector((state) => state.user);
  const [menu, setMenu] = useState(false);
  const [playlists, setPlaylists] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [modalPosition, setModalPosition] = useState({ top: 0, left: 0 });
  const dispatch = useDispatch();

  // useEffect(() => {
  //   const fetchFavPlaylist = async () => {
  //     try {
  //       const response = await axios.get(`${server}/playlist/favourite`, {
  //         withCredentials: true,
  //       });
  //       const fetchedPlaylists = response.data.playlist.slice(0, 4);
  //       setPlaylists(fetchedPlaylists);
  //     } catch (error) {
  //       console.error("Error fetching playlists:", error);
  //     }
  //   };

  //   fetchFavPlaylist();
  // }, []);

  return (
    <Link to={`/single/${song._id}`}>
      <div className="relative p-4 border rounded cursor-pointer shadow-md hover:shadow-lg transition duration-300">
        <img
          src={`${backend_url_img}${song.img}`}
          alt={song.name}
          className="w-full h-60 rounded-md mb-2 object-cover"
        />
        <div className="relative">
          <div className="absolute top-0 right-5 mt-2 mr-3 cursor-pointer"></div>
          <div className="absolute top-0 right-0 mt-2 mr-2 cursor-pointer">
            <MoreHorizOutlined onClick={() => setMenu(true)} />
          </div>
          {menu && (
            <PlaylistMenu
              playlist={playlist}
              song={song}
              handleRemoveSong={handleRemoveSong}
              closeMenu={() => setMenu(false)}
            />
          )}
          <div>
            <p className="font-semibold text-lg">{song.name}</p>
            <p className="text-sm text-gray-500">{song.artist.name}</p>
            <p className="text-lg text-gray-900">{song.totalListener}</p>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default SongCard;
