import React from "react";
import Logo from "../../asset/img/logo.jpg";
import { Link, useNavigate } from "react-router-dom";
import {
  FacebookOutlined,
  Instagram,
  LibraryMusicOutlined,
  Twitter,
} from "@mui/icons-material";

const Footer = () => {
  const navigate = useNavigate();

  return (
    <footer className="bg-white">
      <div className="container mx-auto py-10 px-4 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          <div className="col-span-1">
            <Link to="/" className="block mb-4">
              <img
                src={Logo}
                alt="Sasando Logo"
                className="h-auto w-32 mx-auto"
              />
            </Link>
            <p className="text-sm text-gray-900">
              Discover Sasando, a freemium platform where indie musicians thrive
              and music enthusiasts enjoy unmatched savings.
            </p>
          </div>
          <div className="col-span-1">
            <h2 className="text-lg font-semibold text-purple-800 mb-4">
              Features
            </h2>
            <ul className="space-y-2">
              <li>
                <Link
                  to="/songs"
                  className="text-black transition-colors duration-300 hover:text-deep-purple-accent-400"
                  onClick={() => navigate("/songs")}
                >
                  Songs
                </Link>
              </li>
              <li>
                <Link
                  to="/album"
                  className="text-black transition-colors duration-300 hover:text-deep-purple-accent-400"
                  onClick={() => navigate("/album")}
                >
                  Album
                </Link>
              </li>
              <li>
                <Link
                  to="/price"
                  className="text-black transition-colors duration-300 hover:text-deep-purple-accent-400"
                  onClick={() => navigate("/price")}
                >
                  Pricing
                </Link>
              </li>
            </ul>
          </div>
          <div className="col-span-1">
            <h2 className="text-lg font-semibold text-purple-800 mb-4">
              Helpful Links
            </h2>
            <ul className="space-y-2">
              <li>
                <Link
                  to="/about"
                  className="text-black transition-colors duration-300 hover:text-deep-purple-accent-400"
                  onClick={() => navigate("/about")}
                >
                  About
                </Link>
              </li>
              <li>
                <Link
                  to="/faq"
                  className="text-black transition-colors duration-300 hover:text-deep-purple-accent-400"
                  onClick={() => navigate("/faq")}
                >
                  FAQ
                </Link>
              </li>
              <li>
                <Link
                  to="/contactUs"
                  className="text-black transition-colors duration-300 hover:text-deep-purple-accent-400"
                  onClick={() => navigate("/contactUs")}
                >
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>
          <div className="col-span-1">
            <h2 className="text-lg font-semibold text-purple-800 mb-4">
              Legal
            </h2>
            <ul className="space-y-2">
              <li>
                <Link
                  to="/"
                  className="text-black transition-colors duration-300 hover:text-deep-purple-accent-400"
                  onClick={() => navigate("/")}
                >
                  Term of Use
                </Link>
              </li>
              <li>
                <Link
                  to="/"
                  className="text-black transition-colors duration-300 hover:text-deep-purple-accent-400"
                  onClick={() => navigate("/")}
                >
                  Cookies Policy
                </Link>
              </li>
              <li>
                <Link
                  to="/"
                  className="text-black transition-colors duration-300 hover:text-deep-purple-accent-400"
                  onClick={() => navigate("/")}
                >
                  Privacy Policy
                </Link>
              </li>
            </ul>
          </div>
        </div>
        <div className="mt-10 flex flex-col justify-between pt-5  border-t sm:flex-row">
          <p className="text-sm text-gray-900">
            © Copyright 2023 Sasando. All rights reserved
          </p>
          <div className="flex items-center  space-x-4">
            <Link to="/">
              <FacebookOutlined className="text-black transition-colors duration-300 hover:text-blue-500" />
            </Link>
            <Link to="/">
              <Instagram className="text-black transition-colors duration-300 hover:text-pink-600" />
            </Link>
            <Link to="/">
              <Twitter className="text-black transition-colors duration-300 hover:text-blue-600" />
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
