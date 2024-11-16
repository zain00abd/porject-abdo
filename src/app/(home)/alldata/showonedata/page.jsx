"use client";
import React from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faInfoCircle } from "@fortawesome/free-solid-svg-icons";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const HorizontalBarChart = () => {
  const data = {
    labels: [
      "يناير",
      "فبراير",
      "مارس",
      "أبريل",
      "مايو",
      "يونيو",
      "يوليو",
      "اغسطس",
      "سبتمبر",
      "اكتوبر",
      "نوفمبر",
      "ديسمبر",
    ],
    datasets: [
      {
        label: "المصروفات",
        data: [45874, 50054, 45871, 45241, 52014, 4578, 5545, 42157, 32515, 24475, 45782, 45578],
        backgroundColor: "rgba(75, 192, 192, 0.8)",
        borderColor: "rgba(75, 192, 192, 1)",
        borderWidth: 2,
      },
    ],
  };

  const options = {
    maintainAspectRatio: false,
    indexAxis: "y", // يجعل الرسم أفقيًا
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
      },
      tooltip: {
        callbacks: {
          label: (context) => {
            return `${context.raw.toLocaleString()} جنيه`;
          },
        },
      },
    },
    scales: {
      x: {
        ticks: {
          callback: (value) => `${value.toLocaleString()} جنيه`,
        },
      },
    },
  };

  const handleInfoClick = (month) => {
    alert(`تم النقر على الشهر: ${month}`);
  };

  return (
    <div className="chart-container" style={{ width: "100%", padding: "3%" }}>
      <div style={{ position: "relative", width: "100%", height: "1000px" }}>
        <Bar data={data} options={options} />
        {/* الأزرار */}
        <div style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%" }}>
          {data.labels.map((month, index) => (
            <div
              key={index}
              style={{
                position: "absolute",
                top: `${(index * 76) + 100}px`, // التحكم بموقع الأزرار
                left:"-15px",
                transform: "translateY(-50%)",
              }}
            >
              <button
                onClick={() => handleInfoClick(month)}
                style={{
                  background: "none",
                  border: "none",
                  cursor: "pointer",
                  color: "#007bff",
                  marginTop:"7%",
                }}
                aria-label={`تفاصيل ${month}`}
              >
                <FontAwesomeIcon icon={faInfoCircle} size="sm" />
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default HorizontalBarChart;
