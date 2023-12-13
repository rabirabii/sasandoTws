import { useEffect, useState } from "react";
import { ProSidebar, Menu, MenuItem } from "react-pro-sidebar";
import { Box, Button, IconButton, Typography, useTheme } from "@mui/material";
import { Link, Navigate } from "react-router-dom";
import "react-pro-sidebar/dist/css/styles.css";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import PeopleOutlinedIcon from "@mui/icons-material/PeopleOutlined";
import ContactsOutlinedIcon from "@mui/icons-material/ContactsOutlined";
import ReceiptOutlinedIcon from "@mui/icons-material/ReceiptOutlined";
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import CalendarTodayOutlinedIcon from "@mui/icons-material/CalendarTodayOutlined";
import HelpOutlineOutlinedIcon from "@mui/icons-material/HelpOutlineOutlined";
import BarChartOutlinedIcon from "@mui/icons-material/BarChartOutlined";
import PieChartOutlineOutlinedIcon from "@mui/icons-material/PieChartOutlineOutlined";
import TimelineOutlinedIcon from "@mui/icons-material/TimelineOutlined";
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";
import MapOutlinedIcon from "@mui/icons-material/MapOutlined";
import LogoutIcon from "@mui/icons-material/Logout";
import { tokens } from "../../../theme";
import { useDispatch, useSelector } from "react-redux";
import { backend_url_img, server } from "../../../server";
import axios from "axios";
import { toast } from "react-toastify";
import {
  LibraryMusic,
  LibraryMusicOutlined,
  MusicNoteOutlined,
  Search,
} from "@mui/icons-material";
import { createPlaylist } from "../../../redux/actions/playlist";
const Item = ({ title, to, icon, selected, setSelected }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  return (
    <MenuItem
      active={selected === title}
      style={{
        color: colors.grey[100],
      }}
      onClick={() => setSelected(title)}
      icon={icon}
    >
      <Typography>{title}</Typography>
      <Link to={to} />
    </MenuItem>
  );
};

const Sidebar = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [isCollapsed, setIsCollapsed] = useState(false);
  // const { playlists } = useSelector((state) => state.playlist);
  const [selected, setSelected] = useState("Sasando/");
  const [playlists, setPlaylists] = useState([]);

  useEffect(() => {
    // Fetch playlists from the backend when the component mounts
    const fetchFavPlaylist = async () => {
      try {
        const response = await axios.get(`${server}/playlist/favourite`, {
          withCredentials: true,
        }); // Replace with your API endpoint
        const fetchedPlaylists = response.data.playlist.splice(0, 4);
        setPlaylists(fetchedPlaylists);
      } catch (error) {
        console.error("Error fetching playlists:", error);
        // Handle error (show a message, etc.)
      }
    };

    fetchFavPlaylist();
  }, []); //
  const { user } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const handleCreatePlayList = () => {
    const data = {
      name: "My Playlist #" + (playlists.length + 1),
      ownerId: user._id,
      desc: "By " + user.name,
      songs: [],
      thumbnail: "",
      gambar: "",
    };
    // Dispatch an action to create the playlist
    createPlaylist(data, dispatch);
    // You can set the selected playlist here if needed
    setSelected("My Playlist #" + (playlists.length + 1));
  };
  const logoutHandler = () => {
    axios
      .get(`${server}/user/logout`, { withCredentials: true })
      .then((res) => {
        toast.success(res.data.message);
        window.location.reload(true);
        Navigate("/login");
      })
      .catch((error) => {
        console.log(error.response.data.message);
      });
  };
  return (
    <Box
      sx={{
        "& .pro-sidebar-inner": {
          background: `${colors.primary[400]} !important`,
        },
        "& .pro-icon-wrapper": {
          backgroundColor: "transparent !important",
        },
        "& .pro-inner-item": {
          padding: "5px 35px 5px 20px !important",
        },
        "& .pro-inner-item:hover": {
          color: "#868dfb !important",
        },
        "& .pro-menu-item.active": {
          color: "#6870fa !important",
        },
      }}
    >
      <ProSidebar collapsed={isCollapsed}>
        <Menu iconShape="square">
          {/* LOGO AND MENU ICON */}
          <MenuItem
            onClick={() => setIsCollapsed(!isCollapsed)}
            icon={isCollapsed ? <MenuOutlinedIcon /> : undefined}
            style={{
              margin: "10px 0 20px 0",
              color: colors.grey[100],
            }}
          >
            {!isCollapsed && (
              <Box
                display="flex"
                justifyContent="space-between"
                alignItems="center"
                ml="15px"
              >
                <Typography variant="h3" color={colors.grey[100]}>
                  Sasando
                </Typography>
                <IconButton onClick={() => setIsCollapsed(!isCollapsed)}>
                  <MenuOutlinedIcon />
                </IconButton>
              </Box>
            )}
          </MenuItem>

          {!isCollapsed && (
            <Box mb="25px">
              <Box display="flex" justifyContent="center" alignItems="center">
                <img
                  alt="profile-user"
                  width="100px"
                  height="100px"
                  src={`${backend_url_img}${user?.avatar}`}
                  style={{ cursor: "pointer", borderRadius: "50%" }}
                />
              </Box>
              <Box textAlign="center">
                <Typography
                  variant="h4"
                  className="text-purple-800"
                  fontWeight="bold"
                  sx={{ m: "10px 0 0 0" }}
                >
                  {user?.name}
                </Typography>
                <Typography variant="h5" color={colors.greenAccent[500]}>
                  {user?.role}
                </Typography>
              </Box>
            </Box>
          )}

          <Box paddingLeft={isCollapsed ? undefined : "10%"}>
            <Item
              title="Homepage"
              to="/sasando/"
              icon={<HomeOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            />
            <Item
              title="Search"
              to="/search"
              icon={<Search />}
              selected={selected}
              setSelected={setSelected}
            />

            <Typography
              variant="h6"
              color={colors.grey[300]}
              sx={{ m: "15px 0 5px 20px" }}
            >
              Playlist
            </Typography>
            <Item
              title="Create Playlist"
              icon={<LibraryMusicOutlined />}
              selected={selected}
              setSelected={handleCreatePlayList}
            />
            {Array.isArray(playlists) &&
              playlists.map((playlist) => (
                <Item
                  key={playlist._id}
                  to={`/playlist/${playlist._id}`}
                  title={playlist.name}
                  icon={<MusicNoteOutlined />}
                  selected={selected === playlist.name}
                  setSelected={setSelected}
                />
              ))}

            <Typography
              variant="h6"
              color={colors.grey[300]}
              sx={{ m: "15px 0 5px 20px" }}
            >
              Liked Songs
            </Typography>
            <Item
              title="Collections"
              to="/collections/tracks"
              icon={<PersonOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            />
            <Item
              title="Update Profile"
              to="/update-profile"
              icon={<CalendarTodayOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            />
            <Item
              title="Library"
              to="/collections/library"
              icon={<LibraryMusic />}
              selected={selected}
              setSelected={setSelected}
            />

            {/* <Typography
              variant="h6"
              color={colors.grey[300]}
              sx={{ m: "15px 0 5px 20px" }}
            >
              Charts
            </Typography> */}

            <Button
              variant="h6"
              sx={{ m: "15px 0 5px 20px", color: "black" }}
              onClick={logoutHandler}
              title="Logout"
              cursor="pointer"
            >
              Log Out
            </Button>
          </Box>
        </Menu>
      </ProSidebar>
    </Box>
  );
};

export default Sidebar;
