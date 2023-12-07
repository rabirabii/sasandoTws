import React from "react";
import Plan1 from "../../asset/img/plan1.jpg";
import Plan2 from "../../asset/img/plan2.jpg";
import Plan3 from "../../asset/img/plan3.jpg";
import PricingOptions from "../../ui/PricingOptions";
import MotionDiv from "../../ui/MotionDiv";
import { motion } from "framer-motion";
const PlanOptions = [
  {
    id: 1,
    img: Plan1,
    title: "1 Month",
    desc: " Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque rem aperiam, eaque ipsa quae.",
    price: 25000,
    link: "/payment/:id",
  },
  {
    id: 2,
    img: Plan2,
    title: "3 Months",
    desc: " Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque rem aperiam, eaque ipsa quae.",
    price: 50000,
    link: "/payment/:id",
  },
  {
    id: 3,
    img: Plan3,
    title: "1 Year",
    desc: " Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque rem aperiam, eaque ipsa quae.",
    price: 200000,
    link: `/payment/{:id}`,
  },
];
const container = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.2 },
  },
};
const Pricing = () => {
  return (
    <div className="px-4 py-16 mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-24 lg:px-8">
      <MotionDiv>
        <div className="max-w-xl mb-10 md:mx-auto sm:text-center lg:max-w-2x1 md:mb-12">
          <div>
            <p className="inline-block px-3 py-px mb-4 text-xs font-semibold tracking-wider text-blue-100 uppercase rounded-full bg-purple-800">
              Our Offer
            </p>
          </div>
          <h2 className="max-w-lg mb-6 text-3xl font-bold leading-none tracking-tight text-gray-900 sm:text-4xl md:mx-auto">
            <span className="relative inline-block">
              <svg
                viewBox="0 0 52 24"
                fill="currentColor"
                className="absolute top-0 left-0 z-0 hidden w-32 -mt-8 -ml-20 text-gray-100 lg:w-32 lg:-ml-28 lg:-mt-10 sm:block"
              >
                <defs>
                  <pattern id="bc9273ce-29bb-4565-959b-714607d4d027">
                    <circle cx="1" cy="1" r=".7" />
                  </pattern>
                </defs>
                <rect
                  fill="url(#bc9273ce-29bb-4565-959b-714607d4d027"
                  width="52"
                  height="24"
                />
              </svg>
              <span className="relative">Choose</span>
            </span>{" "}
            your Plan , Enjoy music everyday
          </h2>
        </div>
      </MotionDiv>
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.5 }}
        variants={container}
      >
        <div className="grid max-w-md gap-10 row-gap-8 lg:max-w-screen-lg sm:row-gap-10 lg:grid-cols-3 xl:max-w-screen-lg sm:mx-auto">
          {PlanOptions.map((plan) => (
            <PricingOptions
              key={plan.id}
              img={plan.img}
              title={plan.title}
              desc={plan.desc}
              price={plan.price}
              link={plan.link}
            />
          ))}
        </div>
        ;
      </motion.div>
    </div>
  );
};

export default Pricing;
