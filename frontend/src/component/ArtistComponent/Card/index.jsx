import React, { useEffect, useState } from "react";
import "./Card.css";
import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import { motion, AnimateSharedLayout, LayoutGroup } from "framer-motion";
import { UilTimes } from "@iconscout/react-unicons";
import Chart from "react-apexcharts";
import { useSelector } from "react-redux";
import { server } from "../../../server";

// parent Card

const Card = (props) => {
  const [expanded, setExpanded] = useState(false);

  return (
    <LayoutGroup>
      {expanded ? (
        <ExpandedCard param={props} setExpanded={() => setExpanded(false)} />
      ) : (
        <CompactCard param={props} setExpanded={() => setExpanded(true)} />
      )}
    </LayoutGroup>
  );
};

// Compact Card
function CompactCard({ param, setExpanded }) {
  const Png = param.png;
  return (
    <motion.div
      className="CompactCard"
      style={{
        background: param.color.backGround,
        boxShadow: param.color.boxShadow,
      }}
      layoutId="expandableCard"
      onClick={setExpanded}
    >
      <div className="radialBar">
        <CircularProgressbar
          value={param.barValue}
          text={`${param.barValue}%`}
        />
        <span>{param.title}</span>
      </div>
      <div className="detail">
        <Png />
        <span>{param.value}</span>
        <span>Total Songs</span>
      </div>
    </motion.div>
  );
}

function dateIsValid(date) {
  return !Number.isNaN(new Date(date).getTime());
}
// Expanded Card
function ExpandedCard({ param, setExpanded }) {
  const { musisi } = useSelector((state) => state.musisi);
  const [artistSongs, setArtistSongs] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchArtistSongs = async () => {
      try {
        setIsLoading(true);

        // Replace 'YOUR_API_ENDPOINT' with the actual API endpoint
        const response = await fetch(
          `${server}/song/get-all-songs/${musisi._id}`
        );
        const data = await response.json();

        console.log("API Response:", data);

        setArtistSongs(data.songs); // Adjust the property based on your API response
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching songs:", error);
        setError(error.message);
        setIsLoading(false);
      }
    };

    if (musisi && musisi._id) {
      fetchArtistSongs();
    }
  }, [musisi]);
  const data = {
    options: {
      chart: {
        type: "area",
        height: "auto",
      },

      dropShadow: {
        enabled: false,
        enabledOnSeries: undefined,
        top: 0,
        left: 0,
        blur: 3,
        color: "#000",
        opacity: 0.35,
      },

      fill: {
        colors: ["#fff"],
        type: "gradient",
      },
      dataLabels: {
        enabled: false,
      },
      stroke: {
        curve: "smooth",
        colors: ["white"],
      },

      grid: {
        show: true,
      },
    },
  };

  return (
    <motion.div
      className="ExpandedCard"
      style={{
        background: param.color.backGround,
        boxShadow: param.color.boxShadow,
      }}
      layoutId="expandableCard"
    >
      <div style={{ alignSelf: "flex-end", cursor: "pointer", color: "white" }}>
        <UilTimes onClick={setExpanded} />
      </div>
      <span>{param.title}</span>
      <div className="chartContainer">
        <Chart options={data.options} series={param.series} type="area" />
      </div>
      <span>Total Songs</span>
    </motion.div>
  );
}

export default Card;
