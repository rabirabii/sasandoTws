import axios from "axios";
import React, { Fragment, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { backend_url_img, server } from "../../../server";
import Song from "../Song";
import styles from "./styles.module.scss";
import { AccessTime } from "@mui/icons-material";
import { CircularProgress } from "@mui/material";
import { purple } from "@mui/material/colors";

const DetailSongInfo = () => {
  const [data, setData] = useState(null);
  const { songs } = useSelector((state) => state.song);
  const [isLoading, setIsLoading] = useState(true);
  const { id } = useParams();
  const [error, setError] = useState(null);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${server}/song/get-song-info/${id}`);
        setData(response.data.song);
      } catch (error) {
        setError(error.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [id]);

  const formatDuration = (timeInSecond) => {
    const minutes = Math.floor(timeInSecond / 60);
    const seconds = Math.floor(timeInSecond % 60);
    const formattedSeconds = seconds < 10 ? `0${seconds}` : seconds;
    return `${minutes}:${formattedSeconds}`;
  };

  const renderCreatedAtYear = (createdAt) => {
    if (createdAt) {
      const date = new Date(createdAt);
      return date.getFullYear();
    }
    return null;
  };

  if (isLoading) {
    return (
      <div className={styles.container}>
        <div className={styles.progress_container}>
          <CircularProgress style={{ color: purple }} size="5rem" />
        </div>
      </div>
    );
  }
  return (
    <div className={styles.container}>
      {data && (
        <Fragment>
          <div
            className={styles.head}
            style={{
              backgroundSize: "contain", // Adjust the background-size property
            }}
          >
            <div className={styles.head_gradient}></div>
            {data?.thumbnail === "" ? (
              <img
                src="https://static.thenounproject.com/png/17849-200.png"
                alt={data?.name}
                style={{ background: "#919496" }}
                className={styles.backgroundImg}
              />
            ) : (
              <img
                src={`${backend_url_img}${data?.img}`}
                alt={data?.name}
                className={styles.backgroundImg}
              />
            )}

            <div className={styles.playlist_info}>
              <p>Single</p>
              <h1>{data?.name}</h1>
              {Array.isArray(data) ? (
                <span>{data.length} song</span>
              ) : (
                <span>1 song</span>
              )}
              <div style={{ display: "flex", alignItems: "center" }}>
                {data?.artist?.avatar && (
                  <img
                    src={`${backend_url_img}${data?.artist?.avatar}`}
                    alt={`${data?.artist?.name}'s Avatar`}
                    className={styles.artist_avatar}
                    style={{
                      width: "30px",
                      height: "30px",
                      borderRadius: "50%",
                      marginRight: "0.5rem",
                    }}
                  />
                )}
                <span>
                  <Link to={`/artist/${data?.artist._id}`}>
                    {data?.artist?.name}
                  </Link>{" "}
                  - {renderCreatedAtYear(data?.createdAt)}
                </span>
              </div>
              <p>{formatDuration(data?.duration)}</p>
            </div>
          </div>
          <div className={styles.body}>
            <div className={styles.body_nav}>
              <div className={styles.left}>
                <span>#</span>
                <p>Title</p>
              </div>
              <div className={styles.center}>
                <p>Artist</p>
              </div>
              <div className={styles.right}>
                <AccessTime />
              </div>
            </div>
            {Array.isArray(data) ? (
              data.map((song) => (
                <Fragment key={song?._id}>
                  <Song song={song} />
                </Fragment>
              ))
            ) : (
              <Fragment key={data?._id}>
                <Song song={data} />
              </Fragment>
            )}
          </div>
        </Fragment>
      )}
    </div>
  );
};
export default DetailSongInfo;
