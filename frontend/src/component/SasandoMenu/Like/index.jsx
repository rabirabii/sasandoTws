import React, { Fragment, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { CircularProgress, IconButton } from "@mui/material";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import styles from "./styles.module.scss";
import { likeSong } from "../../../redux/actions/user";
const Like = ({ songId }) => {
  const { user, likeSongProgress } = useSelector((state) => state.user);
  const [progress, setProgress] = useState(false);
  const dispatch = useDispatch();
  const isSongLiked = user && user.likedSongs.includes(songId);

  const handleLikeSong = async (songId) => {
    setProgress(true);
    try {
      await dispatch(likeSong(songId));
    } catch (error) {
      // Handle error
    } finally {
      setProgress(false);
    }
  };
  return (
    <IconButton
      className={styles.like_btn}
      onClick={() => handleLikeSong(songId)}
    >
      {likeSongProgress && progress ? (
        <CircularProgress style={{ color: "#1ed760" }} size="2rem" />
      ) : (
        <Fragment>
          {isSongLiked ? (
            <FavoriteIcon
              className={styles.like_filled}
              sx={{ color: "rgb(251 113 133)" }}
            />
          ) : (
            <FavoriteBorderIcon
              className={styles.like_outlined}
              sx={{ color: "rgb(251 113 133)" }}
            />
          )}
        </Fragment>
      )}
    </IconButton>
  );
};

export default Like;
