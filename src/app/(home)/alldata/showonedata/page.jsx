// @ts-nocheck
"use client";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import ChartDataLabels from "chartjs-plugin-datalabels"; // استيراد الإضافة
import { Bar } from "react-chartjs-2";

import { signIn, signOut, useSession } from "next-auth/react";
import { notFound, usePathname, useRouter } from "next/navigation";
import { useEffect, useState, Suspense, useRef } from "react";

import "moment/locale/ar-ly";
import Head from "components/Head";
import Footer from "components/Footer";

import { CheackPoint } from "app/helpers/CheackPoint.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ChartDataLabels
); // تسجيل الإضافة

const Page = () => {
  const { data: session, status, update } = useSession();

  const [nameuser, setnameuser] = useState(null);

  const [tatalarr, settatalarr] = useState(null);
  const [date, setdate] = useState(null);
  const [email, setemail] = useState(null);

  const [totalwallet, settotalwallet] = useState(0);
  const [notdata, setnotdata] = useState(false);
  const [powers, setpowers] = useState(null);
  const [aaa, setaaa] = useState(false);

  const [lastexpen, setlastexpen] = useState([]);
  const [lastinvoice, setlastinvoice] = useState(null);
  const [month, setmonth] = useState(null);

  const [data, setdata] = useState(null);
  const [options, setoptions] = useState(null);
  const [monthtotal, setmonthtotal] = useState(null);
  

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
    if (status == "authenticated") {
      if (session.user.name !== null) {
        // setlevel(session.user.email.split("@")[1].split(".")[0]);
        localStorage.setItem("nameuser", session.user.name.split("/")[0]);
        setnameuser(session.user.name.split("/")[0]);

        setemail(session.user.email);
        setpowers(session.user.name.split("/")[1]);
        if (powers) {
          setaaa(true);
        }
      }
    }
  }, [session]);

  useEffect(() => {
    CheackPoint();
  }, [aaa]);

  useEffect(() => {
    const getData = async () => {
      const res = await fetch(`https://nextback-seven.vercel.app/abdodata`);
      const result = await res.json();
      const arrdata = result[0].arrinvoice;

      const monthselect = window.location.search;
      const decodedValue = decodeURIComponent(monthselect).substring(1);
      setmonth(decodedValue.split("_")[1]);

      let totalmonth = 0;
      let arrmonth = [];

      let totalstorage = 0
      let totalexpense = 0


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
        console.log(monthone);

        if(monthone == decodedValue.split("_")[1]){
          arrdata[i].month = decodedValue.split("_")[1]
          totalstorage += storagePrice
          console.log(totalstorage)
          totalexpense += expensePrice
          console.log(totalexpense)
          totalmonth += (expensePrice + storagePrice)
          console.log(totalmonth)
          setmonthtotal(totalmonth)

        }

        console.log(arrdata)

      }

      setdata({
        labels: [""],
        datasets: [
          {
            label: "المصروفات",
            data: [totalexpense],
            backgroundColor: ["#0097ddcc"], // لون لكل عمود
            borderColor: ["#0097ddcc"], // لون إطار لكل عمود
            borderWidth: 2, // عرض الإطار
          },
          {
            label: "مخزن",
            data: [totalstorage],
            backgroundColor: ["#ff9900da"], // لون لكل عمود
            borderColor: ["#ff9900"], // لون إطار لكل عمود
            borderWidth: 2, // عرض الإطار
          },
        ],
      });

      setoptions({
        responsive: true,
        maintainAspectRatio: false,
        indexAxis: "x", // تحويل الرسم البياني إلى أفقي
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
            text: `مصروفات شهر ${decodedValue.split("_")[0]}   `,

            font: {
              size: 18,
              family: "Arial",
            },
          },
          datalabels: {
            // إعدادات القيم داخل الأشرطة
            display: true,
            color: "#020000", // لون النص داخل الشريط
            font: {
              size: 16,
              weight: "bold",
            },
            anchor: "end", // تحديد موقع النص بالنسبة للشريط
            align: "center", // توسيط النص داخل الشريط
            formatter: (value) => `جنيه ${value.toLocaleString()}`, // تنسيق الرقم
          },
        },
        scales: {
          y: {
            ticks: {
              callback: (value) => `${value.toLocaleString()} `, // عرض القيم بالريال
              font: {
                size: 14,
              },
            },
          },
          x: {
            ticks: {
              font: {
                size: 16,
              },
            },
          },
        },
      });

      arrdata.forEach((item) => {
        let expensePrice = 0;
        let storagePrice = 0;
        let totalPages1 = 0;
        let totalPages2 = 0;

        item.expenses.forEach((exp) => {
          exp.invarr.forEach((price, Iprice) => {
            expensePrice += price.price;
          });
          totalPages1 += exp.invarr.length;
        });

        item.storageinv.forEach((inv) => {
          inv.invarr.forEach((price, Iprice) => {
            storagePrice += price.price;
          });
          totalPages2 += inv.invarr.length;
        });

        item.Pagesex = totalPages1;
        item.Pagesst = totalPages2;
        item.expenseprice = expensePrice;
        item.storageprice = storagePrice;
        item.combinedTotal = expensePrice + storagePrice; // Add this line for combined total
      });

      if (result[0].expenn) {
        setlastinvoice(result[0].arrinvoice);
        let expensesarr = result[0].expenn[result[0].expenn.length - 1];

        setdate(expensesarr.date);
        setlastexpen(expensesarr.expenses);

        let customerarr = expensesarr.expenses;

        const datacustomer = customerarr.map((user, index) => {
          let totalinvoicecustomer = 0;

          //
          if (user.money && user.money.length > 0) {
            const getmony = customerarr;

            let arrtoo = [];
            getmony.forEach((arrmoney) => {
              const totalonearr = arrmoney.money.reduce(
                (acc, num) => acc + num,
                0
              );
              totalinvoicecustomer += totalonearr;
              settatalarr(totalinvoicecustomer);

              arrtoo.push(totalinvoicecustomer);
            });
          }

          totalinvoicecustomer = Math.abs(totalinvoicecustomer);
          user.total = totalinvoicecustomer;
          if (totalinvoicecustomer === 0) {
            user.total = 0;
          }
          //
          return user;
        });
      } else {
        setnotdata(true);
      }

      // setdata(datacustomer);
      // setdataSearch(datacustomer);
    };

    if (nameuser) {
    }
    getData();
  }, []);

  return (
    <>
      <Head />

      <div>
        <div
          style={{
            position: "relative",
            width: "85%",
            height: "500px",
            margin: "auto",
          }}
        >
          {data && <Bar data={data} options={options} />}
        </div>
        <p className="text-end p-2 m-0"> اجمالي الشهر: <small className="text-danger fs-6">{monthtotal}</small>  </p>
      </div>

      <div className="container p-0 mt-4">
        <ul
          className="list-group opacity-100 bg-body-tertiary rounded"
          style={{ padding: 0, marginBottom: "150px" }}
        >
          {lastinvoice &&
            lastinvoice.map((inv, index) => (

              
              <div
                key={index}
                className=" "
                style={{ margin: "0px", backgroundColor: "#b4c1cab9" }}
              >
                {month == inv.month &&                 <div
                  className=" m-2 p-1 rounded-4"
                  style={{ backgroundColor: "#6b6b6b48" }}
                >
                  {/* عرض بيانات storageinv */}
                  {inv.storageinv?.length > 0 && (
                    <div className="mt-3 rounded-3">
                      <small className="bg-warning text-center">
                        {" "}
                        فاتورة مخزن{" "}
                      </small>
                      <li
                        className="list-group-item d-flex justify-content-between align-items-center list-group-item-primary border-primary rounded-top"
                        style={{ padding: "10px 0px", fontWeight: "600" }}
                      >
                        <div style={{ width: "50%", textAlign: "center" }}>
                          اخراج والوقت
                        </div>
                        <div className="vr" />
                        <div style={{ width: "28%", textAlign: "center" }}>
                          المبلغ
                        </div>
                        <div className="vr" />
                        <div style={{ width: "28%", textAlign: "center" }}>
                          الكمية
                        </div>
                        <div className="vr" />
                        <div style={{ width: "43.3%", textAlign: "center" }}>
                          الوصف
                        </div>
                      </li>

                      {inv.storageinv.map((item, itemIndex) => (
                        <div key={itemIndex} style={{ position: "relative" }}>
                          {item.invarr.map((product, productIndex) => (
                            <li
                              key={productIndex}
                              className="list-group-item d-flex justify-content-between align-items-center list-group-item-warning"
                              style={{
                                width: "66.7%",
                                left: "33.3%",
                                padding: "7px 0px",
                              }}
                            >
                              <div
                                style={{ width: "65%", textAlign: "center" }}
                              >
                                {product.price}
                              </div>
                              <div className="vr" />
                              <div
                                style={{ width: "65%", textAlign: "center" }}
                              >
                                {product.quantity}
                              </div>
                              <div className="vr" />
                              <div
                                className="dropend"
                                style={{ width: "100%", textAlign: "center" }}
                              >
                                {product.name}
                                <div
                                  className="dropdown-menu"
                                  style={{
                                    width: "1%",
                                    background: "none",
                                    border: "none",
                                  }}
                                >
                                  <p
                                    style={{
                                      backgroundColor: "rgb(68, 0, 0)",
                                      width: "auto",
                                      marginRight: 100,
                                      textAlign: "center",
                                      color: "#ffffff",
                                      borderRadius: 18,
                                    }}
                                  >
                                    {item.user}
                                  </p>
                                </div>
                              </div>
                            </li>
                          ))}
                          <div
                            style={{
                              backgroundColor: "#fff3cd",
                              border: "0.5px solid #fbe08c",
                            }}
                            className="div-time"
                          >
                            {item.user}
                            <br />
                            {item.time}
                          </div>
                        </div>
                      ))}

                      <li className="list-group-item d-flex justify-content-between align-items-center list-group-item-secondary border border-1">
                        <div style={{ width: "50%", textAlign: "center" }}>
                          الاجمالي:{" "}
                          <small className="text-danger">
                            {inv.storageprice}
                          </small>
                        </div>
                        <div className="vr" />
                        <div style={{ width: "50%", textAlign: "center" }}>
                          عدد الاصناف:{" "}
                          <small className="text-success">{inv.Pagesst}</small>
                        </div>
                      </li>
                    </div>
                  )}

                  {/* عرض بيانات expenses */}
                  {inv.expenses?.length > 0 && (
                    <div className="mt-3 rounded-3">
                      <small className="bg-primary text-white"> مصروفات </small>
                      <li
                        className="list-group-item d-flex justify-content-between align-items-center list-group-item-primary border border-1 border-primary rounded-top"
                        style={{ padding: "10px 0px", fontWeight: "600" }}
                      >
                        <div style={{ width: "50%", textAlign: "center" }}>
                          اخراج والوقت
                        </div>
                        <div className="vr" />
                        <div style={{ width: "50%", textAlign: "center" }}>
                          المبلغ
                        </div>
                        <div className="vr" />
                        <div style={{ width: "50%", textAlign: "center" }}>
                          الوصف
                        </div>
                      </li>

                      {inv.expenses.map((item, itemIndex) => (
                        <div key={itemIndex} style={{ position: "relative" }}>
                          {item.invarr.map((expense, expenseIndex) => (
                            <li
                              key={expenseIndex}
                              className="list-group-item d-flex justify-content-between align-items-center list-group-item-danger"
                              style={{
                                width: "66.7%",
                                left: "33.3%",
                                padding: "7px 0px",
                              }}
                            >
                              <div
                                style={{ width: "100%", textAlign: "center" }}
                              >
                                {expense.price}
                              </div>
                              <div className="vr" />
                              <div
                                className="dropend"
                                style={{ width: "100%", textAlign: "center" }}
                              >
                                {expense.name}
                                <div
                                  className="dropdown-menu"
                                  style={{
                                    width: "1%",
                                    background: "none",
                                    border: "none",
                                  }}
                                >
                                  <p
                                    style={{
                                      backgroundColor: "rgb(68, 0, 0)",
                                      width: "auto",
                                      marginRight: 100,
                                      textAlign: "center",
                                      color: "#ffffff",
                                      borderRadius: 18,
                                    }}
                                  >
                                    {item.user}
                                  </p>
                                </div>
                              </div>
                            </li>
                          ))}
                          <div className="div-time">
                            {item.user}
                            <br />
                            {item.time}
                          </div>
                        </div>
                      ))}

                      <li className="list-group-item d-flex justify-content-between align-items-center list-group-item-secondary border border-1">
                        <div style={{ width: "50%", textAlign: "center" }}>
                          الاجمالي:{" "}
                          <small className="text-danger">
                            {inv.expenseprice}
                          </small>
                        </div>
                        <div className="vr" />
                        <div style={{ width: "50%", textAlign: "center" }}>
                          عدد الاصناف:{" "}
                          <small className="text-success">{inv.Pagesex}</small>
                        </div>
                      </li>
                    </div>
                  )}

                  <div
                    className="mt-3 "
                    style={{ backgroundColor: "#61616100" }}
                  >
                    <li className=" d-flex justify-content-between align-items-center border-secondary-subtle">
                      <div style={{ width: "35%", textAlign: "center" }}>
                        اجمالي الكلي{" "}
                        <small
                          className=" pe-2 ps-2 fw-semibold "
                          style={{
                            letterSpacing: "1.2px",
                            backgroundColor: "#9191919f",
                            color: "#cf2d5e",
                          }}
                        >
                          {inv.combinedTotal}
                        </small>
                      </div>
                      <div className="vr" />
                      <div style={{ width: "50%", textAlign: "center" }}>
                        {inv.date}
                      </div>
                    </li>
                  </div>
                </div>}

              </div>


            ))}
        </ul>
      </div>


    </>
  );
};

export default Page;
