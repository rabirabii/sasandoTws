import React, { useEffect, useState } from "react";
import { server } from "../../../server";
import { useSelector } from "react-redux";
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import "./table.css";
const ArtistDashTable = () => {
  const { musisi } = useSelector((state) => state.musisi);
  const [artistSongs, setArtistSongs] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchArtistSongs = async () => {
      try {
        setIsLoading(true);

        // Replace 'YOUR_API_ENDPOINT' with the actual API endpoint
        const response = await fetch(
          `${server}/song/get-all-songs/${musisi._id}`
        );
        const data = await response.json();

        console.log("API Response:", data);

        setArtistSongs(data.songs); // Adjust the property based on your API response
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

  const makeStyle = () => {
    if (artistSongs.status === "accepted") {
      return {
        background: `rgb(145 254 159 /47%)`,
        color: "green",
      };
    } else if (artistSongs === "pending") {
      return {
        background: "#ffadad8f",
        color: "red",
      };
    } else {
      return {
        background: "#59bfff",
        color: "white",
      };
    }
  };
  return (
    <div className="Table">
      <h3>Recent Songs</h3>
      <TableContainer
        component={Paper}
        style={{ boxShadow: "0px 13px 20px 0px #80808029" }}
      >
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Song</TableCell>
              <TableCell align="left">Song ID</TableCell>
              <TableCell align="left">Date</TableCell>
              <TableCell align="left">Status</TableCell>
              <TableCell align="left"></TableCell>
            </TableRow>
          </TableHead>
          <TableBody style={{ color: "white" }}>
            {artistSongs.map((row) => (
              <TableRow
                key={row.name}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {row.name}
                </TableCell>
                <TableCell align="left">{row._id}</TableCell>
                <TableCell align="left">{row.createdAt}</TableCell>
                <TableCell align="left">
                  <span className="status" style={makeStyle(row.status)}>
                    {row.status}
                  </span>
                </TableCell>
                <TableCell align="left" className="Details">
                  Details
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default ArtistDashTable;
