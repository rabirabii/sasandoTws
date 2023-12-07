import axios from "axios";
import React, { Fragment, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { backend_url_img, server } from "../../../server";
import { CircularProgress } from "@mui/material";
import { purple } from "@mui/material/colors";
import styles from "./styles.module.scss";
const TrackInfo = () => {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const { id } = useParams();
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${server}/song/get-song-info/${id}`);
        setData(response.data.song);
      } catch (error) {
        setError(error.messagwe);
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
              <p>Song</p>
              <h1>{data?.name}</h1>

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
                  </Link>
                  - <Link to={`/single/${data?._id}`}>{data?.name} </Link> -{" "}
                  {""}
                  {renderCreatedAtYear(data?.createdAt)} - {""}{" "}
                  {data?.totalListener} - {formatDuration(data?.duration)}
                </span>
              </div>
            </div>
          </div>
          <div className={styles.lyrics}>
            <div>
              <h1>Lyrics</h1>
            </div>

            <div className={styles.lyricsP}>
              <p>{data?.lyrics}</p>
            </div>
          </div>
          <div></div>
        </Fragment>
      )}
    </div>
  );
};

export default TrackInfo;
