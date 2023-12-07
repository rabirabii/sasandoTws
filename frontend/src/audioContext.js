// AudioPlayerContext.js
import React, {
  createContext,
  useState,
  useContext,
  useRef,
  useEffect,
} from "react";
import { backend_url_song } from "./server";
import axios from "axios";

const AudioPlayerContext = createContext();

export const AudioPlayerProvider = ({ children }) => {
  const [currentSong, setCurrentSong] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef(new Audio());

  useEffect(() => {
    if (currentSong) {
      axios
        .get(`${backend_url_song}${currentSong.song}`, {
          withCredential: true,
        })
        .then((response) => {
          console.log("Fetched song data:", response.data); // Check the fetched data
          audioRef.current.src = response.data.audioUrl; // Assuming you get audioUrl from the backend response
          if (isPlaying) {
            audioRef.current.play().catch((error) => {
              console.error("Error playing audio:", error);
              setIsPlaying(false);
            });
          } else {
            audioRef.current.pause();
          }
        })
        .catch((error) => {
          console.error("Error fetching song details:", error);
        });
    }
  }, [currentSong, isPlaying]);

  const playSong = (song) => {
    setCurrentSong(song);
    setIsPlaying(true);
  };

  const pauseSong = () => {
    setIsPlaying(false);
  };

  return (
    <AudioPlayerContext.Provider
      value={{ currentSong, isPlaying, playSong, pauseSong }}
    >
      {children}
    </AudioPlayerContext.Provider>
  );
};

export const useAudioPlayer = () => {
  return useContext(AudioPlayerContext);
};
