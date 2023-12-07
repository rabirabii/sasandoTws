import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  FaRegHeart,
  FaHeart,
  FaForward,
  FaStepForward,
  FaStepBackward,
  FaBackward,
  FaPlay,
  FaPause,
  FaShareAlt,
} from "react-icons/fa";
import { BsDownload } from "react-icons/bs";
import Like from "../Like";
import { backend_url_img, backend_url_song, server } from "../../../server";
import { setCurrentSong, togglePlayPause } from "../../../redux/actions/player";
import "./CobaPlayer.css";
const NowPlaying = () => {
  // Accessing the currentSong from the Redux store
  const currentSong = useSelector((state) => state.player.currentSong);
  const [trackProgress, setTrackProgress] = useState(0);
  const [duration, setDuration] = useState(0);
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
        setTrackProgress(audioRef.current.currentTime);
        audioRef?.current.duration && setDuration(audioRef.current.duration);
      } else {
        setTrackProgress(0);
      }
    }, [1000]);
  };
  // Function to handle repeat button click
  const handleRepeat = () => {
    setRepeatSong(!repeatSong);
    setInitialPlayRequestSent(false); // Reset the state when repeat mode changes
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
  // Count listener to the song and artist
  const sendPlayRequest = async (songId) => {
    try {
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
        console.log("Song play request sent successfully!");
      } else {
        // Handle errors if needed
        console.error("Failed to send song play request");
      }
    } catch (error) {
      console.error("Error sending song play request:", error);
      // Handle errors if needed
    }
  };
  const handleActions = () => {
    if (currentSong?.action === "play") {
      dispatch(setCurrentSong({ ...currentSong, action: "pause" }));
      audioRef.current.pause();
    } else {
      dispatch(setCurrentSong({ ...currentSong, action: "play" }));
      if (!initialPlayRequestSent || repeatSong) {
        if (repeatSong) {
          audioRef.current.currentTime = 0; // Reset the song to the beginning
        }
        sendPlayRequest(currentSong?._id);
      }
      audioRef.current.play();
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
    <div className="musicPlayer">
      <div className="songImage">
        <img src={`${backend_url_img}${currentSong?.img}`} alt="" />
      </div>
      <div className="songAttributes">
        <audio src={`${backend_url_song}${currentSong?.song}`} ref={audioRef} />

        <div className="top">
          <div className="left">
            <div className="loved" o>
              <Like songId={currentSong?._id} />
            </div>
            <i className="download">
              <BsDownload />
            </i>
          </div>

          <div className="middle">
            <div className="back">
              <i>
                <FaStepBackward />
              </i>
              <i>
                <FaBackward />
              </i>
            </div>
            <div className="playPause" onClick={handleActions}>
              {currentSong?.action === "play" ? (
                <i>
                  <FaPause />
                </i>
              ) : (
                <i>
                  <FaPlay />
                </i>
              )}
            </div>
            <div className="forward">
              <i>
                <FaForward />
              </i>
              <i>
                <FaStepForward />
              </i>
            </div>
          </div>

          <div className="right">
            <i>
              <FaShareAlt />
            </i>
          </div>
        </div>

        <div className="bottom">
          <div className="currentTime">{Math.floor(trackProgress)}</div>
          <input
            type="range"
            value={trackProgress}
            step="1"
            min="0"
            onChange={(e) => onScrub(e.target.value)}
            max={duration ? duration : 0}
          />
          <div className="duration">{formatDuration(Math.floor(duration))}</div>
        </div>
      </div>
    </div>
  );
};

export default NowPlaying;
