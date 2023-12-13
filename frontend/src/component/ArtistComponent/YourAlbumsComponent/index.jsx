import { Box, IconButton, useTheme } from "@mui/material";
import React, { useState } from "react";
import { tokens } from "../../../theme";
import FontHeader from "../../FontHeader";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { AddCircleOutline } from "@mui/icons-material";
import CreateSongForAlbum from "../../../ArtistUI/CreateAlbums";
import { useNavigate } from "react-router-dom";

const YourAlbumsComponent = ({ albums, isArtist = false }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedAlbumId, setSelectedAlbumId] = useState(null);
  const navigate = useNavigate();
  const handleCreateSongClick = (albumId) => {
    setSelectedAlbumId(albumId);
    navigate(`/createSongForAlbum/${albumId}`);
  };
  // Define Column
  const columns = [
    {
      field: "id",
      headerName: "Album ID",
      flex: 0.5,
      minWidth: 150,
      hidden: true,
    },
    { field: "name", headerName: "Album Name", minWidth: 180, flex: 1 },

    { field: "label", headerName: "Label", minWidth: 100, flex: 1 },
    { field: "releasedAt", headerName: "Released At", min: 150, flex: 1 },
  ];
  if (isArtist) {
    columns.push({
      field: "createSong",
      headerName: "Create Song",
      sortable: false,
      minWidth: 150,
      renderCell: (params) => (
        <IconButton
          color="primary"
          onClick={() => handleCreateSongClick(params.row.id)}
        >
          <AddCircleOutline />
        </IconButton>
      ),
    });
  }
  // Define Row

  const row = [];
  albums &&
    albums.forEach((item) => {
      row.push({
        id: item?._id,
        name: item?.name,

        label: item?.label,
        releasedAt: item?.releasedAt,
      });
    });
  return (
    <Box m="20px">
      <FontHeader title="ALBUMS" subtitle="List of albums" />
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
    </Box>
  );
};

export default YourAlbumsComponent;
