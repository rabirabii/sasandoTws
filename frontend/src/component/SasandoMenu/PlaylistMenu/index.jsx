import React, { Fragment, useEffect, useState } from "react";
import styles from "./styles.module.scss";
import ArrowRightIcon from "@mui/icons-material/ArrowRight";
import { ClickAwayListener } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { addSongToPlaylist } from "../../../redux/actions/playlist";
import axios from "axios";
import { server } from "../../../server";
const PlaylistMenu = ({ playlist, song, handleRemoveSong, closeMenu }) => {
  const { user } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const [playlists, setPlaylists] = useState([]);

  const handleAddToPlaylist = (playlistId, songId) => {
    const payload = { playlistId, songId };
    addSongToPlaylist(payload, dispatch);
  };

  useEffect(() => {
    // Fetch playlists from the backend when the component mounts
    const fetchFavPlaylist = async () => {
      try {
        const response = await axios.get(`${server}/playlist/favourite`, {
          withCredentials: true,
        }); // Replace with your API endpoint
        const fetchedPlaylists = response.data.playlist.splice(0, 4);
        setPlaylists(fetchedPlaylists);
      } catch (error) {
        console.error("Error fetching playlists:", error);
        // Handle error (show a message, etc.)
      }
    };

    fetchFavPlaylist();
  }, []); //
  return (
    <ClickAwayListener onClickAway={closeMenu}>
      <div className={styles.menu} onClick={closeMenu}>
        <div className={styles.playlist_option}>
          <p>Add to Playlist</p>
          <Fragment>
            <ArrowRightIcon />
            <div className={styles.playlists}>
              {playlists.map((playlist) => (
                <div
                  className={styles.option}
                  onClick={() => handleAddToPlaylist(playlist._id, song._id)}
                  key={playlist._id}
                >
                  <p>{playlist.name}</p>
                </div>
              ))}
            </div>
          </Fragment>
        </div>
        {playlist && playlist?.owner?._id === user._id && (
          <div className={styles.option}>
            <p onClick={() => handleRemoveSong(song._id)}>
              Remove from Playlist
            </p>
          </div>
        )}
        <div className={styles.option}>
          <p>Go to artist</p>
        </div>
        <div className={styles.option}>
          <p>Share</p>
        </div>
      </div>
    </ClickAwayListener>
  );
};

export default PlaylistMenu;
