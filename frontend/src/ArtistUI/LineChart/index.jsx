import { ResponsiveLine } from "@nivo/line";

import React from "react";

const LineChart = ({ songs }) => {
  const chartData = [
    {
      id: "Revenue", // unique identifier for the line
      data: songs.map((song) => ({
        x: song.name, // x-axis value (song title, for example)
        y: song.totalListener * 0.012, // y-axis value (revenue calculation)
      })),
    },
  ];

  console.log("ChartData:", chartData);

  return (
    <ResponsiveLine
      data={chartData}
      margin={{ top: 50, right: 110, bottom: 50, left: 60 }}
      xScale={{ type: "point" }}
      yScale={{
        type: "linear",
        min: "auto",
        max: "auto",
        stacked: true,
        reverse: false,
      }}
      yFormat=" >-.2f"
      curve="catmullRom"
      axisTop={null}
      axisRight={null}
      axisBottom={{
        orient: "bottom",
        tickSize: 0,
        tickPadding: 5,
        tickRotation: -45,
        legend: "Songs",
        legendOffset: 36,
        legendPosition: "middle",
      }}
      axisLeft={{
        orient: "left",
        tickSize: 3,
        tickValues: 5,
        tickPadding: 5,
        tickRotation: 0,
        legend: "Revenue",
        legendOffset: -40,
        legendPosition: "middle",
      }}
      enableGridX={false}
      enableGridY={false}
      colors={{ scheme: "category10" }} // You can change the color scheme here
      pointSize={8}
      pointColor={{ theme: "background" }}
      pointBorderWidth={2}
      pointBorderColor={{ from: "serieColor" }}
      pointLabelYOffset={-12}
      useMesh={true}
      legends={[
        {
          anchor: "bottom-right",
          direction: "column",
          justify: false,
          translateX: 100,
          translateY: 0,
          itemsSpacing: 0,
          itemDirection: "left-to-right",
          itemWidth: 80,
          itemHeight: 20,
          itemOpacity: 0.75,
          symbolSize: 12,
          symbolShape: "circle",
          symbolBorderColor: "rgba(0,0,0, .5)",
          effects: [
            {
              on: "hover",
              style: {
                itemBackground: "rgba(0,0,0,.03)",
                itemOpacity: 1,
              },
            },
          ],
        },
      ]}
    />
  );
};

export default LineChart;
