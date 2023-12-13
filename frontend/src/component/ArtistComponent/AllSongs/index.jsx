import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  useTheme,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { tokens } from "../../../theme";
import { deleteSong } from "../../../redux/actions/song";
import { DeleteOutline } from "@mui/icons-material";
import { backend_url_img, server } from "../../../server";
import FontHeader from "../../FontHeader";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
const AllSongComponent = () => {
  const { musisi } = useSelector((state) => state.musisi);
  const [artistSongs, setArtistSongs] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const theme = useTheme();
  const dispatch = useDispatch();
  const colors = tokens(theme.palette.mode);
  const [deleteConfirmationOpen, setDeleteConfirmationOpen] = useState(false);
  const [selectedSongId, setSelectedSongId] = useState(null);
  //   Fetched The Song of a Artist
  useEffect(() => {
    const fetchArtistSongs = async () => {
      try {
        setIsLoading(true);

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

  // Delete Song

  const handleDeleteConfirmationOpen = (id) => {
    setSelectedSongId(id);
    setDeleteConfirmationOpen(true);
  };

  const handleDeleteConfirmationClose = () => {
    setSelectedSongId(null);
    setDeleteConfirmationOpen(false);
  };
  const handleDelete = () => {
    dispatch(deleteSong(selectedSongId));
    handleDeleteConfirmationClose();
    window.location.reload();
  };

  //   Define Column
  const columns = [
    {
      field: "id",
      headerName: "Song ID",
      flex: 0.5,
      minWidth: 150,
      hidden: true,
    },
    { field: "name", headerName: "Song Name", minWidth: 180, flex: 1 },
    { field: "artist", headerName: "Artist", minWidth: 180, flex: 1 },
    { field: "genre", headerName: "Genre", minWidth: 100, flex: 0.7 },
    {
      field: "totalListener",
      headerName: "Total Listener",
      minWidth: 150,
      flex: 0.7,
    },
    {
      field: "revenue",
      headerName: "Total Revenue",
      minWidth: 150,
      flex: 0.5,
    },
    {
      field: "Delete",
      flex: 0.5,
      minWidth: 80,
      headerName: "Delete Song",
      type: "number",
      sortable: false,
      renderCell: (params) => {
        return (
          <>
            <Button onClick={() => handleDeleteConfirmationOpen(params.id)}>
              <DeleteOutline className="text-red-800" />
            </Button>
          </>
        );
      },
    },
  ];

  //   Define Row
  const row = [];
  artistSongs &&
    artistSongs.forEach((item) => {
      const revenue = item.totalListener * 0.012;
      row.push({
        id: item._id,
        name: item.name,
        artist: item.artist.name,
        genre: item.genre,
        totalListener: item.totalListener,
        revenue: revenue.toFixed(5),
      });
    });
  return (
    <Box m="20px">
      <FontHeader title="SONGS" subtitle="List of Songs" />
      <Box
        m="40px 0 0 0"
        height="75vh"
        sx={{
          "& .MuiDataGrid-root": {
            border: "none",
          },
          "& .MuiDataGrid-cell": {
            borderBottom: "none",
          },
          "& .name-column--cell": {
            color: colors.greenAccent[300],
          },
          "& .MuiDataGrid-columnHeaders": {
            backgroundColor: colors.blueAccent[700],
            borderBottom: "none",
          },
          "& .MuiDataGrid-virtualScroller": {
            backgroundColor: colors.primary[400],
          },
          "& .MuiDataGrid-footerContainer": {
            borderTop: "none",
            backgroundColor: colors.blueAccent[700],
          },
          "& .MuiCheckbox-root": {
            color: `${colors.greenAccent[200]} !important`,
          },
          "& .MuiDataGrid-toolbarContainer .MuiButton-text": {
            color: `${colors.grey[100]} !important`,
          },
        }}
      >
        <DataGrid
          rows={row}
          columns={columns}
          components={{ Toolbar: GridToolbar }}
        />
      </Box>
      <Dialog
        open={deleteConfirmationOpen}
        onClose={handleDeleteConfirmationClose}
      >
        <DialogTitle>Delete Confirmation</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to delete this songs ?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={handleDeleteConfirmationClose}
            style={{ color: colors.grey[100] }}
          >
            Cancel
          </Button>
          <Button
            onClick={() => handleDelete(selectedSongId)}
            style={{ color: colors.grey[100] }}
            autoFocus
          >
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default AllSongComponent;
