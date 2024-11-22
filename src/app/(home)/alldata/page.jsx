// @ts-nocheck
"use client";

import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from "chart.js";
import { Bar } from "react-chartjs-2";
import ChartDataLabels from "chartjs-plugin-datalabels"; // استيراد الإضافة
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faInfoCircle } from "@fortawesome/free-solid-svg-icons";
import { signIn, signOut, useSession } from "next-auth/react";
import Link from "next/link";
import { useEffect, useState, Suspense, useRef } from "react";
import "moment/locale/ar-ly";
import Head from "components/Head";
import Footer from "components/Footer";
import Musseg from "components/Musseg.jsx";
import { CheackPoint } from "app/helpers/CheackPoint.js";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ChartDataLabels); // تسجيل الإضافة


const Page = () => {
  const { data: session, status, update } = useSession();
  const [nameuser, setnameuser] = useState(null);
  const [level, setlevel] = useState(null);
  const [email, setemail] = useState(null);
  const [issubmit, setissubmit] = useState(false);
  const [totalwallet, settotalwallet] = useState(0);
  const [powers, setpowers] = useState(null);
  const [aaa, setaaa] = useState(false);
  const [datamonth, setdatamonth] = useState([]);
  const [month, setmonth] = useState([
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
  ]);





  useEffect(() => {
    import("bootstrap/dist/js/bootstrap.bundle.min.js");
    const bootstrap = require("bootstrap/dist/js/bootstrap.bundle.min.js");
    const popoverTriggerList = document.querySelectorAll(
      '[data-bs-toggle="popover"]'
    );
    // @ts-ignore
    const popoverList = [...popoverTriggerList].map(
      (popoverTriggerEl) => new bootstrap.Popover(popoverTriggerEl)
    );
  }, []);



  useEffect(() => {
    CheackPoint();
  }, [aaa]);


  const arrmon = [0,0,0,0,0,0,0,0,0,0,0,0]
  const setmonthmony = () =>{
    datamonth.map((Mon, Imon) =>{
      console.log(Mon)
      
      arrmon[Mon.month-1] = Mon.total
      
    })
    
    return arrmon
  }

  console.log(setmonthmony())

  const data = {
    labels: month,
    datasets: [
      {
        label: "المصروفات",
        data: setmonthmony(),
        backgroundColor: "#0097ddcc", // لون مميز مع وضوح
        borderColor: "#0097ddcc", // لون إطار أوضح
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
        text: " مصروفات سنة 2024 ",

        font: {
          size: 18,
          family: "Arial",
        },
      },
      datalabels: {
        // إعدادات القيم داخل الأشرطة
        display: true,
        color: "#270000", // لون النص داخل الشريط
        font: {
          size: 12,
          weight: "bold",
        },
        anchor: "center", // تحديد موقع النص بالنسبة للشريط
        align: "end", // توسيط النص داخل الشريط
        formatter: (value) => `جنيه ${value.toLocaleString()}`, // تنسيق الرقم
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


  useEffect(() => {
    const getData = async () => {
      const res = await fetch(`https://nextback-seven.vercel.app/abdodata`);
      const result = await res.json();
      const arrdata = result[0].arrinvoice;

      let totalmonth = 0;
      let arrmonth = [];
      for (let i = 0; i < arrdata.length; i++) {
        let expensePrice = 0;
        let storagePrice = 0;
        let totalPages1 = 0;
        let totalPages2 = 0;

        arrdata[i].expenses.forEach((exp) => {
          exp.invarr.forEach((price, Iprice) => {
            expensePrice += price.price;
          });
          totalPages1 += exp.invarr.length;
        });

        arrdata[i].storageinv.forEach((inv) => {
          // console.log(inv)
          inv.invarr.forEach((price, Iprice) => {
            storagePrice += price.price;
          });
          totalPages2 += inv.invarr.length;
        });

        arrdata[i].Pagesex = totalPages1;
        arrdata[i].Pagesst = totalPages2;
        arrdata[i].expenseprice = expensePrice;
        arrdata[i].storageprice = storagePrice;
        arrdata[i].combinedTotal = expensePrice + storagePrice;

        let monthone = arrdata[i].date.split("|")[0].split("/")[1];
        let monthbhaend = arrdata[i].date.split("|")[0].split("/")[1];
        if (i > 0) {
          monthbhaend = arrdata[i - 1].date.split("|")[0].split("/")[1];

        }

        if (monthone == monthbhaend) {
          // console.log(true)
          totalmonth += expensePrice + storagePrice;
          console.log(expensePrice + storagePrice);
          console.log(totalmonth);

          if (i == arrdata.length - 1) {
            console.log(i);
            arrmonth.push({
              total: totalmonth,
              month: monthbhaend,
            });
          }
        } else {
          const objmonth = {
            total: totalmonth,
            month: monthbhaend,
          };

          arrmonth.push(objmonth);
          console.log(arrmonth);
          totalmonth = 0;
          totalmonth += expensePrice + storagePrice;

        }
      }

      setdatamonth(arrmonth);
      console.log(datamonth);
    };

    if (nameuser) {
    }
    getData();
  }, []);

  return (
    <>
      
      <Head
        actev={"adduser"}
        level={level}
        email={email}
        name={nameuser}
        powers={powers}
      />

<div className="chart-container" style={{ width: "100%", padding: "3%" }}>
        <div style={{ position: "relative", width: "100%", height: "800px" }}>
          <Bar data={data} options={options} />
          {/* الأزرار */}
          <div style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%" }}>
            {data.labels.map((month, index) => (
              <div
                key={index}
                style={{
                  position: "absolute",
                  top: `${(index * 58.5) + 100}px`, // التحكم بموقع الأزرار
                  left:"-8px",
                  transform: "translateY(-50%)",
                }}
              >
                <Link
                  
                  style={{
                    background: "none",
                    border: "none",
                    cursor: "pointer",
                    color: "#007bff",
                  }}
                  aria-label={`تفاصيل ${month}`}
                  href={"/alldata/showonedata"}
                >

                  <FontAwesomeIcon icon={faInfoCircle} size="sm" />
                </Link>
              </div>
            ))}
          </div>
        </div>
      </div>

      {powers &&
      powers.split("_").some((item) => item.includes("addinvoice")) ? (
        <Footer total={totalwallet} />
      ) : (
        <></>
      )}
    </>
  );
};

export default Page;
