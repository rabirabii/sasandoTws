import React from "react";
import { motion } from "framer-motion";
import AnchorLink from "react-anchor-link-smooth-scroll";
import { useNavigate } from "react-router-dom";

const childVariant = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: { opacity: 1, scale: 1 },
};
const Manfaat = ({ icon, title, description, learnMore }) => {
  const navigate = useNavigate();
  return (
    <motion.div
      variants={childVariant}
      className="mt-5 rounded-md border-2 border-gray-100 px-5 py-16 text-center"
    >
      <div className="mb-4 flex justify-center">
        <div className="rounded-full border-2 border-gray-100 bg-primary-100 p-4 text-purple-800">
          {icon}
        </div>
      </div>
      <h4 className="font-bold text-purple-800">{title}</h4>
      <p className="my-3">{description}</p>
      <p
        className="text-sm font-bold text-primary-500 underline hover-text-secondary-500 text-blue-300"
        onClick={() => navigate("/contactUs")}
      >
        <p>{learnMore}</p>
      </p>
    </motion.div>
  );
};

export default Manfaat;
