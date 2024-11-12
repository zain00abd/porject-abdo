// @ts-nocheck
"use client";

import { signIn, signOut, useSession } from "next-auth/react";
import Link from "next/link";
import { notFound, usePathname, useRouter } from "next/navigation";
import { useEffect, useState, Suspense, useRef } from "react";
import { toast } from "react-toastify";

import moment from "moment";
import "moment/locale/ar-ly";
import Head from "components/Head";
import Footer from "components/Footer";

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
  const [datamonth, setdatamonth] = useState([]);
  

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

  const [product, setproduct] = useState([{ name: "", price: "" }]);

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
    console.log("تم تحديث datamonth:", datamonth);
  }, [datamonth]);

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

          // console.log(monthone+ " focuus ")
          // console.log(monthbhaend + " bhaend ")
        }

        if (monthone == monthbhaend) {
          // console.log(true)
          totalmonth += expensePrice + storagePrice;
          console.log(expensePrice + storagePrice);
          console.log(totalmonth);

          if (i == arrdata.length-1) {
            console.log(i)
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
          console.log(expensePrice + storagePrice);
          console.log(totalmonth);
          // console.log(false)
        }
      }
      
      setdatamonth(arrmonth)

    };

    if (nameuser) {
    }
    getData();
  }, []);

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

  const daleteitem = (item, Iitem) => {
    console.log(Iitem);

    let inpprice = product.splice(Iitem, 1);
    console.log(inpprice);
    console.log(product);

    setproduct([...product]);
    setplusmoney((num) => num - inpprice[0].price);

    cheackarrisnull();
    // item.parentElement.parentElement.remove();
    // let ItemIndex = item.parentElement.parentElement.id;

    // if (
    //   item.parentElement.parentElement.className ===
    //   "row g-0 justify-content-evenly"
    // ) {
    //   // console.log(item)
    //   addarritem(null, `dis_${ItemIndex}`);
    //   addarritem(null, `mon_${ItemIndex}`);
    //   console.log(ItemIndex)

    //   setpackitem((num) => num - 2);
    // }
  };

  const handleAddProduct = () => {
    setproduct([...product, { name: "", price: "" }]);
    setinperror(false);
  };

  const handleChange = (index, field, value) => {
    const updatedProducts = [...product];
    updatedProducts[index][field] = value;
    console.log(product);

    setproduct([...product]);
    cheackarrisnull();
  };

  const cheackarrisnull = () => {
    let totalprice = 0;
    for (let i = 0; i < product.length; i++) {
      if (!product[i].name || !product[i].price) {
        console.log("Sad");
        setinperror(false);
        break;
      } else {
        setinperror(true);
        console.log("srrrrr");
      }
      totalprice += product[i].price;
    }

    setplusmoney(totalprice);

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
  };

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
      SetTransaction("munis", plusmoney, " مصروفات ");
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
        actev={"adduser"}
        level={level}
        email={email}
        name={nameuser}
        powers={powers}
      />

      <div className="container">

      {datamonth && datamonth.map((month, Imonth) =>{

        return(         <div
          className=" rounded-4 d-flex justify-content-between align-items-center mt-5"
          style={{
            backgroundColor: "#2c3e50",
            position: "relative",
            width: "85%",
            margin: "auto",
          }}
        >
          <div
            className="ms-5 fs-1 text-danger align-items-center"
            style={{
              left: "18%",
              position: "relative",
              letterSpacing: "1.1px",
            }}
          >
            {" "}
            {month.total}{" "}
          </div>

          <div
            className="bg-warning text-center p-3 fs-4 p-absolute rounded-circle align-items-center"
            style={{
              position: "absolute",
              right: "-2%",
              width: "65px",
              fontWeight: "700",
            }}
          >
            {month.month}
          </div>

          <div
            className="text-center"
            style={{
              position: "absolute",
            }}
          >
            <button
              style={{ border: "none", outline: "none", background: "none" }}
            >
              <i
                className="fa-solid fa-circle-info fa-2xl"
                style={{ color: "#ffc107" }}
              ></i>
            </button>
          </div>
        </div>)

        
      })}



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
                          daleteitem(e.target, index);
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
                      value={item.price}
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
                      value={item.name}
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
                    disabled={!inperror && "disabled"}
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
