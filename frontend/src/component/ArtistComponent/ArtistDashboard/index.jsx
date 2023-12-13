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

import { BsEarbuds } from "react-icons/bs";
import LineChart from "../../../ArtistUI/LineChart";
import ProgressCircle from "../ProgressCircle";
import { ResponsiveBar } from "@nivo/bar";
import BarChart from "../../../ArtistUI/BarChart";
import PieChart from "../../../ArtistUI/PieChart";
const Dashboard = () => {
  const theme = useTheme();
  const colors = tokens(theme?.palette.mode);
  const { musisi } = useSelector((state) => state.musisi);
  const { songs } = useSelector((state) => state.song);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getAllSongsArtist(musisi._id));
  }, [musisi.id]);

  // Function to calculate the revenue for a single song
  const TotalRevenueForArtist = () => {
    return musisi.totalListeners * 0.012;
  };
  const totalRevenue = TotalRevenueForArtist();

  const songRevenueForEachSong = (song) => {
    return song.totalListener * 0.012;
  };

  const artistFollowerRevenue = () => {
    return musisi.follower * 0.003;
  };

  const totalRevenueofArtist = artistFollowerRevenue();
  const artistFollower = (totalRevenue + totalRevenueofArtist).toFixed(4);
  // Function to count the total number of songs for each genre

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
        {/* ROW 2 */}
        <Box
          gridColumn="span 8"
          gridRow="span 2"
          backgroundColor={colors.primary[400]}
        >
          <Box
            mt="25px"
            p="0 30px"
            display="flex "
            justifyContent="space-between"
            alignItems="center"
          >
            <Box>
              <Typography
                variant="h5"
                fontWeight="600"
                color={colors.grey[100]}
              >
                Revenue Generated
              </Typography>
              <Typography
                variant="h3"
                fontWeight="bold"
                color={colors.greenAccent[500]}
              >
                ${totalRevenue}
              </Typography>
            </Box>
            <Box>
              <IconButton>
                <DownloadOutlined
                  sx={{ fontSize: "26px", color: colors.greenAccent[500] }}
                />
              </IconButton>
            </Box>
          </Box>
          <Box
            height="250px"
            m="-20px 0 0 0"
            style={{
              overflowX: "auto",
              overflowY: "hidden",
            }}
          >
            <LineChart songs={songs} />
          </Box>
        </Box>
        <Box
          gridColumn="span 4"
          gridRow="span 2"
          backgroundColor={colors.primary[400]}
          overflow="auto"
        >
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
            borderBottom={`4px solid ${colors.primary[500]}`}
            colors={colors.grey[100]}
            p="15px"
          >
            <Typography color={colors.grey[100]} variant="h5" fontWeight="600">
              Recent Songs
            </Typography>
          </Box>
          {songs.map((song, i) => (
            <Box
              key={`${song._id}-${i}`}
              display="flex"
              justifyContent="space-between"
              alignItems="center"
              borderBottom={`4px solid ${colors.primary[500]}`}
              p="15px"
            >
              <Box>
                <Typography
                  color={colors.greenAccent[500]}
                  variant="h5"
                  fontSize="26px"
                  fontWeight="400"
                >
                  {song.name}
                </Typography>
                <Typography color={colors.grey[100]}>{song.genre}</Typography>
              </Box>
              <Box color={colors.grey[100]}>
                ${songRevenueForEachSong(song).toFixed(4)}
              </Box>
              <Box
                backgroundColor={colors.greenAccent[500]}
                p="5px 10px"
                borderRadius="4px"
              >
                {song.totalListener}
              </Box>
            </Box>
          ))}
        </Box>

        {/* Row 3 */}
        <Box
          gridColumn="span 4"
          gridRow="span 2"
          backgroundColor={colors.primary[400]}
          p="30px"
        >
          <Typography variant="h5" fontWeight="600">
            Total Revenue
          </Typography>
          <Box
            display="flex"
            flexDirection="column"
            alignItems="center"
            mt="25px"
          >
            <ProgressCircle size="125" />
            <Typography
              variant="h5"
              color={colors.greenAccent[500]}
              sx={{ mt: "15px" }}
              fontWeight="bold"
            >
              ${artistFollower}
            </Typography>
            <Typography>
              Includes total Revenue from total Listener and Follower
            </Typography>
          </Box>
        </Box>
        <Box
          gridColumn="span  4"
          gridRow="span 2"
          backgroundColor={colors.primary[400]}
        >
          <Typography
            variant="h5"
            fontWeight="600"
            sx={{ padding: "30px 30px 0 30px " }}
          >
            Total Songs
          </Typography>
          <Box height="250px" mt="-20px">
            <BarChart songs={songs} />
          </Box>
        </Box>
        <Box
          gridColumn="span 4"
          gridRow="span 2"
          backgroundColor={colors.primary[400]}
          padding="30px"
        >
          <Typography
            variant="h5"
            fontWeight="600"
            sx={{ marginBottom: "15px" }}
          >
            Total Listener of each Genre
          </Typography>
          <Box height="200px">
            <PieChart songs={songs} />
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default Dashboard;
