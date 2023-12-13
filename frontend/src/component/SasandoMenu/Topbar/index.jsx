import { useTheme } from "@emotion/react";
import React, { useContext } from "react";
import { ColorModeContext, tokens } from "../../../theme";
import { Avatar, Box, IconButton, InputBase } from "@mui/material";
import {
  ArrowLeftOutlined,
  ArrowRightOutlined,
  DarkModeOutlined,
  NotificationsOutlined,
  Search,
  SettingsOutlined,
} from "@mui/icons-material";
import { backend_url_img } from "../../../server";
import { useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { purple, teal } from "@mui/material/colors";

const Topbar = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette?.mode);
  const colorMode = useContext(ColorModeContext);
  const { user } = useSelector((state) => state.user);
  const location = useLocation();
  const navigate = useNavigate();
  return (
    <Box
      display="flex"
      justifyContent="space-between"
      p={2}
      border="1px solid transparent"
    >
      {/* Previous and Forward Button */}
      <Box display="flex">
        {location.pathname !== "/sasando/" && (
          <IconButton
            type="button"
            sx={{ p: 1 }}
            onClick={() => navigate(-1) || navigate("/sasando/")}
          >
            <ArrowLeftOutlined sx={{ fontSize: 30, color: "#6a1b9a" }} />
          </IconButton>
        )}
        <IconButton sx={{ p: 1 }} onClick={() => navigate(+1)}>
          <ArrowRightOutlined sx={{ fontSize: 30, color: "#6a1b9a" }} />
        </IconButton>
      </Box>

      {/* Icons */}
      <Box display="flex">
        <IconButton>
          <DarkModeOutlined />
        </IconButton>
        <IconButton>
          <NotificationsOutlined />
        </IconButton>
        <IconButton>
          <SettingsOutlined />
        </IconButton>
        <IconButton>
          <Avatar src={`${backend_url_img}${user?.avatar}`}></Avatar>
        </IconButton>
      </Box>
    </Box>
  );
};

export default Topbar;
