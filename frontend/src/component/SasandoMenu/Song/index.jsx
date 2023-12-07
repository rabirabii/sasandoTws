import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import PlaylistMenu from "../PlaylistMenu";
import { IconButton, Slider } from "@mui/material";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import PauseIcon from "@mui/icons-material/Pause";
import VolumeUpIcon from "@mui/icons-material/VolumeUp";
import VolumeDownIcon from "@mui/icons-material/VolumeDown";
import VolumeOffIcon from "@mui/icons-material/VolumeOff";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import styles from "./styles.module.scss";
import Like from "../Like";
import { backend_url_img } from "../../../server";
import { backend_url_song } from "../../../server";
import CobaPlayer from "../CobaPlayer";
import { setCurrentSong } from "../../../redux/actions/player";
import { Link } from "react-router-dom";

const Song = ({ playlist, song, handleRemoveSong }) => {
  const [menu, setMenu] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [audio] = useState(new Audio(`${backend_url_song}${song?.song}`)); // Assuming song.audioUrl exists
  const [volume, setVolume] = useState(0.5); // Initial volume, can be changed

  const dispatch = useDispatch();

  useEffect(() => {
    // Set volume on the audio element
    audio.volume = volume;
  }, [volume]);

  const togglePlayPause = () => {
    if (isPlaying) {
      audio.pause();
    } else {
      audio.play();
    }
    setIsPlaying(!isPlaying);
  };

  const changeVolume = (value) => {
    setVolume(value);
  };

  const handleSongClick = () => {
    // Dispatch action to set the current song in the Redux store
    dispatch(setCurrentSong(song));

    console.log(song);
  };
  const formatDuration = (timeInSeconds) => {
    const minutes = Math.floor(timeInSeconds / 60);
    const seconds = Math.floor(timeInSeconds % 60);
    const formattedSeconds = seconds < 10 ? `0${seconds}` : seconds;
    return `${minutes}:${formattedSeconds}`;
  };
  return (
    <div className={styles.song_container}>
      <div className={styles.left}>
        <IconButton onClick={handleSongClick}>
          {isPlaying ? <PauseIcon /> : <PlayArrowIcon />}
        </IconButton>
        <img src={`${backend_url_img}${song?.img}`} alt="song_img" />
        <p>
          <Link to={`/track/${song?._id}`}>{song?.name}</Link>
        </p>
      </div>
      <div className={styles.center}>
        <Link className="link" to={`/artist/${song?.artist._id}`}>
          {song?.artist.name}
        </Link>
      </div>
      <div className={styles.right}>
        <Like songId={song?._id} />
        <p>{formatDuration(Math.floor(song?.duration))}</p>
        <IconButton className={styles.menu_btn} onClick={() => setMenu(true)}>
          <MoreHorizIcon />
        </IconButton>
        {menu && (
          <PlaylistMenu
            playlist={playlist}
            song={song}
            handleRemoveSong={handleRemoveSong}
            closeMenu={() => setMenu(false)}
          />
        )}
      </div>
    </div>
  );
};

export default Song;
