import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { server } from "../../../server";
import axios from "axios";

const GenrePage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState({
    songs: [],
    playlist: [],
    artist: [],
  });
  const navigate = useNavigate();
  const handleSearch = async () => {
    try {
      const response = await axios.get(
        `${server}/search/?search=${searchTerm}`,
        { withCredentials: true }
      );
      setSearchResults(response.data.result);
      navigate(`/search?search=${searchTerm}`);
    } catch (error) {
      console.error("Error fetching search results: ", error);
    }
  };

  const handleInputChange = (e) => {
    setSearchTerm(e.target.value);
  };

  return (
    <div>
      <input
        type="text"
        value={searchTerm}
        onChange={handleInputChange}
        placeholder="Search..."
      />
      <button onClick={handleSearch}>Search</button>
    </div>
  );
};

export default GenrePage;
