import React, { Fragment, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getAllSongsArtist } from "../../../redux/actions/song";
import { AccessTime } from "@mui/icons-material";
import PopularSongItems from "./PopularSongsItem";
import styles from "./popularSong.module.scss";
const PopularSong = ({ song, playlist, handleRemoveSong }) => {
  const dispatch = useDispatch();
  const { songs } = useSelector((state) => state.song);
  const { id } = useParams();
  const [visibleSongs, setVisibleSongs] = useState(5);
  useEffect(() => {
    dispatch(getAllSongsArtist(id));
  }, [dispatch, id]);

  const showMoreSongs = () => {
    setVisibleSongs((prev) => prev + Math.min(5, songs.length - prev));
  };
  return (
    <div className={styles.container}>
      <div>
        <h1 className="font-semibold">Popular</h1>
      </div>
      <div className={styles.body}>
        <div className={styles.body_nav}>
          <div className={styles.left}>
            <span>#</span>
            <p>Title</p>
          </div>
          <div className={styles.center}>{/* <p>Artist</p> */}</div>
          <div className={styles.right}>
            <AccessTime />
          </div>
        </div>
        {songs.slice(0, visibleSongs).map((song, index) => (
          <Fragment key={song._id}>
            <PopularSongItems song={song} handleRemoveSong={handleRemoveSong} />
          </Fragment>
        ))}
        {songs.length > 5 && visibleSongs < songs.length && (
          <div className={styles.showMore}>
            <button onClick={showMoreSongs}>
              Show {Math.min(5, songs.length - visibleSongs)} more songs
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default PopularSong;
