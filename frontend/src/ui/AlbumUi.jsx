import React, { Fragment } from "react";
import { backend_url_img } from "../server";
import styles from "./styles.module.scss";
import { Link } from "react-router-dom";
const AlbumUi = ({ albums }) => {
  return (
    <Fragment>
      {albums.map((playlist) => (
        <Link key={playlist._id} to={`/album/${playlist._id}`}>
          <div className={styles.playlistCard}>
            <div className={styles.imageContainer}>
              <img
                src={
                  playlist.thumbnail
                    ? `${backend_url_img}${playlist.thumbnail}`
                    : "https://via.placeholder.com/300x200.png?text=Playlist"
                }
                alt={playlist.name}
                className={styles.playlistImage}
              />
            </div>
            <div className={styles.playlistInfo}>
              <h3 className={styles.playlistTitle}>{playlist.name}</h3>
              <p className={styles.playlistDesc}>{playlist.desc}</p>
            </div>
          </div>
        </Link>
      ))}
    </Fragment>
  );
};

export default AlbumUi;
