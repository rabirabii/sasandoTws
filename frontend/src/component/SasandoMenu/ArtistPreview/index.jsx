import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { getAllSongsArtist } from "../../../redux/actions/song";
import axios from "axios";
import { backend_url_img, server } from "../../../server";
import {
  Instagram,
  LanguageOutlined,
  Twitter,
  YouTube,
} from "@mui/icons-material";
import { likeArtist } from "../../../redux/actions/artist";
import { toast } from "react-toastify";

const ArtistPreview = ({ isOwner }) => {
  const [data, setData] = useState(null);
  const { songs } = useSelector((state) => state.song);
  const [isLoading, setIsLoading] = useState(true);
  const { id } = useParams();
  const [error, setError] = useState(null);
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user);
  const isUserFollowing =
    user && user.likedArtists && user.likedArtists.includes(id);
  const [isFollowingInProgress, setIsFollowingInProgress] = useState(false);
  const followButtonText = isUserFollowing ? "Following" : "Follow";
  const [showFullAbout, setShowFullAbout] = useState(false);
  useEffect(() => {
    dispatch(getAllSongsArtist(id));
    axios
      .get(`${server}/artist/get-artist-info/${id}`)
      .then((res) => {
        setData(res.data.musisi);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const handleShowMore = () => {
    setShowFullAbout(!showFullAbout);
  };
  const handleFollow = async () => {
    if (isFollowingInProgress) {
      return; // If following process is already in progress, do nothing
    }

    setIsFollowingInProgress(true); // Set following process in progress

    try {
      await dispatch(likeArtist(id));
    } catch (error) {
      // Handle error
    } finally {
      setIsFollowingInProgress(false); // Reset following process status
    }
  };
  return (
    <>
      {/* component */}
      <main className="profile-page h-3/4">
        <section className="relative h-screen">
          <div>
            <img
              className="absolute top-0 w-full h-3/4 bg-center bg-no-repeat border-0 shadow-md"
              style={{
                backgroundImage: `url(${backend_url_img}${data?.backgroundImg})`,
                backgroundSize: "contain",
                backgroundPosition: "center",
                transition: "transform 0.3s ease-in-out",
              }}
              onMouseOver={(e) => {
                e.target.style.transform = "scale(1.1)";
              }}
              onMouseOut={(e) => {
                e.target.style.transform = "scale(1)";
              }}
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
                      {data && data?.avatar && (
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
                          src={`${backend_url_img}${data?.avatar}`}
                          onLoad={() => setIsLoading(false)} // Set loading state to false when image loads
                          onError={() => setError(true)} // Handle error if the image fails to load
                          onMouseOver={(e) => {
                            e.target.style.transform = "scale(1.1)"; // Zoom effect on hover
                          }}
                          onMouseOut={(e) => {
                            e.target.style.transform = "scale(1)"; // Revert zoom on hover out
                          }}
                        />
                      )}
                      {/* Placeholder or Loading State */}
                      {isLoading && <div>Loading...</div>}
                      {/* Error State */}
                      {error && <div>Error loading image</div>}
                    </div>
                  </div>
                  <div className="w-full lg:w-4/12 px-4 lg:order-3 lg:text-right lg:self-center">
                    <div className="py-6 px-3 mt-32 sm:mt-0">
                      <button
                        className="bg-purple-800 active:bg-purple-800 uppercase text-white font-bold hover:shadow-md shadow text-xs px-4 py-2 rounded outline-none focus:outline-none sm:mr-2 mb-1 ease-linear transition-all duration-150"
                        type="button"
                        onClick={handleFollow}
                        disabled={isFollowingInProgress} // Disable the button while in progress
                      >
                        {isFollowingInProgress ? (
                          <span>Loading...</span> // Display "Loading..." when in progress
                        ) : (
                          followButtonText // Display regular text when not in progress
                        )}
                      </button>
                    </div>
                  </div>
                  <div className="w-full lg:w-4/12 px-4 lg:order-1">
                    <div className="flex justify-center py-4 lg:pt-4 pt-8">
                      <div className="mr-4 p-3 text-center">
                        <span className="text-xl font-bold block uppercase tracking-wide text-blueGray-600">
                          {songs?.length}
                        </span>
                        <span className="text-sm text-blueGray-400">Song</span>
                      </div>
                      <div className="mr-4 p-3 text-center">
                        <span className="text-xl font-bold block uppercase tracking-wide text-blueGray-600">
                          {data?.totalListeners}
                        </span>
                        <span className="text-sm text-blueGray-400">
                          Total Listeners
                        </span>
                      </div>
                      <div className="lg:mr-4 p-3 text-center">
                        <span className="text-xl font-bold block uppercase tracking-wide text-blueGray-600">
                          {data?.follower}
                        </span>
                        <span className="text-sm text-blueGray-400">
                          Follower
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="text-center mt-12">
                  <h3 className="text-4xl font-bold leading-normal  text-purple-800 mb-2">
                    {data?.name}
                  </h3>
                  <div className="text-sm leading-normal mt-0 mb-2 text-purple-700 font-bold uppercase">
                    {data?.asal}
                  </div>

                  <div className="flex justify-center mt-4 gap-2">
                    {data?.website && (
                      <Link to={data.website}>
                        <YouTube className="text-black transition-colors duration-300 hover:text-red-600" />
                      </Link>
                    )}
                    {data?.personalWebsite && (
                      <Link to={data.personalWebsite}>
                        <LanguageOutlined className="text-black transition-colors duration-300 hover:text-purple-800" />
                      </Link>
                    )}
                    {data?.twitter && (
                      <Link to={data.twitter}>
                        <Twitter />
                      </Link>
                    )}
                    {data?.instagram && (
                      <Link to={data.instagram}>
                        <Instagram className="text-black transition-colors duration-300 hover:text-pink-600" />
                      </Link>
                    )}
                    {/* Add more social media icons as needed */}
                  </div>
                </div>
                <div className="mt-10 py-10 border-t border-blueGray-200 text-center">
                  <div className="flex flex-wrap justify-center">
                    <div className="w-full lg:w-9/12 px-4">
                      {data?.about && (
                        <p className="mb-4 text-lg leading-relaxed text-blueGray-700">
                          {showFullAbout
                            ? data?.about
                            : `${data?.about.slice(0, 300)}...`}
                        </p>
                      )}
                      {data?.about.length > 300 && (
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

export default ArtistPreview;
