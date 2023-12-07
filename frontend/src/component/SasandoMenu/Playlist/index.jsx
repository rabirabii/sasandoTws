import axios from "axios";
import React, { Fragment, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { backend_url_img, backend_url_song, server } from "../../../server";
import {
  deletePlaylist,
  removeSongFromPlaylist,
} from "../../../redux/actions/playlist";
import { IconButton, CircularProgress } from "@mui/material";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import styles from "./styles.module.scss";

import PlaylistModel from "../../../component/SasandoMenu/PlaylistModel";
import Song from "../../../component/SasandoMenu/Song";
import { purple } from "@mui/material/colors";
import CobaPlayer from "../CobaPlayer";
import AudioPlayer from "../AudioPlayer";
import { toast } from "react-toastify";
const Playlist = () => {
  const [playlist, setPlaylist] = useState({});
  const [songs, setSongs] = useState([]);
  const [model, setModel] = useState(false);
  const [isFetching, setIsFetching] = useState(false);
  const { user } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const { id } = useParams();
  console.log("Playlist:", playlist);
  console.log("Songs:", songs);
  const navigate = useNavigate();

  const getPlaylistsSongs = async (id) => {
    try {
      setIsFetching(true);
      const response = await axios.get(`${server}/playlist/playlist/` + id, {
        withCredentials: true,
      });

      const { data } = response;
      setPlaylist(data.playlist);
      const fetchedSongs = Array.isArray(data.songs) ? data.songs : [];
      setSongs(fetchedSongs);
      setIsFetching(false);
    } catch (error) {
      setIsFetching(false);
      console.log(error);
    }
  };
  useEffect(() => {
    getPlaylistsSongs(id);

    // Add dependencies as needed
  }, [id]);

  const handleRemoveSong = async (songId) => {
    try {
      const originalSongs = [...songs];
      const payload = { playlistId: playlist._id, songId };
      const filteredSongs = originalSongs.filter((song) => song._id !== songId);
      setSongs(filteredSongs);
      const res = await removeSongFromPlaylist(payload, dispatch);
      if (!res) setSongs(originalSongs);
    } catch (error) {
      console.error("Error removing song:", error);
    }
  };

  const handleDeletePlaylist = async () => {
    try {
      const response = await axios.delete(
        `${server}/playlist/delete-playlist/${playlist._id}`,
        {
          withCredentials: true,
        }
      );

      if (response.status === 200) {
        toast.success("Playlist deleted successfully!");

        navigate("/sasando/"); // Navigate to another page after deletion
      }
    } catch (error) {
      console.error("Error deleting playlist:", error);
    }
  };
  console.log("Owner", playlist?.owner?._id);
  console.log("User", user._id);
  return (
    <div className={styles.container}>
      {isFetching && (
        <div className={styles.progress_container}>
          <CircularProgress style={{ color: purple }} size="5rem" />
        </div>
      )}
      {!isFetching && (
        <Fragment>
          <div
            className={styles.head}
            style={{
              backgroundImage: `url(${backend_url_img}${playlist.gambar})`,
              backgroundSize: "contain", // Adjust the background-size property
            }}
          >
            <div className={styles.head_gradient}></div>
            {playlist?.thumbnail === "" ? (
              <img
                src="https://static.thenounproject.com/png/17849-200.png"
                alt={playlist?.name}
                style={{ background: "#919496" }}
                className={styles.backgroundImg}
              />
            ) : (
              <img
                src={`${backend_url_img}${playlist.thumbnail}`}
                className={styles.backgroundImg}
                alt={playlist?.name}
              />
            )}

            <div className={styles.playlist_info}>
              <p>Playlist</p>
              <h1>{playlist?.name}</h1>
              <span>{songs.length} songs</span>
              <span>Created by: {playlist?.owner?.name}</span>
              <p>{playlist?.desc}</p>
            </div>

            {playlist?.owner?._id && playlist?.owner?._id === user._id && (
              <div className={styles.actions_container}>
                <IconButton onClick={() => setModel(true)}>
                  <EditIcon />
                </IconButton>
                <IconButton onClick={handleDeletePlaylist}>
                  <DeleteIcon />
                </IconButton>
              </div>
            )}
          </div>
          <div className={styles.body}>
            <div className={styles.body_nav}>
              <div className={styles.left}>
                <span>#</span>
                <p>Title</p>
              </div>
              <div className={styles.center}>
                <p>Artist</p>
              </div>
              <div className={styles.right}>
                <AccessTimeIcon />
              </div>
            </div>
            {songs.map((song) => (
              <Fragment key={song._id}>
                <Song
                  song={song}
                  playlist={playlist}
                  handleRemoveSong={handleRemoveSong}
                />
              </Fragment>
            ))}
          </div>

          {model && (
            <PlaylistModel
              closeModel={() => setModel(false)}
              playlist={playlist}
            />
          )}
        </Fragment>
      )}
    </div>
  );
};

export default Playlist;
