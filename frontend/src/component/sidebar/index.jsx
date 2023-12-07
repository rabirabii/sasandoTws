import React, { useState } from "react"; // Import useState
import Logo from "../../asset/img/logo.jpg";
import profile from "../../asset/img/default_profile.png";
import { Link, useNavigate } from "react-router-dom";
import {
  BarChartSharp,
  Chat,
  Home,
  LogoutOutlined,
  MenuOpen,
  PaymentOutlined,
  Person,
} from "@mui/icons-material";
import MenuIcon from "@mui/icons-material/Menu";
import { motion } from "framer-motion";
import axios from "axios";
import { backend_url, backend_url_img, server } from "../../server";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import defaultProfile from "../../asset/img/default_profile.png";
import "./sidebar.css";
const Sidebar = () => {
  const { isAuth, user } = useSelector((state) => state.user);
  const [selected, setSelected] = useState();
  const [expanded, setExpanded] = useState(true);
  const navigate = useNavigate();
  const SidebarData = [
    {
      icon: Home,
      heading: "Homepage",
      path: "/sasando/",
    },
    {
      icon: PaymentOutlined,
      heading: "Subsriction",
      path: "/",
    },
    {
      icon: Person,
      heading: "Profile",
      path: "/update-profile",
    },
    {
      icon: Chat,
      heading: "Chat",
      path: "/chat-page-user",
    },
  ];
  const sidebarVariant = {
    true: {
      left: "0",
    },
    false: {
      left: "-60%",
    },
  };
  console.log(window.innerWidth);

  const logoutHandler = () => {
    axios
      .get(`${server}/user/logout`, { withCredentials: true })
      .then((res) => {
        toast.success(res.data.message);
        window.location.reload();
        navigate("/login");
      })
      .catch((error) => {
        console.log(error.response.data.message);
      });
  };
  return (
    <>
      <div
        className="bars"
        style={expanded ? { left: "60%" } : { left: "5%" }}
        onClick={() => setExpanded(!expanded)}
      >
        <MenuIcon />
      </div>
      <motion.div
        className="sidebar"
        variants={sidebarVariant}
        animate={window.innerWidth <= 768 ? `${expanded}` : ``}
      >
        <div className="logo ">
          <img src={Logo} />
        </div>
        <div className="menu">
          {SidebarData.map((item, index) => {
            return (
              <div
                className={selected === index ? "menuItem active" : "menuItem"}
                key={index}
                onClick={() => {
                  setSelected(index);
                  navigate(item.path); // Use navigate to go to the specified route
                }}
              >
                <item.icon />
                <span>{item.heading}</span>
              </div>
            );
          })}
          <div
            className="flex items-center gap-4 h-10 ml-8 relative transition-all duration-300 ease-in-out rounded-2 font-medium text-base cursor-pointer"
            onClick={logoutHandler}
          >
            <LogoutOutlined />
            <span>Logout </span>
          </div>
          <div className="flex items-center justify-center">
            <img
              src={
                user?.avatar
                  ? `${backend_url_img}${user.avatar}`
                  : defaultProfile
              }
              alt="User Avatar"
              className="h-12 w-12 object-cover rounded-full"
            />
          </div>
          <div className="text-center mt-2 text-base font-medium text-purple-800">
            <span>Hello, {user?.name || "Unknown User"}</span>
          </div>
        </div>
      </motion.div>
    </>
  );
};

export default Sidebar;
