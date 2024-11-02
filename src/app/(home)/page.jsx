// @ts-nocheck
"use client";

import { signIn, signOut, useSession } from "next-auth/react";
import Link from "next/link";
import { notFound, usePathname, useRouter } from "next/navigation";
import { useEffect, useState, Suspense, useRef } from "react";
import { toast } from "react-toastify";

import moment from "moment";
import Head from "components/Head";
import Footer from "components/Footer";
import Loading from "./loading.jsx";
import Musseg from "components/Musseg.jsx";
import { SetTransaction } from "app/helpers/SetTransaction.js";
import { SetMoneyWallet } from "app/helpers/SetMoneyWallet.js";
import { CheackPoint } from "app/helpers/CheackPoint.js";
import { SetInvoiceDay } from "app/helpers/SetInvoiceDay.js";

const Page = () => {
  const { data: session, status, update } = useSession();
  const [arrinv, setarrinv] = useState(0);
  const [dataa, setdata] = useState([]);
  const [dataSearch, setdataSearch] = useState([]);
  const [nameuser, setnameuser] = useState(null);
  const [items, setiteams] = useState([]);
  const [tatalarr, settatalarr] = useState(null);
  const [date, setdate] = useState(null);
  const [plusmoney, setplusmoney] = useState(null);
  const [level, setlevel] = useState(null);
  const [email, setemail] = useState(null);
  const [issubmit, setissubmit] = useState(false);
  const [packitem, setpackitem] = useState(0);
  const [totalwallet, settotalwallet] = useState(0);
  const [notdata, setnotdata] = useState(false);
  const [powers, setpowers] = useState(null);
  const [aaa, setaaa] = useState(false);
  const [inperror, setinperror] = useState(false);
  
  const [arrdis, setarrdis] = useState([]);
  const [arrmon, setarrmon] = useState([]);
  const [oclock, setoclock] = useState(null);
  const [today, settoday] = useState(null);

  const [allexpen, setallexpen] = useState(null);
  const [lastexpen, setlastexpen] = useState([]);
  const [lastinvoice, setlastinvoice] = useState(null);

  const buttonRef = useRef(null);
  const btnwalleterror = useRef(null);
  const router = useRouter();

  const [product, setproduct] = useState([
    { name: "", price: "" },
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
    if (status == "authenticated") {
      if (session.user.name !== null) {
        // setlevel(session.user.email.split("@")[1].split(".")[0]);
        localStorage.setItem("nameuser", session.user.name.split("/")[0]);
        setnameuser(session.user.name.split("/")[0]);
        console.log(session.user.name);
        console.log(nameuser);
        setemail(session.user.email);
        setpowers(session.user.name.split("/")[1]);
        if (powers) {
          console.log(powers.split("_"));
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
      if (!res.ok) {
        // notFound();
      }

      const result = await res.json();

      console.log(result[0].arrinvoice);

      settotalwallet(result[0].wallet);
      // console.log(result[0].wallet);

      if (result[0].expenn) {
        setlastinvoice(result[0].arrinvoice);
        let expensesarr = result[0].expenn[result[0].expenn.length - 1];
        console.log(expensesarr);

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

      addItem();
      setpackitem(2);
    };

    if (nameuser) {
    }
    getData();
  }, []);

  const searchuser = (value) => {
    const filteredData = dataSearch.filter((item) =>
      item.name.toLowerCase().includes(value.toLowerCase())
    );

    setdata(filteredData);
  };

  const addItem = () => {
    const newItem = {
      id: 1 + items.length,
    };

    setiteams([...items, newItem]);
    setpackitem((num) => num + 2);
  };

  let arrdes = [];
  let arrmoney = [];
  useEffect(() => {
    settoday(moment().format(`D/${moment().get("month") + 1}/YYYY`));
    //
    sessionStorage.removeItem("arr1");
    sessionStorage.removeItem("arr2");
    arrdes = [];
    arrmoney = [];
  }, []);

  const addarritem = (value, id, inp) => {
    const arrmode = id.split("_")[0];
    const arrindex = id.split("_")[1];

    if (
      sessionStorage.getItem("arr1") !== null ||
      sessionStorage.getItem("arr2") !== null
    ) {
      arrmoney = JSON.parse(sessionStorage.getItem("arr1"));
      arrdes = JSON.parse(sessionStorage.getItem("arr2"));
    }

    if (arrmode === "mon") {
      if (isNaN(value)) {
        const matches = value.match(/(\d+)[^\d]*$/);

        if (matches) {
          value = matches[1];
        } else if (matches == null) {
          value = "";
        }

        inp.value = value;
      }
    }

    if (arrmode === "dis") {
      arrdes[arrindex] = value;
      //
    } else {
      arrmoney[arrindex] = +value;
    }

    sessionStorage.setItem("arr1", JSON.stringify(arrmoney));
    sessionStorage.setItem("arr2", JSON.stringify(arrdes));

    filterarr();
  };

  const filterarr = () => {
    settoday(moment().format(`D/${moment().get("month") + 1}/YYYY`));

    setoclock(moment().format("LT"));

    let arrdesfilter = arrdes.filter(function (value) {
      return value !== null && value !== undefined && value !== "";
    });

    let arrmoneyfilter = arrmoney.filter(function (value) {
      return (
        value !== null &&
        value !== undefined &&
        value !== "" &&
        value !== 0 &&
        !isNaN(value)
      );
    });

    //
    //

    setarrdis(arrdesfilter);

    setarrmon(arrmoneyfilter);

    setplusmoney(
      arrmoneyfilter.reduce(
        (accumulator, currentValue) => accumulator + currentValue,
        0
      )
    );
  };

  const daleteitem = (item) => {
    let ItemIndex = item.parentElement.parentElement.id;

    if (
      item.parentElement.parentElement.className ===
      "row g-0 justify-content-evenly"
    ) {
      addarritem(null, `dis_${ItemIndex}`);
      addarritem(null, `mon_${ItemIndex}`);

      item.parentElement.parentElement.remove();
      setpackitem((num) => num - 2);
    }
  };

  const handleAddProduct = () => {
    setproduct([...product, { name: "", price: "" }]);
    setinperror(false)

  };

  const handleChange = (index, field, value) =>{
    const updatedProducts = [...product];
    updatedProducts[index][field] = value;
    console.log(product)

    cheackarrisnull()

  }
  
  
  const cheackarrisnull = () =>{

    let totalprice = 0
    for(let i = 0; i < product.length; i++){
      if(!product[i].name || !product[i].price){
        console.log("Sad")
        setinperror(false)
        break;
      }
      else{
        setinperror(true)
        console.log("srrrrr")
      }
      totalprice += product[i].price
    }

    setplusmoney(totalprice)

    // const cheackarr = product.some((item) =>{
    //   if(!item.name || !item.price){
    //     console.log("Sad")
    //     setinperror(false)
    //     return
    //   }
    //   else{
    //     setinperror(true)
    //     console.log("srrrrr")

    //   }
    // })
  }



  const expobject = () => {
    let expenarr = {
      date: today,
      discraption: arrdis,
      money: arrmon,
      user: nameuser,
      time: oclock,
    };
    let newobj = {};

    if (today === !date) {
      let oldexpenarr = lastexpen;
      oldexpenarr.push(...expenarr);
      newobj = {
        date: today,
        expenses: oldexpenarr,
      };
    } else {
      newobj = {
        date: today,
        expenses: [
          {
            discraption: arrdis,
            money: arrmon,
            user: nameuser,
            time: oclock,
          },
        ],
      };
    }

    return expenarr;
  };

  const submitupdate = () => {
    if (totalwallet < plusmoney) {
      console.log("not money");
      btnwalleterror.current.click();
      return;
    } else {
      truesubmit();
    }
  };

  const truesubmit = async () => {
    setissubmit(true);
    const baseURL = window.location.origin;
    let routefile;
    let Postroute;

    if (today === date) {
      routefile = "updatearr";
      Postroute = "PUT";
    } else {
      routefile = "additeminarr";
      Postroute = "POST";
    }

    console.log(expobject());

    const Mok = await SetInvoiceDay(product, "expenses");
    console.log(Mok.ok);

    // const response = await fetch(`${baseURL}/api/additeminarr`, {
    //   method: `${Postroute}`,
    //   headers: {
    //     "Content-Type": "application/json",
    //   },
    //   body: JSON.stringify({
    //     item: expobject(),
    //   }),
    // });

    // const dataFromBackend = await response.json();

    if (Mok.ok) {
      // fetchDataAndNotify();

      await SetMoneyWallet(-plusmoney);
      await SetTransaction(today, "munis", plusmoney, nameuser);
      toast.success(" تمت اضافة اصناف جديدة بنجاح !!! ");
      setTimeout(() => {
        window.location.reload();
      }, 2000);
    } else {
      console.log("error1111111");
    }
  };

  return (
    <>
      <Musseg />
      <Head
        actev={"home"}
        level={level}
        email={email}
        name={nameuser}
        powers={powers}
      />

<div className="container">
  <ul className="list-group mt-5 opacity-100 shadow-lg bg-body-tertiary rounded" style={{ padding: 0, marginBottom: "150px" }}>
    {lastinvoice &&
      lastinvoice.map((inv, index) => (
        <div key={index} className="mb-5" style={{ backgroundColor: "#b4c1cab9" }}>
          {/* عرض بيانات storageinv */}
          {inv.storageinv?.length > 0 && (
            <div className="mt-3">
              <small className="bg-danger text-center"> فاتورة مخزن </small>
              <li className="list-group-item d-flex justify-content-between align-items-center list-group-item-primary border border-1 border-primary" style={{ padding: "10px 0px", fontWeight: "600" }}>
                <div style={{ width: "50%", textAlign: "center" }}>اخراج والوقت</div>
                <div className="vr" />
                <div style={{ width: "28%", textAlign: "center" }}>المبلغ</div>
                <div className="vr" />
                <div style={{ width: "28%", textAlign: "center" }}>الكمية</div>
                <div className="vr" />
                <div style={{ width: "43.3%", textAlign: "center" }}>الوصف</div>
              </li>

              {inv.storageinv.map((item, itemIndex) => (
                <div key={itemIndex} style={{position:"relative"}}>
                  {item.invarr.map((product, productIndex) => (
                    <li key={productIndex} className="list-group-item d-flex justify-content-between align-items-center list-group-item-danger" style={{ width: "66.7%", left: "33.3%", padding: "7px 0px" }}>
                      <div style={{ width: "65%", textAlign: "center" }}>{product.price}</div>
                      <div className="vr" />
                      <div style={{ width: "65%", textAlign: "center" }}>{product.quantity}</div>
                      <div className="vr" />
                      <div className="dropend" style={{ width: "100%", textAlign: "center" }}>
                        {product.name}
                        <div className="dropdown-menu" style={{ width: "1%", background: "none", border: "none" }}>
                          <p style={{ backgroundColor: "rgb(68, 0, 0)", width: "auto", marginRight: 100, textAlign: "center", color: "#ffffff", borderRadius: 18 }}>{item.user}</p>
                        </div>
                      </div>
                    </li>
                  ))}
                  <div className="div-time">{item.user}<br />{item.time}</div>
                </div>
              ))}

              <li className="list-group-item d-flex justify-content-between align-items-center list-group-item-secondary border border-1 border-secondary-subtle">
                <div style={{ width: "50%", textAlign: "center" }}>الاجمالي: <small className="text-danger">{tatalarr}</small></div>
                <div className="vr" />
                <div style={{ width: "50%", textAlign: "center" }}>{inv.date}</div>
              </li>
            </div>
          )}

          {/* عرض بيانات expenses */}
          {inv.expenses?.length > 0 && (
            <div className="mt-3">
              <small className="bg-primary text-white"> مصروفات </small>
              <li className="list-group-item d-flex justify-content-between align-items-center list-group-item-primary border border-1 border-primary" style={{ padding: "10px 0px", fontWeight: "600" }}>
                <div style={{ width: "50%", textAlign: "center" }}>اخراج والوقت</div>
                <div className="vr" />
                <div style={{ width: "50%", textAlign: "center" }}>المبلغ</div>
                <div className="vr" />
                <div style={{ width: "50%", textAlign: "center" }}>الوصف</div>
              </li>

              {inv.expenses.map((item, itemIndex) => (
                <div key={itemIndex} style={{position:"relative"}}>
                  {item.invarr.map((expense, expenseIndex) => (
                    <li key={expenseIndex} className="list-group-item d-flex justify-content-between align-items-center list-group-item-danger" style={{ width: "66.7%", left: "33.3%", padding: "7px 0px" }}>
                      <div style={{ width: "100%", textAlign: "center" }}>{expense.price}</div>
                      <div className="vr" />
                      <div className="dropend" style={{ width: "100%", textAlign: "center" }}>
                        {expense.name}
                        <div className="dropdown-menu" style={{ width: "1%", background: "none", border: "none" }}>
                          <p style={{ backgroundColor: "rgb(68, 0, 0)", width: "auto", marginRight: 100, textAlign: "center", color: "#ffffff", borderRadius: 18 }}>{item.user}</p>
                        </div>
                      </div>
                    </li>
                  ))}
                  <div className="div-time">{item.user}<br />{item.time}</div>
                </div>
              ))}

              <li className="list-group-item d-flex justify-content-between align-items-center list-group-item-secondary border border-1 border-secondary-subtle">
                <div style={{ width: "50%", textAlign: "center" }}>الاجمالي: <small className="text-danger">{tatalarr}</small></div>
                <div className="vr" />
                <div style={{ width: "50%", textAlign: "center" }}>{inv.date}</div>
              </li>

            </div>
          )}
        </div>
      ))}
  </ul>
</div>


      <div
        className="modal fade"
        id="staticBackdrop"
        data-bs-backdrop="static"
        data-bs-keyboard="false"
        // @ts-ignore
        tabIndex="-1"
        aria-labelledby="staticBackdropLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-lg">
          <div className="modal-content">
            <div className="modal-header">
              <button
                type="button"
                className="btn-close opacity-0"
                data-bs-dismiss="modal"
                aria-label="Close"
                disabled
              ></button>

              <h6
                className="modal-title me-5 w-100 text-center"
                id="staticBackdropLabel"
              >
                <i className="fa-solid fa-comment-dollar fa-rotate-180 fa-xl me-2"></i>
                اضافة مصروفات
                <i className="fa-solid fa-comment-dollar fa-xl ms-2"></i>
              </h6>
            </div>

            {/* start modal body */}

            <div className="modal-body">
              <div className="row g-0 justify-content-evenly">
                <button className="col-1 opacity-0" disabled>
                  <i
                    className="fa-solid fa-delete-left fa-rotate-180 fa-lg"
                    style={{ color: "#360000" }}
                  ></i>
                </button>
                <h6 className="col-3 text-center"> المبلغ </h6>
                <i
                  className="fa-solid fa-arrow-right-arrow-left col-1 opacity-0"
                  style={{
                    color: "#FFD43B",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                ></i>
                <h6 className="col-6 text-center">الوصف</h6>
              </div>

              {product.map((item, index) => {
                return (
                  <div
                    className="row g-0 justify-content-evenly"
                    id={item.id}
                    key={index}
                  >
                    {index !== 0 ? (
                      <button
                        className="col-1"
                        onClick={(e) => {
                          daleteitem(e.target);
                        }}
                      >
                        <i
                          className="fa-solid fa-delete-left fa-rotate-180 fa-lg"
                          style={{ color: "#550000" }}
                        ></i>
                      </button>
                    ) : (
                      <button className="col-1 opacity-0">
                        <i
                          className="fa-solid fa-delete-left fa-rotate-180 fa-lg"
                          style={{ color: "#550000" }}
                        ></i>
                      </button>
                    )}

                    <input
                      required
                      className="col-3"
                      type="tel"
                      maxLength={5}
                      pattern="[0-9]*"
                      name="rtty"
                      inputMode="numeric"
                      id={`mon_${item.id}`}
                      onChange={(e) =>
                        handleChange(index, "price", Number(e.target.value))
                      }
                    />

                    <i
                      className="fa-solid fa-arrow-right-arrow-left col-1"
                      style={{
                        color: "#FFD43B",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                      }}
                    ></i>

                    <input
                      className="col-6"
                      type="text"
                      maxLength={19}
                      id={`dis_${item.id}`}
                      onChange={(e) =>
                        handleChange(index, "name", e.target.value)
                      }
                    />
                  </div>
                );
              })}
            </div>

            <div
              className="row g-0 justify-content-evenly"
              style={{
                display: "flex",
                textAlign: "center",
                alignItems: "center",
                backgroundColor: "#00313aab",
              }}
            >
              <div className="col-4 text-center">
                الاجمالي: <small className="text-danger">{plusmoney}</small>
              </div>

              <button
                className="plus-item col-2 p-1"
                style={{ background: "none", border: "none", width: "40px" }}
                onClick={() => {
                  handleAddProduct();
                }}
              >
                <i
                  className="fa-solid fa-circle-plus fa-xl"
                  style={{ color: "#fcba32" }}
                ></i>
              </button>

              <div
                className="col-4 text-center"
                style={{ letterSpacing: "1.5px" }}
              >
                {today}
              </div>
            </div>

            {/* end modal body */}

            <div className="modal-footer d-flex justify-content-between">
              <button
                type="button"
                className="btn btn-danger"
                data-bs-dismiss="modal"
                disabled={issubmit && "disabled"}
                ref={buttonRef}
              >
                الغاء
              </button>

              {issubmit ? (
                <>
                  <button className="btn btn-primary" type="button" disabled>
                    <span
                      className="spinner-border spinner-border-sm"
                      aria-hidden="true"
                    ></span>{" "}
                    <span role="status">...انتظار</span>
                  </button>
                </>
              ) : (
                <>
                  {" "}
                  <button
                    type="button"
                    className="btn btn-success"
                    onClick={() => {
                      submitupdate();
                    }}
                    disabled={
                      !inperror && "disabled"
                    }
                  >
                    حفظ الفاتورة
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      </div>

      <button
        className="d-none"
        data-bs-target="#walletavretg"
        data-bs-toggle="modal"
        ref={btnwalleterror}
      >
        1
      </button>

      <div
        className="modal fade1"
        id="walletavretg"
        data-bs-backdrop="static"
        data-bs-keyboard="false"
        // @ts-ignore
        tabIndex="-1"
        aria-labelledby="staticBackdropLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content modal-error">
            <div className="modal-header">
              <button
                type="button"
                className="btn-close opacity-0"
                data-bs-dismiss="modal"
                aria-label="Close"
                disabled
              ></button>

              <h5
                className="modal-title text-center w-100"
                id="staticBackdropLabel"
              >
                رصيد المحفظة؟؟
              </h5>
            </div>

            {/* start modal body */}

            <div className="modal-body">
              <p className="text-warning text-center">
                {" "}
                لقد تخطيت الحد الاقصى للرصيد المحفظة{" "}
              </p>
              <p className="text-warning text-center">
                {" "}
                هل تريد اكمال العملية؟{" "}
              </p>
            </div>

            <div
              className="row g-0 justify-content-evenly"
              style={{
                display: "flex",
                textAlign: "center",
                alignItems: "center",
                backgroundColor: "#00313aab",
              }}
            >
              <div
                className="col-4 text-center"
                style={{ letterSpacing: "1.5px" }}
              ></div>
            </div>

            {/* end modal body */}

            <div className="modal-footer d-flex justify-content-between">
              <button
                type="button"
                className="btn btn-danger"
                data-bs-toggle="modal"
                data-bs-target="#staticBackdrop"
              >
                الغاء
              </button>

              {issubmit ? (
                <>
                  <button className="btn btn-primary" type="button" disabled>
                    <span
                      className="spinner-border spinner-border-sm"
                      aria-hidden="true"
                    ></span>{" "}
                    <span role="status">...انتظار</span>
                  </button>
                </>
              ) : (
                <>
                  {" "}
                  <button
                    type="button"
                    className="btn btn-primary"
                    data-bs-toggle="modal"
                    data-bs-target="#staticBackdrop"
                    onClick={() => {
                      truesubmit();
                    }}
                  >
                    اتمام العملية
                  </button>
                </>
              )}
            </div>
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
