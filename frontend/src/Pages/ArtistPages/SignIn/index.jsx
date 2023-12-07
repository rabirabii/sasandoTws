import React, { useEffect } from "react";
import SignInArtist from "../../../component/ArtistComponent/SignIn";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const SignInArtistPage = () => {
  const navigate = useNavigate();
  const { isMusisi, isLoading } = useSelector((state) => state.musisi);

  useEffect(() => {
    if (isMusisi === true) {
      navigate(`/artist-dashboard`);
    }
  }, [isLoading, isMusisi]);
  return (
    <div>
      <SignInArtist />
    </div>
  );
};

export default SignInArtistPage;
