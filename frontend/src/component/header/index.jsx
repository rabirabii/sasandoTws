import useMediaQuery from "../../hooks/useMediaQuery";
import Logo from "../../asset/img/logo_header.jpg";
import HomepageHeader from "../../asset/img/header.jpg";
import AnchorLink from "react-anchor-link-smooth-scroll";
import { motion } from "framer-motion";

import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@mui/material";
import Sponsor1 from "../../asset/img/sponsor_1.png";
import Sponsor2 from "../../asset/img/sponsor_2.png";
import Sponsor3 from "../../asset/img/sponsor_3.png";
import RegisterButton from "../../ui/RegisterButton";
const Header = () => {
  const isAboveMediumScreen = useMediaQuery("(min-width:1060px");
  const navigate = useNavigate();
  return (
    <section
      id="header"
      className="gap-16 bg-gray-20 justify-center py-10 md:h-full md:pb-0"
    >
      <motion.div className="mx-auto w-5/6 items-center justify-center md:flex md:h-5/6">
        <div className="z-10 mt-32 md:basis-3/5">
          <motion.div
            className="md:mt-20"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.5 }}
            variants={{
              hidden: { opacity: 0, x: -50 },
              visible: { opacity: 1, x: 0 },
            }}
          >
            <div className="relative">
              <div className="before:absolute before:top-20 before:left-20 before:z-[1] md:before:content-evolvetext">
                <img src={Logo} style={{ width: "250px", height: "180px" }} />
                {/* <p className="text-3xl font-bold text-primary-500 text-purple-800">
                  Sasando
                </p> */}
              </div>
            </div>

            <p className="mt-8 text-lg">
              Empowering Indie Musicians. Unlimited Creativity. World-Class
              Platform for Your Unique Sound. Share Your Artistry with Ease.
              <br />
              <b>Start Now.</b>
            </p>
          </motion.div>

          <motion.div
            className="mt-8 flex items-center gap-8"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.5 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            variants={{
              hidden: { opacity: 0, x: -50 },
              visible: { opacity: 1, x: 0 },
            }}
          >
            <RegisterButton>Join Us</RegisterButton>
            {/* <AnchorLink
              className="text-sm font-bold text-primary-500 underline hover:text-secondary-500 text-purple-800"
              onClick={() => navigate("/faq")}
            > */}
            <Button
              onClick={() => navigate("/about")}
              variant="outlined" // Oval border style
              sx={{
                color: "rgb(107 33 168)",
                borderColor: "invisible",
                "&:hover": {
                  backgroundColor: "rgb(107 33 168)", // Hover effect
                  borderColor: "black",
                  color: "white",
                  /// Hover effect border color
                },
              }}
            >
              <p>Learn More</p>
            </Button>
            {/* </AnchorLink> */}
          </motion.div>
        </div>

        <div
          className="flex basis-3/5 justify-center md:z-10
        md:ml-40 md:mt-16 md:justify-items-end"
        >
          <img alt="homepage header" src={HomepageHeader} />
        </div>
      </motion.div>

      {isAboveMediumScreen && (
        <div className="h-[150px] w-full bg-primary-100 py-100">
          <div className="mx-auto w-5/6">
            <div className="flex w-3/5 items-center justify-between gap-8">
              <img
                alt="Sponsor_1"
                src={Sponsor1}
                style={{ width: "120px", height: "80px" }}
              />
              <img
                alt="Sponsor_2"
                src={Sponsor2}
                style={{ width: "120px", height: "80px" }}
              />
              <img
                alt="Sponsor_3"
                src={Sponsor3}
                style={{ width: "120px", height: "80px" }}
              />
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default Header;
