import React, { useEffect, useState } from "react";
import useResize from "resize-event";
import Logo from "../../asset/img/logo.jpg";
import CloseIcon from "@mui/icons-material/Close";
import MenuIcon from "@mui/icons-material/Menu";
import LibraryMusicOutlinedIcon from "@mui/icons-material/LibraryMusic";
import { Link, useNavigate } from "react-router-dom";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import IconButton from "@mui/material/IconButton";
import AlbumOutlinedIcon from "@mui/icons-material/AlbumOutlined";
import PaymentOutlinedIcon from "@mui/icons-material/PaymentOutlined";
import QuizOutlinedIcon from "@mui/icons-material/QuizOutlined";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import Button from "@mui/material/Button"; // Import Button component
import SignInButton from "../../ui/LoginButton";
import RegisterButton from "../../ui/RegisterButton";
import { useSelector } from "react-redux";
import { server } from "../../server";
import { toast } from "react-toastify";
import axios from "axios";
import { ArrowDropDown } from "@mui/icons-material";

const Navbar = () => {
  const navigate = useNavigate();
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const { isAuth, user } = useSelector((state) => state.user);
  const { musisi } = useSelector((state) => state.musisi);
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    window.addEventListener("resize", handleResize);

    handleResize();

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const toggleMobileMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const toggleProfileMenu = () => {
    setIsProfileMenuOpen(!isProfileMenuOpen);
  };

  const closeProfileMenu = () => {
    setIsProfileMenuOpen(false);
  };

  // Log out Logic
  const logoutHandler = () => {
    axios
      .get(`${server}/user/logout`, { withCredentials: true })
      .then((res) => {
        toast.success(res.data.message);
        window.location.reload(true);
        navigate("/login");
      })
      .catch((error) => {
        console.log(error.response.data.message);
      });
  };
  return (
    <div className="bg-white shadow-md p-2">
      <nav className="flex justify-between items-center py-4 px-6">
        <div>
          <img
            onClick={() => navigate("/")}
            src={Logo}
            alt="Logo Sasando"
            className="h-36 w-36 cursor-pointer"
          />
        </div>

        {isMobile ? (
          <>
            <IconButton
              color="primary"
              onClick={toggleMobileMenu}
              sx={{ ml: 2 }}
            >
              {isMenuOpen ? (
                <CloseIcon className="text-purple-800" />
              ) : (
                <MenuIcon className="text-purple-800" />
              )}
            </IconButton>
            <Menu
              anchorEl={anchorEl}
              open={isMenuOpen}
              onClose={() => setIsMenuOpen(false)}
              anchorOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              sx={{
                width: "80vw",
                maxWidth: "400px",
              }}
            >
              <MenuItem onClick={() => navigate("/songs")}>
                <LibraryMusicOutlinedIcon className="text-purple-800" />

                <Link to="/songs">Songs</Link>
              </MenuItem>
              <MenuItem onClick={() => navigate("/album")}>
                <AlbumOutlinedIcon className="text-purple-800" />

                <Link to="/album">Album</Link>
              </MenuItem>
              <MenuItem onClick={() => navigate("/price")}>
                <PaymentOutlinedIcon className="text-purple-800" />
                <Link to="/price">Pricing</Link>{" "}
              </MenuItem>
              <MenuItem onClick={() => navigate("/faq")}>
                <QuizOutlinedIcon className="text-purple-800" />
                <Link to="/faq">FAQ</Link>
              </MenuItem>
              <MenuItem onClick={() => navigate("/about")}>
                <InfoOutlinedIcon className="text-purple-800" />

                <Link to="/about">About</Link>
              </MenuItem>
              {isAuth ? (
                <>
                  <MenuItem onClick={() => navigate("/sasando/")}>
                    <Link to="/sasando/">Sasando Page</Link>
                  </MenuItem>
                  <MenuItem onClick={logoutHandler}>
                    <Link>Log Out</Link>
                  </MenuItem>
                </>
              ) : (
                <>
                  <MenuItem>
                    <SignInButton>Sign In</SignInButton>
                  </MenuItem>
                  <MenuItem>
                    <RegisterButton>Sign Up</RegisterButton>
                  </MenuItem>
                </>
              )}
            </Menu>
          </>
        ) : (
          <ul className="flex gap-4 text-base font-medium">
            <li onClick={() => navigate("/price")}>
              <PaymentOutlinedIcon className="text-purple-800" />
              <Link to="/price">Pricing</Link>
            </li>
            <li onClick={() => navigate("/faq")}>
              <QuizOutlinedIcon className="text-purple-800" />
              <Link to="/faq">FAQ</Link>
            </li>
            <li onClick={() => navigate("/about")}>
              <InfoOutlinedIcon className="text-purple-800" />
              <Link to="/about">About</Link>
            </li>

            {isAuth ? (
              <>
                <li className="relative group" onClick={toggleProfileMenu}>
                  <span className="text-bold text-xl group-hover:text-purple-800">
                    {user?.name}
                    {isProfileMenuOpen ? (
                      <CloseIcon sx={{ fontSize: 16 }} />
                    ) : (
                      <ArrowDropDown sx={{ fontSize: 16 }} />
                    )}{" "}
                  </span>
                  {isProfileMenuOpen && (
                    <ul className="mt-1 space-y-1 absolute right-0 bg-white border border-gray-300 rounded shadow-md">
                      <li
                        onClick={() => navigate("/sasando/")}
                        className="p-2 border-t border-gray-300"
                      >
                        <Link to="/sasando/">Go to Sasando </Link>
                      </li>
                      <li
                        onClick={logoutHandler}
                        className="p-2 border-t border-gray-300"
                      >
                        <Link>Log Out</Link>
                      </li>
                    </ul>
                  )}
                </li>
              </>
            ) : (
              <>
                <li>
                  <SignInButton>Sign In</SignInButton>
                </li>
                <li>
                  <RegisterButton>Sign Up</RegisterButton>
                </li>
              </>
            )}
          </ul>
        )}
      </nav>
    </div>
  );
};

export default Navbar;
