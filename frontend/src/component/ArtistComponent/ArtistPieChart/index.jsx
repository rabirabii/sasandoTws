import { Box } from "@mui/material";
import React, { useEffect } from "react";
import HeaderDashboard from "../../../ui/HeaderDashboard";
import PieChart from "../../../ArtistUI/PieChart";
import { useDispatch, useSelector } from "react-redux";
import { getAllSongsArtist } from "../../../redux/actions/song";

const ArtistPieChart = () => {
  const { musisi } = useSelector((state) => state.musisi);
  const { songs } = useSelector((state) => state.song);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getAllSongsArtist(musisi._id));
  }, [musisi.id]);

  return (
    <Box m="20px">
      <HeaderDashboard
        title="Pie Chart"
        subtitle="Pie chart of total Listener for each genre"
      />
      <Box height="75vh">
        <PieChart songs={songs} />
      </Box>
    </Box>
  );
};

export default ArtistPieChart;
