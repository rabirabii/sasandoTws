// import React, { useState } from "react";
// import styles from "./styles.module.scss";
// import { useDispatch, useSelector } from "react-redux";
// import { Link, useLocation, useNavigate } from "react-router-dom";
// import axios from "axios";
// import { server } from "../../../server";
// import { toast } from "react-toastify";

// import { ClickAwayListener } from "@mui/material";
// import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
// import ArrowDropUpIcon from "@mui/icons-material/ArrowDropUp";
// import ArrowBackIosRoundedIcon from "@mui/icons-material/ArrowBackIosRounded";
// import ArrowForwardIosRoundedIcon from "@mui/icons-material/ArrowForwardIosRounded";
// import AccountCircleIcon from "@mui/icons-material/AccountCircle";
// import PersonIcon from "@mui/icons-material/Person";
// import SettingsIcon from "@mui/icons-material/Settings";
// import LogoutIcon from "@mui/icons-material/Logout";
// const Navbar = () => {
//   const [menu, setMenu] = useState(null);
//   const { user } = useSelector((state) => state.user);
//   const dispatch = useDispatch();
//   const navigate = useNavigate();
//   const location = useLocation();
//   // Log out Logic
//   const handleLogout = () => {
//     axios
//       .get(`${server}/user/logout`, { withCredentials: true })
//       .then((res) => {
//         toast.success(res.data.message);
//         dispatch(setCurrentSong(null));
//         window.location.reload(true);
//         navigate("/login");
//       })
//       .catch((error) => {
//         console.log(error.response.data.message);
//       });
//   };

//   return (
//     <div className={styles.container}>
//       <div className={styles.left}>
//         {location.pathname !== "/sasando/" && (
//           <div
//             className={styles.icon}
//             onClick={() => navigate(-1) || navigate("/sasando/")}
//           >
//             <ArrowBackIosRoundedIcon />
//           </div>
//         )}
//         <div className={styles.icon} onClick={() => navigate(+1)}>
//           <ArrowForwardIosRoundedIcon />
//         </div>
//       </div>
//       <div className={styles.right}>
//         <div
//           style={{ backgroundColor: `${menu ? "#282828" : "#000"}` }}
//           className={styles.profile_menu}
//           onClick={() => setMenu(!menu)}
//         >
//           <AccountCircleIcon />
//           <p>{user && user.name}</p>
//           {menu ? <ArrowDropUpIcon /> : <ArrowDropDownIcon />}
//         </div>
//       </div>
//       {menu && (
//         <ClickAwayListener onClickAway={() => setMenu(false)}>
//           <div className={styles.menu} onClick={() => setMenu(false)}>
//             <Link to="/settings">
//               <div className={styles.options}>
//                 <p>Profile</p>
//                 <PersonIcon />
//               </div>
//             </Link>
//             <div className={styles.options}>
//               <p>Settings</p>
//               <SettingsIcon />
//             </div>
//             <div className={styles.options} onClick={handleLogout}>
//               <p>Logout</p>
//               <LogoutIcon />
//             </div>
//           </div>
//         </ClickAwayListener>
//       )}
//     </div>
//   );
// };

// export default Navbar;
