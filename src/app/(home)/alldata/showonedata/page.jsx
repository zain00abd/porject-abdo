"use client";
import React from "react";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from "chart.js";
import { Bar } from "react-chartjs-2";
import ChartDataLabels from "chartjs-plugin-datalabels"; // استيراد الإضافة
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { faInfoCircle } from "@fortawesome/free-solid-svg-icons";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ChartDataLabels); // تسجيل الإضافة

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
        backgroundColor: "rgba(0, 158, 206, 0.8)", // لون مميز مع وضوح
        borderColor: "rgba(75, 192, 192, 1)", // لون إطار أوضح
        borderWidth: 2, // عرض الإطار
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    indexAxis: "y", // تحويل الرسم البياني إلى أفقي
    plugins: {
      legend: {
        position: "top",
        labels: {
          font: {
            size: 14,
            family: "Arial",
          },
        },
      },
      title: {
        display: true,
        text: "رسم بياني أفقي للمبيعات",
        font: {
          size: 18,
          family: "Arial",
        },
      },
      datalabels: {
        // إعدادات القيم داخل الأشرطة
        display: true,
        color: "#000000", // لون النص داخل الشريط
        font: {
          size: 13,
          weight: "bold",
        },
        anchor: "center", // تحديد موقع النص بالنسبة للشريط
        align: "center", // توسيط النص داخل الشريط
        formatter: (value) => value.toLocaleString(), // تنسيق الرقم
      },
    },
    scales: {
      x: {
        ticks: {
          callback: (value) => `${value.toLocaleString()} `, // عرض القيم بالريال
          font: {
            size: 10,
          },
        },
      },
      y: {
        ticks: {
          font: {
            size: 12,
          },
        },
      },
    },
  };

  const handleInfoClick = (ss) =>{
    window.alert(ss)
  }

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
