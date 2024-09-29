// @ts-nocheck
"use client";

import { signIn, signOut, useSession } from "next-auth/react";
import Link from "next/link";
import { notFound, usePathname } from "next/navigation";
import { useEffect, useState, Suspense } from "react";

import moment from "moment";
import Head from "components/Head";
import Footer from "components/Footer";
// import Loading from "./loading.jsx";

const Page = () => {
  const { data: session, status } = useSession();
  const [arrinv, setarrinv] = useState(0);
  const [dataa, setdata] = useState([]);
  const [dataSearch, setdataSearch] = useState([]);
  const [nameuser, setnameuser] = useState(null);
  const [items, setiteams] = useState([]);
  const [tatalarr, settatalarr] = useState(null);
  const [date, setdate] = useState(null);
  const [plusmoney, setplusmoney] = useState(null);
  const [email, setemail] = useState(null);
  const [level, setlevel] = useState(null);
  const [totalalldata, settotalalldata] = useState(null);

  const [arrdis, setarrdis] = useState([]);
  const [arrmon, setarrmon] = useState([]);
  const [oclock, setoclock] = useState(null);
  const [today, settoday] = useState(null);

  const [allexpen, setallexpen] = useState([]);
  const [lastexpen, setlastexpen] = useState([]);

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
        setlevel(session.user.email.split("@")[1].split(".")[0]);
        setnameuser(session.user.name);
        setemail(session.user.email);
      }
    }
  }, [session]);

  // useEffect(() => {

  //   const getData = async () => {
  //     const res = await fetch("https://nextback-seven.vercel.app/invoice");
  //     if (!res.ok) {
  //       notFound();
  //     }
  //     const result = await res.json();

  //     const updatedResult = result.map(user => {
  //       let totalarruser = 0;

  //       if (user.arrinvoce && user.arrinvoce.length > 0) {
  //         const getmony = JSON.parse(user.arrinvoce);
  //
  //         let arrtoo = [];
  //         getmony.forEach((arrmoney) => {
  //           const totalonearr = arrmoney.money.reduce((acc, num) => acc + num, 0);
  //           totalarruser += totalonearr;
  //           arrtoo.push(totalarruser);
  //         });
  //
  //       }

  //       totalarruser = Math.abs(totalarruser);
  //       user.total = totalarruser;
  //       if (totalarruser === 0) {
  //         user.total = 0;
  //       }
  //       return user;
  //     });

  //     setdata(updatedResult);
  //     setdataSearch(updatedResult)
  //   };
  //   getData();

  // }, []);

  useEffect(() => {
    const getData = async () => {
      const res = await fetch(`https://nextback-seven.vercel.app/abdodata`);
      if (!res.ok) {
        // notFound();
      }
      const result = await res.json();
      let allexpen = result[0].expen;

      let allex = [];

      let arralltotal = [];
      allexpen.map((exn) => {
        let expensesarr = JSON.parse(exn);
        //
        //

        setdate(expensesarr.date);
        //
        setlastexpen(expensesarr.expenses);

        let customerarr = expensesarr.expenses;

        let totalinvoicecustomer = 0;
        const datacustomer = customerarr.map((user, index) => {
          user.date = expensesarr.date;

          //
          if (user.money && user.money.length > 0) {
            const getmony = customerarr;

            let arrtoo = [];
            getmony.forEach((arrmoney, indexI) => {
              const totalonearr = arrmoney.money.reduce(
                (acc, num) => acc + num,
                0
              );
              totalinvoicecustomer += totalonearr;
              if (index == 0) {
                arralltotal.push(totalonearr);
              }
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

        settotalalldata(
          arralltotal.reduce(
            (accumulator, currentValue) => accumulator + currentValue,
            0
          )
        );
        allex.push(datacustomer);
        //
      });

      setallexpen(allex);
      console.log(allex);

      // setdata(datacustomer);
      // setdataSearch(datacustomer);
    };

    if (nameuser) {
    }
    getData();
  }, [today]);

  const Searchtype = (value) => {

    
    const filteredData = allexpen.filter((item) => {
      // console.log(item);
      const filteronedata = item.filter((one) =>{
        one.date.toLowerCase().includes(value.toLowerCase());
        console.log(one.date.toLowerCase().includes(value.toLowerCase()))
        // console.log(one)
        
      })
      console.log(filteronedata)
      
      
    });
    
    // console.log(filteredData)
    // setdata(filteredData);

  };

  return (
    <>
      <Head
        actev={"adduser"}
        onValueChange={Searchtype}
        level={"admin"}
        email={email}
        name={nameuser}
      />

      {date === null ? (
        <div
          className="text-center"
          style={{ height: "100vh", top: "150px", position: "relative" }}
        >
          Loading...
          <div
            className="spinner-border"
            role="status"
            style={{ width: "3rem", height: "3rem" }}
          >
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      ) : (
        <div className="container" style={{ marginBottom: "130px" }}>
          {allexpen.map((exn, index) => (
            <ul
              className="list-group mt-4 opacity-100 shadow-lg bg-body-tertiary rounded"
              style={{ padding: 0 }}
              key={index}
            >
              {exn !== null && (
                <>
                  <li
                    style={{ padding: "10px 0px", fontWeight: "600" }}
                    className="list-group-item d-flex justify-content-between align-items-center list-group-item-primary border border-1 border-primary"
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

                  {/*** body invoce ***/}

                  {exn.map((entry, entryIndex) => (
                    <div key={entryIndex} style={{ position: "relative" }}>
                      {entry.discraption.map((item, itemIndex) => (
                        <div key={itemIndex} style={{ position: "relative" }}>
                          <li
                            className="list-group-item d-flex justify-content-between align-items-center list-group-item-danger"
                            style={{
                              width: "66.7%",
                              left: "33.3%",
                              padding: "7px 0px",
                            }}
                          >
                            <div
                              style={{ width: "100%", textAlign: "center" }}
                              id="inv_Ms"
                            >
                              {entry.money[itemIndex]}
                            </div>
                            <div className="vr" />
                            <div
                              className="dropend"
                              style={{ width: "100%", textAlign: "center" }}
                            >
                              <button
                                style={{
                                  border: "none",
                                  outline: "none",
                                  background: "none",
                                  fontWeight: 500,
                                }}
                                data-bs-toggle="dropdown"
                              >
                                {item}
                              </button>
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
                                  {entry.money[itemIndex]}
                                </p>
                              </div>
                            </div>
                          </li>
                        </div>
                      ))}

                      <div className="div-time">
                        {entry.user}
                        <br />
                        {entry.time}
                      </div>
                    </div>
                  ))}

                  {/*** body invoce ***/}
                  {/* end invoce */}

                  <li className="list-group-item d-flex justify-content-between align-items-center list-group-item-secondary border border-1 border-secondary-subtle">
                    <div style={{ width: "50%", textAlign: "center" }}>
                      الاجمالي:{" "}
                      <small className="text-danger"> {exn[0].total}</small>
                    </div>

                    <div className="vr" />
                    <div
                      className=""
                      style={{ width: "50%", textAlign: "center" }}
                      id="date"
                    >
                      {exn[0].date}
                    </div>
                  </li>
                </>
              )}

              {/* top invoce */}
            </ul>
          ))}
        </div>
      )}

      <Footer page={"alldata"} total={totalalldata} />
    </>
  );
};

export default Page;
