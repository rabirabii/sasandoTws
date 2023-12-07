import { useTheme } from "@emotion/react";
import React, { useContext } from "react";
import { ColorModeContext, tokens } from "../../../theme";
import { Avatar, Box, IconButton, InputBase } from "@mui/material";
import {
  DarkModeOutlined,
  NotificationsOutlined,
  Search,
  SettingsOutlined,
} from "@mui/icons-material";
import { backend_url_img } from "../../../server";
import { useSelector } from "react-redux";

const Topbar = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette?.mode);
  const colorMode = useContext(ColorModeContext);
  const { user } = useSelector((state) => state.user);
  return (
    <Box
      display="flex"
      justifyContent="space-between"
      p={2}
      border="1px solid transparent"
    >
      {/* Search bar */}
      <Box
        display="flex"
        backgroundColor={colors.primary[400]}
        borderRadius="3px"
      >
        <InputBase sx={{ ml: 2, flex: 1 }} placeholder="Search" />
        <IconButton type="button" sx={{ p: 1 }}>
          <Search />
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
