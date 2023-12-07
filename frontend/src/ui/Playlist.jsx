import { Fragment } from "react";
import { Link } from "react-router-dom";
import styles from "./styles.module.scss";
import { backend_url_img } from "../server";

const PlaylistUI = ({ playlists }) => {
  return (
    <Fragment>
      {playlists.map((playlist) => (
        <Link key={playlist._id} to={`/playlist/${playlist._id}`}>
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

export default PlaylistUI;
