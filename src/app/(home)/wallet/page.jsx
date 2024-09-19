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
      console.log(result[0].wallet);
    };

    getData();
  }, []);

  // const fetchWalletData = async () => {
  //   try {
  //     const response = await axios.get('/api/wallet');
  //     setBalance(response.data.balance);
  //     setTransactions(response.data.transactions);
  //   } catch (error) {
  //     console.error('Error fetching wallet data', error);
  //   }
  // };

  // const handleAddMoney = async () => {
  //   try {
  //     await axios.post('/api/wallet/add', { amount });
  //     setShow(false);
  //     fetchWalletData(); // Refresh data
  //   } catch (error) {
  //     console.error('Error adding money', error);
  //   }
  // };

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
            $ {amount}
          </h3>
        </div>
        {/* زر لإضافة الأموال */}
        <div className="text-center mb-4">
          <button
            type="button"
            className="btn btn-primary btn-add-money"
            data-bs-toggle="modal"
            data-bs-target="#addMoneyModal"
          >
            <i className="bi bi-plus-circle" /> إضافة أموال
          </button>
        </div>
        {/* سجل المعاملات */}
        <div className="card shadow-sm mb-4">
          <div className="card-header">
            <h3 className="text-center">سجل المعاملات</h3>
          </div>
          <div className="card-body transaction-list">
            <ul className="list-group" id="transaction-list">
              <li className="list-group-item text-center">
                لا توجد معاملات حتى الآن
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
                  اضافة مبلغ الى المحفظة
                </h6>
              </div>

              {/* start modal body */}

              <div className="modal-body">
                <input
                  required
                  className=""
                  type="tel"
                  pattern="[0-9]*"
                  inputMode="numeric"
                  placeholder="$$ اضافة مبلغ "
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
                  <button type="button" className="btn btn-primary">
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
