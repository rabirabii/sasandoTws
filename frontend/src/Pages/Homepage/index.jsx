import React, { useState } from "react";
import Logo from "../../asset/img/logo.jpg";
import Navbar from "../../component/navbar";
import Layout from "../../component/layout";
import Sidebar from "../../component/sidebar";
import Header from "../../component/header";
import Benefits from "../../component/benefits";
import Footer from "../../component/Footer";
import FeaturedArtistSection from "../../component/LastestSong";
import ListedArtist from "../../component/ListedArtist";
const HomePage = () => {
  const { data, setData } = useState(null);
  return (
    <div>
      <Navbar />
      {/* <Navbar />
       */}
      <Header />
      <FeaturedArtistSection />
      <ListedArtist data={data} />
      <Footer />
    </div>
  );
};

export default HomePage;
