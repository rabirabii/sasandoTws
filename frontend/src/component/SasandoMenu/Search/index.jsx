import React, { Fragment, useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import PlaylistUI from "../../../ui/Playlist";
import Song from "../Song";
import { CircularProgress, IconButton } from "@mui/material";
import { BsSearch } from "react-icons/bs";
import ClearIcon from "@mui/icons-material/Clear";
import styles from "./styles.module.scss";
import { purple } from "@mui/material/colors";
import { server } from "../../../server";
import AvatarUI from "../../../ui/Avatar";

function SearchComponent() {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState({
    songs: [],
    playlist: [],
    artist: [],
  });
  const [isFetching, setIsFetching] = useState(false);
  const navigate = useNavigate();
  const [filteredResults, setFilteredResults] = useState([]);
  const [activeFilter, setActiveFilter] = useState("all");
  const handleSearch = async () => {
    try {
      setIsFetching(true);
      const response = await axios.get(
        `${server}/search/?search=${searchTerm}`,
        { withCredentials: true }
      );
      setSearchResults(response.data.result);
      setFilteredResults(response.data.result);
      setIsFetching(false);
      navigate(`/search?search=${searchTerm}`);
    } catch (error) {
      console.error("Error fetching search results: ", error);
      setIsFetching(false);
    }
  };

  const handleInputChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const filterResults = (type) => {
    if (type === "all") {
      setFilteredResults(searchResults);
    } else {
      setFilteredResults(searchResults[type]);
    }
    setActiveFilter(type);
  };

  useEffect(() => {
    setFilteredResults(searchResults);
  }, [searchResults]);
  return (
    <div className={styles.container}>
      <div className={styles.search_input_container}>
        <IconButton onClick={handleSearch}>
          <BsSearch />
        </IconButton>
        <input
          type="text"
          value={searchTerm}
          onChange={handleInputChange}
          placeholder="Search..."
        />
        {searchTerm && (
          <IconButton onClick={() => setSearchTerm("")}>
            <ClearIcon />
          </IconButton>
        )}
      </div>
      {/* Filter buttons */}
      <div className={styles.filter_container}>
        <button
          className={activeFilter === "all" ? styles.active : ""}
          onClick={() => filterResults("all")}
        >
          All
        </button>
        <button
          className={activeFilter === "songs" ? styles.active : ""}
          onClick={() => filterResults("songs")}
        >
          Songs
        </button>
        <button
          className={activeFilter === "playlist" ? styles.active : ""}
          onClick={() => filterResults("playlist")}
        >
          Playlists
        </button>
        <button
          className={activeFilter === "artist" ? styles.active : ""}
          onClick={() => filterResults("artist")}
        >
          Artists
        </button>
      </div>
      {isFetching && (
        <div className={styles.progress_container}>
          <CircularProgress style={{ color: purple }} size="5rem" />
        </div>
      )}

      <div className={styles.results_container}>
        <div className={styles.results}>
          <div className={styles.section}>
            {activeFilter === "all" && (
              <>
                <h2>All Results</h2>
                <div className={styles.all_results_container}>
                  <div className={styles.grid_container}>
                    {searchResults.songs.length > 0 && (
                      <div className={styles.songs_container}>
                        <h3>Songs</h3>
                        <ul>
                          {searchResults.songs.map((song) => (
                            <Fragment key={song._id}>
                              <Song song={song} />
                            </Fragment>
                          ))}
                        </ul>
                      </div>
                    )}

                    {searchResults.artist.length > 0 && (
                      <div className={styles.artists_container}>
                        <h3>Artists</h3>
                        <ul>
                          <AvatarUI artist={searchResults.artist} />
                        </ul>
                      </div>
                    )}
                  </div>
                  {searchResults.playlist.length > 0 && (
                    <div className={styles.playlists_container}>
                      <h3 className="text-bold text-lg">Playlists</h3>
                      <PlaylistUI playlists={searchResults.playlist} />
                    </div>
                  )}
                </div>
              </>
            )}
          </div>
          <div className={styles.section}>
            {activeFilter === "songs" && (
              <>
                <h2>Songs</h2>
                <div className={styles.songs_container}>
                  {searchResults.songs.length > 0 ? (
                    <ul>
                      {searchResults.songs.map((song) => (
                        <Fragment key={song._id}>
                          <Song song={song} />
                        </Fragment>
                      ))}
                    </ul>
                  ) : (
                    <p>No songs found</p>
                  )}
                </div>
              </>
            )}
          </div>

          <div className={styles.section}>
            {activeFilter === "playlist" && (
              <>
                <h2>Playlists</h2>
                <div className={styles.playlists_container}>
                  {searchResults.playlist.length > 0 ? (
                    <PlaylistUI playlists={searchResults.playlist} />
                  ) : (
                    <p>No playlists found</p>
                  )}
                </div>
              </>
            )}
          </div>

          <div className={styles.section}>
            {activeFilter === "artist" && (
              <>
                <h2>Artists</h2>
                <div className={styles.artists_list}>
                  {searchResults.artist.length > 0 ? (
                    <AvatarUI artist={searchResults.artist} />
                  ) : (
                    <p>No Artist found</p>
                  )}
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default SearchComponent;
