import React from "react";
import { Bar } from "react-chartjs-2";
import { Chart, registerables } from "chart.js";
import ChartDataLabels from "chartjs-plugin-datalabels";

Chart.register(...registerables, ChartDataLabels);

const PredictedPrice = ({ predictedPrice, actualPrice }) => {
  const formatPrice = (price) => {
    return `$ ${(price * 1000).toLocaleString()}`;
  };

  // Modify price difference calculation to account for *1000
  const getPriceDifferenceMessage = () => {
    if (!predictedPrice && !actualPrice) {
      return { message: "Enter details to know the difference.", color: "#FF0000" };
    }

    if (!actualPrice && predictedPrice) {
      return { message: "Actual price is missing for comparison.", color: "#FF0000" };
    }

    if (!actualPrice || !predictedPrice) {
      return { message: "Enter details to know the difference.", color: "#213555" };
    }

    const difference = Math.abs((actualPrice - predictedPrice) * 1000);

    if (difference < 100000) {
      return { message: "Very Close", color: "#28A745" };
    } else if (difference < 200000) {
      return { message: "Moderate Variation", color: "#FFC107" };
    } else if (difference < 300000) {
      return { message: "Significant Variation", color: "#FD7E14" };
    } else {
      return { message: "Talk to Agent", color: "#DC3545" };
    }
  };

  const { message, color } = getPriceDifferenceMessage();

  const data = {
    labels: ["Actual Price", "Predicted Price"],
    datasets: [
      {
        label: "Price",
        data: [(actualPrice || 0) * 1000, (predictedPrice || 0) * 1000],
        backgroundColor: ["#86A7FC", "#7B66FF"],
        borderColor: ["#5C8374", "#4F4557"],
        borderWidth: 1,
        borderRadius: 5,
        barThickness: 60,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
      datalabels: {
        color: "#333",
        font: {
          weight: 'bold',
          size: 13
        },
        anchor: "end",
        align: "top",
        offset: 5,
        formatter: (value) => formatPrice(value),
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        grid: {
          color: '#E5E5E5'
        },
        ticks: {
          font: {
            size: 12
          },
          callback: (value) => formatPrice(value),
        },
      },
      x: {
        grid: {
          display: false
        },
        ticks: {
          font: {
            size: 13,
            weight: 'bold'
          }
        }
      }
    },
    layout: {
      padding: {
        top: 30,
        bottom: 10,
        left: 10,
        right: 10
      },
    },
  };

  return (
    <div
      className="chart-container"
      style={{
        position: "relative",
        width: "550px",
        height: "400px",
        margin: "0 auto",
        padding: "20px",
        backgroundColor: "#F8FAFC",
        borderRadius: "12px",
        boxShadow: "0 2px 8px rgba(0,0,0,0.1)"
      }}
    >
      <h2 style={{ 
        margin: 0, 
        marginBottom: "25px", 
        color: "#415672",
        fontSize: "1.5rem",
        fontWeight: "600"
      }}>
        Price Comparison
        <span style={{ 
          fontSize: "13px", 
          fontWeight: "bold", 
          color: color, 
          marginLeft: "12px",
          padding: "4px 8px",
          backgroundColor: `${color}15`,
          borderRadius: "4px"
        }}>
          {message}
        </span>
      </h2>

      <div style={{ position: "relative", height: "calc(100% - 60px)" }}>
        <Bar data={data} options={options} />
      </div>
    </div>
  );
};

export default PredictedPrice;