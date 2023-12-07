import React from "react";
import HText from "../../ui/HText";
import Benefit from "./manfaat.jsx";
import { motion } from "framer-motion";
import {
  AddCardOutlined,
  MusicNoteOutlined,
  EmojiEmotionsOutlined,
} from "@mui/icons-material";
import BenefitImg from "../../asset/img/for_about.jpg";
import UiButton from "../../ui/LoginButton";
import { Link, useNavigate } from "react-router-dom";
import SignInButton from "../../ui/LoginButton";
import RegisterButton from "../../ui/RegisterButton";
import MotionDiv from "../../ui/MotionDiv";
const benefits = [
  {
    icon: <AddCardOutlined className="h-6 w-6" />,
    title: "Premium Access, Priceless Savings",
    description:
      "Unlock premium features and exclusive content without breaking the bank. Our subscription app offers you the best of both worlds: top-tier access and significant savings. Experience excellence without the excessive costs – it's premium made affordable. Join us today for an unmatched digital experience that values your budget.",
  },
  {
    icon: <MusicNoteOutlined className="h-6 w-6" />,
    title: "Emporing Indie Music, One Note at a Time",
    description:
      "At our platform, we're passionate about supporting independent musicians on their artistic journeys. Our mission is simple: to empower indie talent by providing them with a dedicated space to showcase their music to the world.",
  },
  {
    icon: <EmojiEmotionsOutlined className="h-6 w-6" />,
    title: "Your Stage, Your Sound, Your Music.",
    description:
      "We provide a dedicated space for talented artists like you to upload and showcase your songs. We understand that your music is deeply personal and unique, and our platform is designed to empower you.",
  },
];
const container = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.2 },
  },
};
const Benefits = () => {
  const navigate = useNavigate();

  return (
    <section>
      <motion.div>
        <MotionDiv>
          <div className="mt-5 text-center">
            <HText> Sasando: The Sound of Indonesian Music Art</HText>
            <div className="border border-gray-100 rounded-md p-8 max-w-md mx-auto">
              <p className="my-5 text-sm">
                Discover Sasando, a freemium platform where indie musicians
                thrive and music enthusiasts enjoy unmatched savings.
              </p>
            </div>
          </div>
        </MotionDiv>
        {/* Benefits */}
        <motion.div
          className="mt-5 items-center justify-between gap-8 md:flex"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.5 }}
          variants={container}
        >
          {benefits.map((benefit) => (
            <Benefit
              key={benefit.title}
              icon={benefit.icon}
              title={benefit.title}
              description={benefit.description}
            />
          ))}
        </motion.div>

        {/* Image and Description */}
        <div className="mt-16 items-center justify-between gap-20 mdLmt-28 md:flex">
          {/* Images */}
          <img
            src={BenefitImg}
            alt="Img for about"
            className="mx-auto"
            style={{ width: "500px", height: "550px" }}
          />

          {/* Description */}
          <div>
            {/* Title */}
            <div className="relative">
              <div className="before:absolute before:-top-20 before:-left-20 before:z-[1] before:content-abstractwaves">
                <MotionDiv>
                  <HText> Music Enthusiasts , </HText>
                  <span className="text-primary-500">
                    Join Us to become the Part of our Community
                  </span>
                </MotionDiv>
              </div>
            </div>

            {/* Description */}
            <MotionDiv>
              <p className="my-5">
                Our mission goes beyond streaming, uniting indie music's spirit
                with premium affordability. Whether you're an independent
                musician looking to showcase your art or a music enthusiast
                craving quality and savings, Sasando is your destination. Join
                our vibrant community, where music transcends boundaries, talent
                shines, and opportunities abound. Sasando is proudly based in
                the Indonesian region, but our vision is global.
              </p>
              <p className="mb-5">
                We're dedicated to exposing talented artists from our region to
                the world stage, ensuring that the world hears the incredible
                sounds of Indonesian indie musicians. Embrace a world where
                indie musicians find their stage, and music lovers find
                priceless experiences. Welcome to Sasando: The Sound of
                Indonesian Music Art.
              </p>
            </MotionDiv>

            {/* Button */}
            <div className="relative mt-16">
              <div className="before:absolute before:-bottom-20 before:right-40 before:z[-1] before:content-sparkles">
                <RegisterButton>Join Now</RegisterButton>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
};

export default Benefits;
