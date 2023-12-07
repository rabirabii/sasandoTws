import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const childVariant = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: { opacity: 1, scale: 1 },
};
const PricingOptions = ({ img, desc, price, title, link }) => {
  return (
    <motion.div
      variants={childVariant}
      className="mt-5  px-5 py-16 text-center"
    >
      <div className="flex flex-col  bg-white rounded shadow-sm hover:shadow">
        <div className="relative w-full h-72">
          {" "}
          {/* Adjust the height here */}
          <img
            src={img}
            className="object-cover w-full h-full rounded-t"
            alt="plan"
          />
        </div>
        <div className="flex flex-col justify-between flex-grow p-8 border border-t-0 rounded-b">
          <div>
            <div className="text-lg font-semibold">{title}</div>
            <p className="text-sm text-gray-900">{desc}</p>
            <div className="mt-1 mb-4 mr-1 text-4xl font-bold sm:text-5xl">
              Rp. {price}
            </div>
          </div>
          <Link
            to={link}
            className="inline-flex items-center justify-center w-full h-12 px-6 font-medium tracking-wide text-gray-900 transition duration-200 rounded shadow-md bg-white hover:text-white hover:bg-purple-800 focus:shadow-outline focus:outline-none"
          >
            Buy Now!
          </Link>
        </div>
      </div>
    </motion.div>
  );
};

export default PricingOptions;
