import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { backend_url_img, server } from "../../../server";
import SongCard from "../SongCard";
import { addSongToPlaylist } from "../../../redux/actions/playlist";
import { Link } from "react-router-dom";
import {
  FacebookOutlined,
  Instagram,
  LanguageOutlined,
  Twitter,
  WebStoriesOutlined,
  YouTube,
} from "@mui/icons-material";
import { GiWorld } from "react-icons/gi";

const ProfileComponent = ({ isOwner }) => {
  const { musisi } = useSelector((state) => state.musisi);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showFullAbout, setShowFullAbout] = useState(false);
  const [artistSongs, setArtistSongs] = useState([]);

  useEffect(() => {
    const fetchArtistSongs = async () => {
      try {
        setIsLoading(true);

        // Replace 'YOUR_API_ENDPOINT' with the actual API endpoint
        const response = await fetch(
          `${server}/song/get-all-songs/${musisi._id}`
        );
        const data = await response.json();

        console.log("API Response:", data);

        setArtistSongs(data.songs); // Adjust the property based on your API response
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching songs:", error);
        setError(error.message);
        setIsLoading(false);
      }
    };

    if (musisi && musisi._id) {
      fetchArtistSongs();
    }
  }, [musisi]);

  const handleShowMore = () => {
    setShowFullAbout(!showFullAbout);
  };

  return (
    <>
      {/* component */}
      <main className="profile-page h-3/4">
        <section className="relative h-screen">
          <div
            className="absolute top-0 w-full h-3/4 bg-center bg-no-repeat"
            style={{
              backgroundImage: `url(${backend_url_img}${musisi.backgroundImg})`,
              backgroundSize: "contain", // Adjust the background-size property
            }}
          >
            <span
              id="blackOverlay"
              className="w-full h-full absolute opacity-50 bg-black"
            />
          </div>
          <div
            className="top-auto bottom-0 left-0 right-0 w-full absolute pointer-events-none overflow-hidden h-70-px"
            style={{ transform: "translateZ(0px)" }}
          >
            <svg
              className="absolute bottom-0 overflow-hidden"
              xmlns="http://www.w3.org/2000/svg"
              preserveAspectRatio="none"
              version="1.1"
              viewBox="0 0 2560 100"
              x={0}
              y={0}
            >
              <polygon
                className="text-blueGray-200 fill-current"
                points="2560 0 2560 100 0 100"
              />
            </svg>
          </div>
        </section>
        <section className="relative py-16 bg-blueGray-200">
          <div className="container mx-auto px-4">
            <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-xl rounded-lg -mt-64">
              {/* ... (your existing code) */}
              <div className="px-6">
                <div className="flex flex-wrap justify-center">
                  <div className="w-full lg:w-3/12 px-4 lg:order-2 flex justify-center">
                    <div className="relative">
                      <img
                        alt="profile-user"
                        style={{
                          width: "150px",
                          height: "150px",
                          objectFit: "cover", // Ensures the image covers the container
                          borderRadius: "50%", // Adds a circular border
                          boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)", // Adds a subtle shadow
                          transition: "transform 0.2s ease-in-out", // Smooth hover effect
                        }}
                        src={`${backend_url_img}${musisi?.avatar}`}
                        onLoad={() => setIsLoading(false)} // Set loading state to false when image loads
                        onError={() => setError(true)} // Handle error if the image fails to load
                        onMouseOver={(e) => {
                          e.target.style.transform = "scale(1.1)"; // Zoom effect on hover
                        }}
                        onMouseOut={(e) => {
                          e.target.style.transform = "scale(1)"; // Revert zoom on hover out
                        }}
                      />
                      {/* Placeholder or Loading State */}
                      {isLoading && <div>Loading...</div>}
                      {/* Error State */}
                      {error && <div>Error loading image</div>}
                    </div>
                  </div>
                  <div className="w-full lg:w-4/12 px-4 lg:order-3 lg:text-right lg:self-center">
                    <div className="py-6 px-3 mt-32 sm:mt-0">
                      <button
                        className="bg-pink-500 active:bg-pink-600 uppercase text-white font-bold hover:shadow-md shadow text-xs px-4 py-2 rounded outline-none focus:outline-none sm:mr-2 mb-1 ease-linear transition-all duration-150"
                        type="button"
                      >
                        Connect
                      </button>
                    </div>
                  </div>
                  <div className="w-full lg:w-4/12 px-4 lg:order-1">
                    <div className="flex justify-center py-4 lg:pt-4 pt-8">
                      <div className="mr-4 p-3 text-center">
                        <span className="text-xl font-bold block uppercase tracking-wide text-blueGray-600">
                          {artistSongs.length}
                        </span>
                        <span className="text-sm text-blueGray-400">Song</span>
                      </div>
                      <div className="mr-4 p-3 text-center">
                        <span className="text-xl font-bold block uppercase tracking-wide text-blueGray-600">
                          {musisi.totalListeners}
                        </span>
                        <span className="text-sm text-blueGray-400">
                          Total Listeners
                        </span>
                      </div>
                      <div className="lg:mr-4 p-3 text-center">
                        <span className="text-xl font-bold block uppercase tracking-wide text-blueGray-600">
                          89
                        </span>
                        <span className="text-sm text-blueGray-400">
                          Comments
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="text-center mt-12">
                  <h3 className="text-4xl font-semibold leading-normal  text-blueGray-700 mb-2">
                    {musisi.name}
                  </h3>
                  <div className="text-sm leading-normal mt-0 mb-2 text-blueGray-400 font-bold uppercase">
                    {musisi.asal}
                  </div>

                  <div className="flex justify-center mt-4 gap-2">
                    {musisi.website && (
                      <Link to={musisi.website}>
                        <YouTube className="text-black transition-colors duration-300 hover:text-red-600" />
                      </Link>
                    )}
                    {musisi.personalWebsite && (
                      <Link to={musisi.personalWebsite}>
                        <LanguageOutlined className="text-black transition-colors duration-300 hover:text-purple-800" />
                      </Link>
                    )}
                    {musisi.twitter && (
                      <Link to={musisi.twitter}>
                        <Twitter />
                      </Link>
                    )}
                    {musisi.instagram && (
                      <Link to={musisi.instagram}>
                        <Instagram className="text-black transition-colors duration-300 hover:text-pink-600" />
                      </Link>
                    )}
                    {/* Add more social media icons as needed */}
                  </div>
                </div>
                <div className="mt-10 py-10 border-t border-blueGray-200 text-center">
                  <div className="flex flex-wrap justify-center">
                    <div className="w-full lg:w-9/12 px-4">
                      <p className="mb-4 text-lg leading-relaxed text-blueGray-700">
                        {showFullAbout
                          ? musisi.about
                          : `${musisi.about.slice(0, 300)}...`}
                      </p>
                      {musisi.about.length > 300 && (
                        <button
                          onClick={handleShowMore}
                          className="font-normal text-pink-800 cursor-pointer"
                        >
                          {showFullAbout ? "Show less" : "Show more"}
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  );
};

export default ProfileComponent;
