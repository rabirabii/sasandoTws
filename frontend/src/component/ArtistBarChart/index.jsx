import { Box } from "@mui/material";
import React, { useEffect } from "react";
import HeaderDashboard from "../../ui/HeaderDashboard";
import BarChart from "../../ArtistUI/BarChart";
import { useDispatch, useSelector } from "react-redux";
import { getAllSongsArtist } from "../../redux/actions/song";

const ArtistBarChart = () => {
  const { musisi } = useSelector((state) => state.musisi);
  const { songs } = useSelector((state) => state.song);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getAllSongsArtist(musisi._id));
  }, [musisi.id]);

  return (
    <Box m="20px">
      <HeaderDashboard
        title="Bar Chart of the Genre"
        subtitle="Bar chart for Genre"
      />
      <Box height="75vh">
        <BarChart songs={songs} />
      </Box>
    </Box>
  );
};

export default ArtistBarChart;
