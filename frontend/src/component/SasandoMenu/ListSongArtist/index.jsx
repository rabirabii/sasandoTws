import React, { useEffect, useState } from "react";
import SongCard from "../../ArtistComponent/SongCard";
import { useDispatch, useSelector } from "react-redux";
import { server } from "../../../server";
import { addSongToPlaylist } from "../../../redux/actions/playlist";

const ListSongArtist = ({ song }) => {
  const [artistSongs, setArtistSongs] = useState([]);
  const dispatch = useDispatch();
  const { musisi } = useSelector((state) => state.musisi);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  useEffect(() => {
    const fetchArtistSongs = async () => {
      try {
        setIsLoading(true);

        const response = await fetch(
          `${server}/song/get-all-songs/${musisi._id}`
        );
        const data = await response.json();

        console.log("API Response:", data);

        setArtistSongs(data.songs);
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching songs:", error);
        setError(error.message);
        setIsLoading(false);
      }
    };

    if (musisi && musisi._id) {
      fetchArtistSongs();
    }
  }, [musisi]);

  const handleAddToPlaylist = (playlistId, songId) => {
    const payload = { playlistId, songId };
    addSongToPlaylist(payload, dispatch);
  };

  return (
    <div>
      <section className="py-10 bg-white">
        <div className="container mx-auto px-4">
          <h3 className="text-3xl font-semibold mb-6 text-center text-blueGray-800">
            Songs
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Improved SongCard component */}
            {artistSongs.map((song) => (
              <SongCard
                key={song.id}
                song={song}
                handleAddToPlaylist={handleAddToPlaylist}
              />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default ListSongArtist;
