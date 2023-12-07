import React from "react";
import { motion } from "framer-motion";
const container = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.2 },
  },
};
const AnimationList = ({ children }) => {
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.5 }}
      variants={container}
    >
      {children}
    </motion.div>
  );
};

export default AnimationList;
