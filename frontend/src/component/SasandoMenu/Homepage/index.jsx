import React, { Fragment, useEffect, useState } from "react";
import { backend_url_img, server } from "../../../server";
import axios from "axios";
import { CircularProgress } from "@mui/material";
import styles from "./styles.module.scss";
import PlaylistUI from "../../../ui/Playlist";
import { useDispatch, useSelector } from "react-redux";
import { setCurrentSong } from "../../../redux/musicPlayer";
import { getAllSongs } from "../../../redux/actions/song";
const Homepage = () => {
  const [firstPlaylist, setFirstPlaylist] = useState([]);
  const [secondPlaylists, setSecondPlaylist] = useState([]);
  const [isFetching, setIsFetching] = useState(false);
  const [timeOfDayGreeting, setTimeOfDayGreeting] = useState("");
  const { songs } = useSelector((state) => state.song) ?? { songs: [] };
  const dispatch = useDispatch();
  const handleSongClick = (selectedSongIndex) => {
    console.log("Clicked on song index:", selectedSongIndex);
    dispatch(setCurrentSong({ songIndex: selectedSongIndex }));
  };
  useEffect(() => {
    const getRandomPlaylist = async () => {
      try {
        setIsFetching(true);
        const response = await axios.get(`${server}/playlist/random`, {
          withCredentials: true,
        });

        const { data } = response;

        const array1 = data.playlist.slice(0, 4); // Use 'data.playlist' instead of 'data.data'
        const array2 = data.playlist; // Correct the variable name and slicing

        setFirstPlaylist(array1);
        setSecondPlaylist(array2);
        setIsFetching(false);
      } catch (error) {
        setIsFetching(false);
        console.error("Error fetching playlists:", error);
      }
    };

    getRandomPlaylist();

    // Determine time of day greeting
    const determineTimeOfDayGreeting = () => {
      const currentHour = new Date().getHours();
      if (currentHour >= 5 && currentHour < 12) {
        setTimeOfDayGreeting("Good morning");
      } else if (currentHour >= 12 && currentHour < 18) {
        setTimeOfDayGreeting("Good afternoon");
      } else {
        setTimeOfDayGreeting("Good evening");
      }
    };

    determineTimeOfDayGreeting();
  }, []);

  useEffect(() => {
    dispatch(getAllSongs());
  }, [dispatch]);
  const topSongs = songs
    .filter((song) => song.totalListener !== undefined) // Filter out songs without totalListener
    .sort((a, b) => b.totalListener - a.totalListener)
    .slice(0, 5);
  return (
    <Fragment>
      {isFetching ? (
        <div className={styles.progress_container}>
          <CircularProgress style={{ color: "#1ed760" }} size="5rem" />
        </div>
      ) : (
        <div className={styles.container}>
          <h1>{timeOfDayGreeting}</h1>
          <div className={styles.playlists_container}>
            <PlaylistUI playlists={firstPlaylist} />
          </div>
          <h1>Just the hits</h1>
          <div className={styles.playlists_container}>
            <PlaylistUI playlists={secondPlaylists} />
          </div>
        </div>
      )}
      <div className={styles.songsContainer}>
        <h1>Top Songs</h1>
        <div className="grid grid-cols-4 gap-4">
          {topSongs.map((song, index) => (
            <div
              key={song.id}
              onClick={() => handleSongClick(index)}
              className={`p-4 border rounded cursor-pointer ${styles.song_card}`}
            >
              {/* Display song information as a card */}
              <img
                src={`${backend_url_img}${song.img}`}
                alt={song.name}
                className="w-full h-auto mb-2"
              />
              <div>
                <p className="font-semibold">{song.name}</p>
                <p className="text-sm">{song.artist.name}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Fragment>
  );
};

export default Homepage;
