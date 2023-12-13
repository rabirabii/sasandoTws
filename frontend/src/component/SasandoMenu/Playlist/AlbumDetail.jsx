import axios from "axios";
import React, { Fragment, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { backend_url_img, server } from "../../../server";
import Song from "../Song";
import { CircularProgress } from "@mui/material";
import { AccessTimeOutlined } from "@mui/icons-material";
import styles from "./styles.module.scss";
import { purple } from "@mui/material/colors";
const AlbumDetail = () => {
  const [album, setAlbum] = useState([]);
  const [songs, setSongs] = useState([]);
  const [model, setModel] = useState(false);
  const [isFetching, setIsFetching] = useState(false);

  const dispatch = useDispatch();
  const { id } = useParams();
  console.log("Albums", album);
  console.log("Songs", songs);

  const navigate = useNavigate();
  const getAlbumsSongs = async (id) => {
    try {
      setIsFetching(true);
      const response = await axios.get(`${server}/album/album/${id}`, {
        withCredentials: true,
      });

      const { data } = response;
      setAlbum(data.album);
      const fetchedSongs = Array.isArray(data.songs) ? data.songs : [];
      setSongs(fetchedSongs);
      setIsFetching(false);
    } catch (error) {
      setIsFetching(false);
      console.log(error);
    }
  };
  useEffect(() => {
    getAlbumsSongs(id);

    // Add dependencies as needed
  }, [id]);
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
              backgroundSize: "contain", // Adjust the background-size property
            }}
          >
            <div className={styles.head_gradient}></div>
            {album?.thumbnail === "" ? (
              <img
                src="https://static.thenounproject.com/png/17849-200.png"
                alt={album?.name}
                style={{ background: "#919496" }}
                className={styles.backgroundImg}
              />
            ) : (
              <img
                src={`${backend_url_img}${album.thumbnail}`}
                className={styles.backgroundImg}
                alt={album?.name}
              />
            )}

            <div className={styles.playlist_info}>
              <p>Album</p>
              <h1>{album?.name}</h1>
              <span>{songs.length} songs</span>
              <span>Created by: {album?.musisi?.name}</span>
            </div>
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
                <AccessTimeOutlined />
              </div>
            </div>
            {songs.map((song) => (
              <Fragment key={song._id}>
                <Song song={song} />
              </Fragment>
            ))}
          </div>
        </Fragment>
      )}
    </div>
  );
};

export default AlbumDetail;
