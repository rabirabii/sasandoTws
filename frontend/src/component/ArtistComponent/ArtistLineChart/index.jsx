import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllSongsArtist } from "../../../redux/actions/song";
import { Box } from "@mui/material";
import HeaderDashboard from "../../../ui/HeaderDashboard";
import LineChart from "../../../ArtistUI/LineChart";

const LineChartArtist = () => {
  const { musisi } = useSelector((state) => state.musisi);
  const { songs } = useSelector((state) => state.song);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getAllSongsArtist(musisi._id));
  }, [musisi.id]);

  return (
    <Box m="20px">
      <HeaderDashboard
        title="Line Chart of the Song"
        subtitle="Line chart for song revenue"
      />
      <Box height="75vh">
        <LineChart songs={songs} />
      </Box>
    </Box>
  );
};

export default LineChartArtist;
