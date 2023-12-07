import { Box, Button, IconButton, Typography, useTheme } from "@mui/material";

import HText from "../../../ui/HText";
import {
  AlbumOutlined,
  AudioFileOutlined,
  DownloadOutlined,
  MusicNoteOutlined,
  PersonAdd,
  PointOfSale,
  Traffic,
} from "@mui/icons-material";
import { tokens } from "../../../theme";
import HeaderDashboard from "../../../ui/HeaderDashboard";
import StatBox from "../StatBox";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getAllSongsArtist } from "../../../redux/actions/song";
// import Header from "../../components/Header";
// import LineChart from "../../components/LineChart";
// import GeographyChart from "../../components/GeographyChart";
// import BarChart from "../../components/BarChart";
// import StatBox from "../../components/StatBox";
// import ProgressCircle from "../../components/ProgressCircle";
import { BsEarbuds } from "react-icons/bs";

const Dashboard = () => {
  const theme = useTheme();
  const colors = tokens(theme?.palette.mode);
  const { musisi } = useSelector((state) => state.musisi);
  const { songs } = useSelector((state) => state.song);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getAllSongsArtist(musisi._id));
  }, [musisi.id]);
  return (
    <Box m="20px">
      {/* HEADER */}
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <HeaderDashboard
          title="DASHBOARD"
          subtitle="Welcome to your dashboard"
        />

        <Box>
          <Button
            sx={{
              backgroundColor: colors.blueAccent[700],
              color: colors.grey[100],
              fontSize: "14px",
              fontWeight: "bold",
              padding: "10px 20px",
            }}
          >
            <DownloadOutlined sx={{ mr: "10px" }} />
            Download Reports
          </Button>
        </Box>
      </Box>
      {/* Grid & Charts */}

      {/* Row 1 */}
      <Box
        display="grid"
        gridTemplateColumns="repeat(12, 1fr)"
        gridAutoRows="140px"
        gap="20px"
      >
        {/* ROW 1 */}
        <Box
          gridColumn="span 3"
          backgroundColor={colors.primary[400]}
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <StatBox
            title={songs.length}
            subtitle="Single"
            progress="0.75"
            increase=""
            icon={
              <MusicNoteOutlined
                sx={{ color: colors.greenAccent[600], fontSize: "26px" }}
              />
            }
          />
        </Box>
        <Box
          gridColumn="span 3"
          backgroundColor={colors.primary[400]}
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <StatBox
            title={musisi.albums.length}
            subtitle="Albums"
            progress="0.50"
            increase=""
            icon={
              <AlbumOutlined
                sx={{ color: colors.greenAccent[600], fontSize: "26px" }}
              />
            }
          />
        </Box>
        <Box
          gridColumn="span 3"
          backgroundColor={colors.primary[400]}
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <StatBox
            title={musisi?.totalListeners}
            subtitle="Total Listeners"
            progress="0.30"
            increase=""
            icon={
              <BsEarbuds
                style={{ color: colors.greenAccent[600], fontSize: "26px" }}
              />
            }
          />
        </Box>
        <Box
          gridColumn="span 3"
          backgroundColor={colors.primary[400]}
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <StatBox
            title={musisi?.follower}
            subtitle="Follower"
            progress="0.80"
            increase=""
            icon={
              <PersonAdd
                sx={{ color: colors.greenAccent[600], fontSize: "26px" }}
              />
            }
          />
        </Box>
      </Box>
    </Box>
  );
};

export default Dashboard;
