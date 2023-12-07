import logo from "./logo.svg";
import "./App.css";
import { Route, Routes, BrowserRouter, useNavigate } from "react-router-dom";
import HomePage from "./Pages/Homepage";
import About from "./Pages/About";
import Sign_In from "./Pages/Sign-in";
import Register from "./Pages/Register";
import Price from "./Pages/Price";
import FaqPage from "./Pages/Faq";
import LoginPage from "./Pages/Login";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ActivationPage from "./Pages/Activation";
import { Fragment, useEffect, useState } from "react";
import Store from "./redux/store";
import { loadUser } from "./redux/actions/user";
import ContactUsPage from "./Pages/ContactUs";
import ChatUserPage from "./Pages/ChatUser";
import Settings from "./Pages/Setting";
import ProtectedRoute from "./routes/ProtectedRoute";
import UpdateProfileUser from "./Pages/updateProfile";
import SignupPageArtist from "./Pages/ArtistPages/SignUp";
import ArtistProtectedRoute from "./routes/ArtistProtectedRoute";
import ArtistDashboardPage from "./Pages/ArtistPages/ArtistDashboard";
import SignInArtistPage from "./Pages/ArtistPages/SignIn";
import ArtistActivationPage from "./Pages/ArtistPages/Activation";
import { getAllMusisi, loadMusisi } from "./redux/actions/artist";
import CreateSongPage from "./Pages/ArtistPages/CreateSong";
import { getAllGenres } from "./redux/actions/genre";
import { getAllSongs } from "./redux/actions/song";
import ProfilePage from "./Pages/ArtistPages/ProfilePage";
import ArtistUpdateProfile from "./Pages/ArtistPages/ArtistUpdateProfile";
import AllSongsPage from "./Pages/ArtistPages/AllSongsPage";
import { useSelector } from "react-redux";
import SasandoHomePage from "./Pages/SasandoPages/Homepage";
import AudioPlayer from "./component/SasandoMenu/AudioPlayer";
import PlaylistPage from "./Pages/SasandoPages/Playlist";
import LikeSongsPage from "./Pages/SasandoPages/LikedSongs";
import LibraryPlaylistPage from "./Pages/SasandoPages/LibraryPlaylistPage";
import CreateAlbum from "./Pages/ArtistPages/CreateAlbum";
import PreviewArtistPage from "./Pages/SasandoPages/PreviewArtistPage";
import DetailSong from "./Pages/SasandoPages/DetailSong";
import Sidebar from "./component/SasandoMenu/Sidebar";
import Topbar from "./component/SasandoMenu/Topbar";
import TrackInfoPage from "./Pages/SasandoPages/TrackInfoPage";

const Layout = ({ children }) => {
  const [isSidebar, setIsSidebar] = useState(true);
  return (
    <div className="AppGlassUser">
      <Sidebar isSidebar={isSidebar} />
      <main className="contentSidebar">
        <Topbar setIsSidebar={setIsSidebar} />
        {children}
        <AudioPlayer />
      </main>
    </div>
  );
};
function App() {
  const isSasandoPage = window.location.pathname.includes("/sasando");
  useEffect(() => {
    Store.dispatch(loadUser());
    Store.dispatch(loadMusisi());
    Store.dispatch(getAllGenres());
    Store.dispatch(getAllSongs());
  }, []);

  return (
    <div className="app ">
      <BrowserRouter>
        {/* <Layout> */}
        <Routes>
          <Route path="/" exact element={<HomePage />} />
          <Route path="/about" element={<About />} />
          <Route path="/price" element={<Price />} />
          <Route path="/faq" element={<FaqPage />} />
          <Route path="/contactUs" element={<ContactUsPage />} />
          <Route path="/sign-in" exact element={<LoginPage />} />
          <Route path="/sign-up" exact element={<Register />} />
          <Route path="/signup-artist" exact element={<SignupPageArtist />} />
          <Route path="/artist-login" exact element={<SignInArtistPage />} />
          <Route
            path="/settings"
            element={
              <ProtectedRoute>
                <Settings />
              </ProtectedRoute>
            }
          />

          <Route
            path="activation/:activation_token"
            element={<ActivationPage />}
          />
          <Route
            path="/artist/activation/:activation_token"
            element={<ArtistActivationPage />}
          />
          {/* {isSasandoPage && (
            <Route path="/sasando/" element={currentTrack && <AudioPlayer />} />
          )} */}
          {/* Sasando Pages */}
          <Fragment>
            <Route
              path="/artist/:id"
              element={
                <ProtectedRoute>
                  <Layout>
                    <PreviewArtistPage />
                  </Layout>
                </ProtectedRoute>
              }
            />
            <Route
              path="/sasando/"
              element={
                <ProtectedRoute>
                  <Layout>
                    <SasandoHomePage />
                  </Layout>
                </ProtectedRoute>
              }
            />
            <Route
              path="/playlist/:id"
              element={
                <ProtectedRoute>
                  <Layout>
                    <PlaylistPage />
                  </Layout>
                </ProtectedRoute>
              }
            />
            <Route
              path="/update-profile"
              element={
                <ProtectedRoute>
                  <Layout>
                    <UpdateProfileUser />
                  </Layout>
                </ProtectedRoute>
              }
            />
            <Route
              path="/collections/tracks"
              element={
                <ProtectedRoute>
                  <Layout>
                    <LikeSongsPage />
                  </Layout>
                </ProtectedRoute>
              }
            />
            <Route
              path="/collections/library"
              element={
                <ProtectedRoute>
                  <Layout>
                    <LibraryPlaylistPage />
                  </Layout>
                </ProtectedRoute>
              }
            />
            <Route
              path="/single/:id"
              element={
                <ProtectedRoute>
                  <Layout>
                    <DetailSong />
                  </Layout>
                </ProtectedRoute>
              }
            />
            <Route
              path="/track/:id"
              element={
                <ProtectedRoute>
                  <Layout>
                    <TrackInfoPage />
                  </Layout>
                </ProtectedRoute>
              }
            />
          </Fragment>
          {/* Artist Page */}
          <Route
            path="/artist-dashboard"
            element={
              <ArtistProtectedRoute>
                <ArtistDashboardPage />
              </ArtistProtectedRoute>
            }
          />
          <Route
            path="/create-song"
            element={
              <ArtistProtectedRoute>
                <CreateSongPage />
              </ArtistProtectedRoute>
            }
          />
          <Route
            path="/create-album"
            element={
              <ArtistProtectedRoute>
                <CreateAlbum />
              </ArtistProtectedRoute>
            }
          />
          <Route
            path="/profile-artist"
            element={
              <ArtistProtectedRoute>
                <ProfilePage />
              </ArtistProtectedRoute>
            }
          />
          <Route
            path="/profile-update-artist"
            element={
              <ArtistProtectedRoute>
                <ArtistUpdateProfile />
              </ArtistProtectedRoute>
            }
          />
          <Route
            path="/all-songs-artist"
            element={
              <ArtistProtectedRoute>
                <AllSongsPage />
              </ArtistProtectedRoute>
            }
          />
          {/* <div className="text-xl font-bold text-green-500">Hello World</div> */}
        </Routes>
        {/* </Layout> */}
        <ToastContainer
          position="bottom-center"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          toastStyle={{ color: "#6b21a8", backgroundColor: "#fff" }}
          progressStyle={{ backgroundColor: "#67e8f9" }}
        />
      </BrowserRouter>
    </div>
  );
}

export default App;
