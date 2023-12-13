import React, { useEffect, useState } from "react";
import SongCard from "../../ArtistComponent/SongCard";
import { useDispatch, useSelector } from "react-redux";
import { server } from "../../../server";
import { addSongToPlaylist } from "../../../redux/actions/playlist";
import { useParams } from "react-router-dom";
import { getAllSongsArtist } from "../../../redux/actions/song";
import { toast } from "react-toastify";
import PlaylistUI from "../../../ui/Playlist";
import { getAllAlbumsArtist } from "../../../redux/actions/album";
import AlbumUi from "../../../ui/AlbumUi";

const ListSongPreview = ({ song }) => {
  const [artistSongs, setArtistSongs] = useState([]);
  const dispatch = useDispatch();
  const { songs } = useSelector((state) => state.song);
  const { albums } = useSelector((state) => state.album);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const { id } = useParams();
  useEffect(() => {
    dispatch(getAllSongsArtist(id));
    dispatch(getAllAlbumsArtist(id));
  }, []);

  const handleAddToPlaylist = (playlistId, songId) => {
    const payload = { playlistId, songId };
    addSongToPlaylist(payload, dispatch)
      .then(() => {
        toast.success("Song added to playlist successfully!");
      })
      .catch((error) => {
        toast.error("Failed to add song to playlist. Please try again.");
      });
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
            {songs.map((song) => (
              <SongCard
                key={song._id}
                song={song}
                handleAddToPlaylist={handleAddToPlaylist}
              />
            ))}
          </div>
        </div>
      </section>
      <section className="py-10 bg-white">
        <div className="container mx-auto px-4">
          <h3 className="text-3xl font-semibold mb-6 text-center text-blueGray-800">
            Albums
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Improved SongCard component */}

            <AlbumUi key={albums._id} albums={albums} />
          </div>
        </div>
      </section>
    </div>
  );
};

export default ListSongPreview;
