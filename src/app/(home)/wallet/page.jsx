"use client";

import { useState, useEffect } from "react";
import axios from "axios";
import "./style.css";
import Head from "components/Head";

// pages/_app.js

const Wallet = () => {
  const [balance, setBalance] = useState(0);
  const [transactions, setTransactions] = useState([]);
  const [show, setShow] = useState(false);
  const [amount, setAmount] = useState(0);
  const [inpmoney, setinpmoney] = useState(0);

  useEffect(() => {
    import("bootstrap/dist/js/bootstrap.bundle.min.js");
  }, []);

  useEffect(() => {
    const getData = async () => {
      const res = await fetch(`https://nextback-seven.vercel.app/abdodata`);
      if (!res.ok) {
        // notFound();
      }
      const result = await res.json();
      setAmount(result[0].wallet);
      const arrtransactions = result[0].transactions;
      console.log(arrtransactions);

      // const arrt = arrtransactions.mpa((item, index) => {
      //   console.log(item);
      // });

      // console.log(JSON.parse(result[0].transactions[0]));
    };

    getData();
  }, []);

  const handeladdwallet = async () => {
    const baseURL = window.location.origin;
    const response = await fetch(`${baseURL}/api/addwallet`, {
      method: `PUT`,
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        money: Number(+amount + +inpmoney),
      }),
    });

    const dataFromBackend = await response.json();
    SetTransaction()
  };

  const SetTransaction = async () => {
    const baseURL = window.location.origin;
    const response = await fetch(`${baseURL}/api/settransaction`, {
      method: `PUT`,
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        // @ts-ignore
        transactions: {
          date: '9/9/2024',
          mode: 'minus',
          money: 1000,
          user: 'عبد الله'
      }
      }),
    });

    const objFromFrontEnd = await response.json();
  };

  return (
    <>
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
            {amount == 0 ? (
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
          <div className="card-body transaction-list p-0">
            <ul className="list-group" id="transaction-list">
              <li
                className={`list-group-item list-group-item-action p-3 list-group-item-success`}
              >
                <div className="row g-0 d-flex justify-content-between w-100">
                  <p className="m-0 col-6 text-center"> 9/9/2024 </p>
                  <p className="m-0 col-6 text-center"> عبدالله </p>
                </div>

                <p className="m-0 text-center"> $ 5000+ </p>
              </li>
            </ul>
          </div>
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
                  type="tel"
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
                >
                  الغاء
                </button>

                <>
                  {" "}
                  <button
                    type="button"
                    className="btn btn-primary"
                    onClick={() => {
                      handeladdwallet();
                    }}
                  >
                    اضافة المبلغ
                  </button>
                </>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Wallet;
