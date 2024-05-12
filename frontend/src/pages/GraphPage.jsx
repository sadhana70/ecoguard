import React, { useState, useEffect, useRef } from "react";
import Chart from "chart.js/auto";

const PoacherChart = () => {
  const [poacherData, setPoacherData] = useState([]);
  const chartRef = useRef(null);

  useEffect(() => {
    // Fetch poacher data from the API
    fetch("http://localhost:8000/poacher-data")
      .then((response) => response.json())
      .then((data) => {
        setPoacherData(data.poacher_data);
      })
      .catch((error) => {
        console.error("Error fetching poacher data:", error);
      });
  }, []);
  useEffect(() => {
    if (poacherData.length > 0) {
      if (chartRef.current) {
        chartRef.current.destroy();
      }

      // Get chart canvas
      const ctx = document.getElementById("poacherChart").getContext("2d");

      // Extract labels and data from poacher data
      // const labels = poacherData.map((item) => item[0]);
      const labels = poacherData.map((item, index) => `cam${index + 1}`);

      const data = poacherData.map((item) => item[1]);

      // Create new chart
      chartRef.current = new Chart(ctx, {
        type: "bar",
        data: {
          labels: labels,
          datasets: [
            {
              label: "Number of Poachers",
              data: data,
              // (132, 255, 99)
              backgroundColor: "rgba(1, 210, 142)",
              borderColor: "rgba(1, 210, 142)",
              borderWidth: 1,
              barPercentage: 0.4, // Adjust bar width (default is 0.9)
            },
          ],
        },
        options: {
          scales: {
            y: {
              beginAtZero: true,
              title: {
                display: true,
                text: "Number of Poachers",
              },
            },
            x: {
              title: {
                display: true,
                text: "Camera",
              },
            },
          },
          plugins: {
            title: {
              display: true,
              text: "Poacher Data",
            },
            legend: {
              display: false,
            },
          },
        },
      });
    }
  }, [poacherData]);

  return (
    <div>
      <canvas id="poacherChart" width="400" height="400"></canvas>
    </div>
  );
};

export default PoacherChart;