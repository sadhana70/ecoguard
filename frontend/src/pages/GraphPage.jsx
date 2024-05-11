import React, { useEffect, useRef } from "react";
import Chart from "chart.js/auto";
import { SmokersData } from "../data";

const MyChartComponent = () => {
  const chartRef = useRef(null);

  useEffect(() => {
    // Destroy the existing chart when the component is mounted
    if (chartRef.current) {
      chartRef.current.destroy();
    }

    // Create a new chart
    const ctx = document.getElementById("myChart").getContext("2d");
    const newChart = new Chart(ctx, {
      type: "bar",
      data: {
        labels: SmokersData.map((data) => data.camera_location),
        datasets: [
          {
            label: "Camera location",
            backgroundColor: "#01d28e",
            borderColor: "rgb(255, 255, 255)",
            data: SmokersData.map((data) => data.no_of_smokers),
          },
        ],
      },
      options: {
        scales: {
          x: { title: { display: true, text: "Categories", color: "black" } },
          y: {
            title: { display: true, text: "Values", color: "black" },
            beginAtZero: true,
          },
        },
        plugins: {
          title: { text: "Poacher detected", display: true, color: "black" },
          legend: { labels: { color: "black" } },
        },
      },
    });

    // Save the chart reference for later use (e.g., for destroying it when the component unmounts)
    chartRef.current = newChart;

    // Clean up the chart when the component unmounts
    return () => {
      if (chartRef.current) {
        chartRef.current.destroy();
      }
    };
  }, []); // Run this effect only once when the component mounts

  return (
    <div className="max-h-screen">
      <canvas id="myChart" width="400" height="400" />
    </div>
  );
};

export default MyChartComponent;
