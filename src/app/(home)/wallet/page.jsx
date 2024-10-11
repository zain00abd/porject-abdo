"use client";

import { useState, useEffect, useRef } from "react";
import axios from "axios";
import "./style.css";
import Head from "components/Head";
import moment from "moment";
import { toast } from "react-toastify";

import { SetTransaction } from "../../helpers/SetTransaction";
import { SetMoneyWallet } from "../../helpers/SetMoneyWallet";
import Musseg from "components/Musseg";
import { GetData } from "app/helpers/GetData";

// pages/_app.js

const Wallet = () => {
  const [balance, setBalance] = useState(0);
  const [transactions, settransactions] = useState([]);
  const [show, setShow] = useState(false);
  const [amount, setAmount] = useState(null);
  const [inpmoney, setinpmoney] = useState(0);
  const [today, settoday] = useState(null);
  const [issubmit, setissubmit] = useState(false);

  const buttonRef = useRef(null);

  useEffect(() => {
    import("bootstrap/dist/js/bootstrap.bundle.min.js");
  }, []);

  useEffect(() => {
    settoday(moment().format(`D/${moment().get("month") + 1}/YYYY`));

    const getData = async () => {
      const res = await fetch(`https://nextback-seven.vercel.app/abdodata`);
      if (!res.ok) {
        // notFound();
      }
      const result = await res.json();
      setAmount(result[0].wallet);
      
      if(result[0].transactions !== undefined){

        const arrtransactions = result[0].transactions;
        
        settransactions(arrtransactions);
      }

      // const arrt = arrtransactions.mpa((item, index) => {
      //   
      // });

      // 
      console.log(await GetData())
    };
    
    getData();
    
    
  }, []);

  const handeladdwallet = async () => {
    setissubmit(true);
    const wallet = SetMoneyWallet(Number(+amount + +inpmoney));
    if (wallet) {
      toast.success(" تم اضافة رصيد الى المحفظة ");
      setTimeout(() => {
        window.location.reload();
      }, 2000);
    }
    // @ts-ignore
    SetTransaction(today, "plus", inpmoney, localStorage.getItem("nameuser"));
  };

  return (
    <>
      <Musseg />

      <Head
        actev={"wallet"}
        level={"admin"}
        email={undefined}
        name={undefined}
      />

      <div className="container mt-5">
        {/* العنوان الرئيسي للمحفظة */}
        <div className="wallet-header text-center mb-4">
          <h1>محفظتي</h1>
        </div>
        {/* عرض الرصيد الحالي */}
        <div className="balance-display text-center mb-4">
          <h2>:الرصيد الحالي</h2>
          <h3 className="text-success" id="balance-display">
            {amount == null ? (
              <div className="spinner-border text-success" role="status">
                <span className="visually-hidden">Loading...</span>
              </div>
            ) : (
              <>$ {amount}</>
            )}
          </h3>
        </div>
        {/* زر لإضافة الأموال */}
        <div className="text-center mb-4">
          <button
            type="button"
            className="btn btn-success btn-add-money"
            data-bs-toggle="modal"
            data-bs-target="#addMoneyModal"
          >
            <i className="fa-solid fa-plus fa-fade "></i> إضافة أموال
          </button>
        </div>
        {/* سجل المعاملات */}
        <div className="card shadow-sm mb-5">
          <div className="card-header">
            <h3 className="text-center">سجل المعاملات</h3>
          </div>


          {transactions.map((tran, index) => (
            <div className="card-body transaction-list p-0" key={index}>
              <ul className="list-group" id="transaction-list">
                {tran.mode === "plus" ? (
                  <li
                    className={`list-group-item list-group-item-action p-3 list-group-item-success`}
                  >
                    <div className="row g-0 d-flex justify-content-between w-100">
                      <p className="m-0 col-6 text-center"> {tran.date} </p>
                      <p className="m-0 col-6 text-center"> {tran.user}</p>
                    </div>

                    <p
                      className="m-0 text-center"
                      style={{ fontWeight: "700" }}
                    >
                      {" "}
                      $ {tran.money} +{" "}
                    </p>
                  </li>
                ) : (
                  <li
                    className={`list-group-item list-group-item-action p-3 list-group-item-danger`}
                  >
                    <div className="row g-0 d-flex justify-content-between w-100">
                      <p className="m-0 col-6 text-center"> {tran.date} </p>
                      <p className="m-0 col-6 text-center"> {tran.user}</p>
                    </div>

                    <p
                      className="m-0 text-center"
                      style={{ fontWeight: "700" }}
                    >
                      {" "}
                      $ {tran.money} -{" "}
                    </p>
                  </li>
                )}
              </ul>
            </div>
          ))}
        </div>
        {/* مودال إضافة الأموال */}

        <div
          className="modal fade"
          id="addMoneyModal"
          data-bs-backdrop="static"
          data-bs-keyboard="false"
          // @ts-ignore
          tabIndex="-1"
          aria-labelledby="staticBackdropLabel"
          aria-hidden="true"
        >
          <div className="modal-dialog modal-dialog-centered">
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
                  className="modal-title text-center"
                  id="staticBackdropLabel"
                >
                  اضافة اموال الى المحفظة
                </h6>
              </div>

              {/* start modal body */}

              <div className="modal-body">
                <p className="text-warning"> يمكنك اضافة المبلغ الذي تريد </p>
                <input
                  required
                  className=""
                  type="number"
                  pattern="[0-9]*"
                  inputMode="numeric"
                  placeholder="$$ المبلغ "
                  onKeyUp={(e) => {
                    // @ts-ignore
                    setinpmoney(e.target.value);
                  }}
                />
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
                  data-bs-dismiss="modal"
                  // @ts-ignore
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
                      className="btn btn-primary"
                      onClick={() => {
                        handeladdwallet();
                      }}
                      disabled={!inpmoney || inpmoney == 0}
                    >
                      اضافة المبلغ
                    </button>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>

        
      </div>
    </>
  );
};

export default Wallet;
