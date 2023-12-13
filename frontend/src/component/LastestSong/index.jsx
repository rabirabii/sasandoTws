import React, { useEffect, useState } from "react";
import FA from "../../asset/img/fa.jpg";
import BG4 from "../../asset/img/2v2.jpeg";
import Song from "../../asset/audio/kinggnu.mp3";
import axios from "axios";
import { backend_url_img, backend_url_song, server } from "../../server";
import { useSelector } from "react-redux";

function FeaturedArtistSection() {
  const [song, setSong] = useState(null);
  const songId = "65644e5fd35768354a96a9ce";
  const { musisi, error, successMessage } = useSelector(
    (state) => state.musisi
  );

  useEffect(() => {
    const fetchSong = async () => {
      try {
        const response = await axios.get(
          `${server}/song/get-song-info/${songId}`
        );
        setSong(response.data.song);
      } catch (error) {
        console.error("Error getting song", error);
      }
    };
    fetchSong();
  }, [songId]);

  if (!song) {
    return <div>Loading . . . </div>;
  }
  return (
    <section
      className="featured-artist-area section-padding-100 bg-img bg-overlay bg-fixed"
      style={{
        backgroundImage: `url(${backend_url_img}${song?.artist?.backgroundImg})`,
        backgroundSize: "cover",
      }}
    >
      <div className="container">
        <div className="flex items-end">
          {" "}
          {/* Updated class */}
          <div className="w-full md:w-6/12 lg:w-5/12 mb-8 md:mb-0 gap-2 mr-8">
            <div className="featured-artist-thumb">
              <img
                src={`${backend_url_img}${song?.img}`}
                alt="Featured Artist"
                className="rounded-lg shadow-lg"
                style={{
                  maxWidth: "100%",
                  height: "auto",
                  width: "250px",
                  height: "250px",
                }}
              />
            </div>
          </div>
          <div className="col-span-12 md:col-span-7 lg:col-span-8">
            <div className="featured-artist-content">
              <div className="section-heading text-white text-left mb-30">
                <p className="p-song-play-area">Discover the Latest</p>
                <h2 className="h2-song-play-area">
                  New Releases from {""}
                  {song?.artist.name}
                </h2>
              </div>
              <p className=" p-song-play-area">{song?.description}</p>
              <div className="song-play-area">
                <div className="song-name mb-2">
                  <p className="text-xl font-bold ">{song?.name}</p>
                </div>
                <audio controls className="w-full audioplayer" preload="auto">
                  <source src={`${backend_url_song}${song.song}`} />
                </audio>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default FeaturedArtistSection;
