import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { backend_url_img, backend_url_song, server } from "../../server";
import { getAllSongs } from "../../redux/actions/song";

const ListedArtist = () => {
  const { songs } = useSelector((state) => state.song) ?? { songs: [] };
  const [artists, setArtists] = useState([]);
  const [data, setData] = useState([]);
  const dispatch = useDispatch();
  const { musisi, error, successMessage } = useSelector(
    (state) => state.musisi
  );
  useEffect(() => {
    const fetchArtists = async () => {
      try {
        const response = await fetch(`${server}/artist/get-all-musisi`);
        const data = await response.json();
        setArtists(data.artists.slice(0, 6));
      } catch (error) {
        console.error("Error fetching artists:", error);
      }
    };

    fetchArtists();
  }, []); // Remove setArtists from the dependency array

  useEffect(() => {
    // Update the data state only if it's different from the current songs
    if (data !== songs) {
      setData(songs);
    }
  }, [setData, songs, data]);
  if (!artists || artists.length === 0) {
    return <p>Loading...</p>;
  }

  const topSixSongs = songs.slice(0, 6);

  return (
    <section className="miscellaneous-area section-padding-100-0">
      <div className="container">
        <div className="row">
          {/* Weeks top */}
          <div className="col-12 col-lg-4">
            <div className="weeks-top-area mb-100">
              <div
                className="section-heading text-left mb-50 wow fadeInUp"
                data-wow-delay="50ms"
              >
                <p className="p-song-play-area">See What's new</p>
                <h2 className="h2-song-play-area">This week's top</h2>
              </div>
              {/* Single Top Item */}

              {topSixSongs.map((song, index) => (
                <div key={index}>
                  <div
                    className="single-top-item  d-flex wow fadeInUp"
                    data-wow-delay={`100ms * ${index}`}
                  >
                    <div className="thumbnail">
                      <img
                        src={`${backend_url_img}${song.img}`}
                        alt="single top item avatar"
                      />
                    </div>
                    <div className="content-">
                      <h6>{song.artist.name}</h6>
                      <p>{song.name}</p>
                      {/* Add other relevant information here */}
                    </div>
                  </div>
                </div>
              ))}
            </div>
            {/* New Hits Songs */}
          </div>
          <div className="col-12 col-lg-4">
            <div className="new-hits-area mb-100">
              <div
                className="section-heading text-left mb-50 wow fadeInUp"
                data-wow-delay="500ms"
              >
                <p className="p-song-play-area">See What's Mew</p>
                <h2 className="h2-song-play-area"> New Hits</h2>
              </div>

              {/* Single Top Item */}
              {topSixSongs.map((song, index) => (
                <div key={index}>
                  <div
                    className="single-new-item d-flex align-items-center justify-content-between wow fadeInUp"
                    data-wow-delay="100ms"
                  >
                    <div className="first-part d-flex align-items-center">
                      <div className="thumbnail">
                        <img src={`${backend_url_img}${song.img}`} />
                      </div>
                      <div className="content-">
                        <h6>{song.artist.name}</h6>
                        <p>{song.name}</p>
                      </div>
                    </div>
                    <audio
                      id={`audio-${song._id}`}
                      className="audio"
                      preload="auto"
                      controls
                    >
                      <source src={`${backend_url_song}${song.song}`} />
                    </audio>
                  </div>
                </div>
              ))}
            </div>
          </div>
          {/* Top Artist */}
          <div className="col-12 col-lg-4">
            <div className="popular-artist-area mb-100">
              <div
                className="section-heading text-left mb-50 wow fadeInUp"
                data-wow-delay="50ms"
              >
                <p className="p-song-play-area"> See What's New</p>
                <h2 className="h2-song-play-area">Popular Artist</h2>
              </div>

              {/* Single Artist */}
              {artists.map((musisi, index) => (
                <div key={index}>
                  <div
                    className="single-artists d-flex align-items-center wow fadeInUp"
                    data-wow-delay="100ms"
                  >
                    <div className="thumbnail">
                      <img
                        src={`${backend_url_img}${musisi.avatar}`}
                        alt={`Thumbnail for ${musisi.name}`}
                      />
                    </div>
                    <div className="content-">
                      <p>{musisi.name}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ListedArtist;
