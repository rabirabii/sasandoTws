import axios from "axios";
import React, { useEffect, useState } from "react";
import { server } from "../../../server";
import { useSelector } from "react-redux";
import styles from "./styles.module.scss";
import { Link } from "react-router-dom";
import PlaylistUI from "../../../ui/Playlist";

const LibraryPlaylist = () => {
  const [playlists, setPlaylists] = useState([]);
  const { user } = useSelector((state) => state.user);

  useEffect(() => {
    const fetchFavPlaylist = async () => {
      try {
        const response = await axios.get(`${server}/playlist/favourite`, {
          withCredentials: true,
        });
        const fetchedPlaylists = response.data.playlist.splice(0, 4);
        setPlaylists(fetchedPlaylists);
      } catch (error) {
        console.error("Error fetching playlists:", error);
        // Handle error
      }
    };

    fetchFavPlaylist();
  }, []);

  return (
    <div className={styles.container}>
      <h1>My Playlists</h1>
      <div className={styles.playlistsContainer}>
        <Link to="/collections/tracks" className={styles.likedSongsLink}>
          <div className={styles.likedSongs}>
            <h2>Liked Songs</h2>
            <p>{user.likedSongs.length} Liked Songs</p>
          </div>
        </Link>
        <PlaylistUI playlists={playlists} />
        {user.likedSongs.length === 0 && (
          <p className={styles.noLikedSongs}>No Liked Songs Yet</p>
        )}
      </div>
    </div>
  );
};

export default LibraryPlaylist;
