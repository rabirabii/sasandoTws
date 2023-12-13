import React, { useEffect, useRef, useState } from "react";
import styles from "./styles.module.scss";
import { useDispatch, useSelector } from "react-redux";
import { IconButton, Slider } from "@mui/material";
import SkipPreviousIcon from "@mui/icons-material/SkipPrevious";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import PauseIcon from "@mui/icons-material/Pause";
import SkipNextIcon from "@mui/icons-material/SkipNext";
import VolumeUpIcon from "@mui/icons-material/VolumeUp";
import VolumeDownIcon from "@mui/icons-material/VolumeDown";
import VolumeOffIcon from "@mui/icons-material/VolumeOff";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import Like from "../Like";
import { backend_url_img, backend_url_song, server } from "../../../server";
import {
  setCurrentSong,
  setTrackProgress,
  togglePlayPause,
} from "../../../redux/actions/player";
import { Repeat, RepeatOneOutlined } from "@mui/icons-material";
import { Link } from "react-router-dom";
const AudioPlayer = () => {
  // const [trackProgress, setTrackProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  const isPlaying = useSelector((state) => state.player.isPlaying);
  const currentSong = useSelector((state) => state.player.currentSong);
  const trackProgress = useSelector((state) => state.player.trackProgress);
  const dispatch = useDispatch();
  const [repeat, setRepeat] = useState(false);
  const [volume, setVolume] = useState(0.5);

  const changeVolume = (value) => {
    audioRef.current.volume = value;
    setVolume(value);
  };
  const [repeatSong, setRepeatSong] = useState(false);
  const audioRef = useRef();
  const intervalRef = useRef();
  // State to track whether the initial play request has been sent
  const [initialPlayRequestSent, setInitialPlayRequestSent] = useState(false);

  const startTimer = () => {
    clearInterval(intervalRef.current);

    intervalRef.current = setInterval(() => {
      if (audioRef.current && audioRef.current?.ended) {
        // Check if audioRef.current exists
        if (repeat) {
          audioRef.current.currentTime = 0;
          audioRef.current.play();
        } else {
          dispatch(setCurrentSong({ ...currentSong, action: "pause" }));
        }
      } else if (audioRef.current) {
        // Check if audioRef.current exists
        dispatch(setTrackProgress(audioRef.current.currentTime));
        audioRef?.current.duration && setDuration(audioRef.current.duration);
      } else {
        setTrackProgress(0);
      }
    }, [1000]);
  };

  const currentPercentage = duration
    ? `${(trackProgress / duration) * 100}%`
    : "0%";
  const trackStyling = `
  -webkit-gradient(linear, 0% 0%, 100% 0%, color-stop(${currentPercentage}, #000), color-stop(${currentPercentage}, #777))
`;

  useEffect(() => {
    if (currentSong?.action === "play") {
      dispatch(togglePlayPause());
      audioRef.current?.play();
    } else {
      dispatch(togglePlayPause());
      audioRef.current?.pause();
    }
  }, [currentSong]);

  useEffect(() => {
    currentSong?.action === "play" && startTimer();
  });

  const onScrub = (value) => {
    clearInterval(intervalRef.current);
    audioRef.current.currentTime = value;
    dispatch(setTrackProgress(value));
    setTrackProgress(audioRef.current.currentTime);
  };
  // Function to send play request after 30 seconds
  const sendPlayRequestAfterDelay = async (songId) => {
    try {
      setTimeout(async () => {
        const response = await fetch(`${server}/song/play/${songId}`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            // Add any necessary headers
          },
          // Add body if needed
        });

        if (response.ok) {
          // Request successful, handle accordingly
          console.log("Song play request sent successfully after 30 seconds!");
        } else {
          // Handle errors if needed
          console.error("Failed to send song play request");
        }
      }, 30000); // 30 seconds delay
    } catch (error) {
      console.error("Error sending song play request:", error);
      // Handle errors if needed
    }
  };
  useEffect(() => {
    setInitialPlayRequestSent(false);
  }, [currentSong]);
  useEffect(() => {
    const savedSong = JSON.parse(localStorage.getItem("currentSong"));
    if (savedSong) {
      dispatch(setCurrentSong(savedSong));
      dispatch(togglePlayPause());
      const savedTrackProgress = savedSong.trackProgress || 0;
      setTrackProgress(savedTrackProgress);
      if (isFinite(savedTrackProgress)) {
        audioRef.current.currentTime = savedTrackProgress;
      }
      if (savedSong.action === "play" && isFinite(savedTrackProgress)) {
        audioRef.current.play();
        startTimer();
      }
    }
  }, []);

  // Update the state and localStorage when the song changes
  useEffect(() => {
    if (currentSong) {
      const newSongState = {
        ...currentSong,
        trackProgress,
        action: isPlaying ? "play" : "pause",
      };
      localStorage.setItem("currentSong", JSON.stringify(newSongState));
    }
  }, [currentSong, trackProgress, isPlaying]);
  const handleRepeat = () => {
    setRepeat(!repeat);
    setRepeatSong(false); // Reset repeat song state
    setInitialPlayRequestSent(false); // Reset initial play request state
  };
  const handleActions = () => {
    if (currentSong?.action === "play") {
      if (audioRef.current.paused) {
        audioRef.current.play();
        dispatch(togglePlayPause());
      } else {
        audioRef.current.pause();
        dispatch(togglePlayPause());
      }
    } else {
      dispatch(setCurrentSong({ ...currentSong, action: "play" }));
      if (!initialPlayRequestSent || repeatSong) {
        if (repeatSong) {
          audioRef.current.currentTime = 0;
        }
        sendPlayRequestAfterDelay(currentSong?._id);
        setInitialPlayRequestSent(true);
      }
      audioRef.current.play();
      dispatch(togglePlayPause());
    }
  };

  console.log("Current Song:", currentSong); //
  const formatDuration = (timeInSeconds) => {
    const minutes = Math.floor(timeInSeconds / 60);
    const seconds = Math.floor(timeInSeconds % 60);
    const formattedSeconds = seconds < 10 ? `0${seconds}` : seconds;
    return `${minutes}:${formattedSeconds}`;
  };
  return (
    <div>
      {currentSong ? (
        <div className={styles.audio_player}>
          <div className={styles.left}>
            <img
              src={`${backend_url_img}${currentSong?.img} `}
              className={`${isPlaying ? styles.playing : ""}`}
              alt="song_img"
            />
            <div className={styles.song_info}>
              <Link to={`/single/${currentSong._id}`}>
                <p className={styles.song_name}>{currentSong?.name}</p>
              </Link>
              <Link
                className={styles.song_artist}
                to={`/artist/${currentSong?.artist._id}`}
              >
                {currentSong?.artist?.name}
              </Link>
            </div>
          </div>
          <div className={styles.center}>
            <div className={styles.audio_controls}>
              <IconButton className={styles.prev}>
                <SkipPreviousIcon />
              </IconButton>
              <IconButton className={styles.play} onClick={handleActions}>
                {isPlaying ? <PauseIcon /> : <PlayArrowIcon />}
              </IconButton>
              <IconButton className={styles.next}>
                <SkipNextIcon />
              </IconButton>
              <IconButton onClick={handleRepeat}>
                {repeat ? <RepeatOneOutlined /> : <Repeat />}
              </IconButton>
            </div>
            <div className={styles.progress_container}>
              <p>{Math.floor(trackProgress)}</p>
              <input
                type="range"
                value={trackProgress}
                step="1"
                min="0"
                onChange={(e) => onScrub(e.target.value)}
                max={duration ? duration : 0}
                className={styles.progress}
                style={{ background: trackStyling }}
              />
              <audio
                src={`${backend_url_song}${currentSong?.song}`}
                ref={audioRef}
              ></audio>
              <p>{formatDuration(Math.floor(duration))}</p>
            </div>
          </div>
          <div className={styles.right}>
            {/* Volume Controls */}
            <IconButton>
              {volume === 0 ? (
                <VolumeOffIcon onClick={() => changeVolume(0.5)} />
              ) : volume < 0.5 ? (
                <VolumeDownIcon onClick={() => changeVolume(0)} />
              ) : (
                <VolumeUpIcon onClick={() => changeVolume(0)} />
              )}
            </IconButton>
            <Slider
              value={volume}
              min={0}
              max={1}
              step={0.1}
              onChange={(e, newValue) => changeVolume(newValue)}
              vertical
            />
            <Like songId={currentSong?._id} />
          </div>
        </div>
      ) : (
        <p>No song is currently playing.</p>
      )}
    </div>
  );
};

export default AudioPlayer;
