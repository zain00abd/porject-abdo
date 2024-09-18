"use client"

import { useState, useEffect } from 'react';
import axios from 'axios';
import "./style.css"
import Head from 'components/Head';

// pages/_app.js




const Wallet = () => {
  const [balance, setBalance] = useState(0);
  const [transactions, setTransactions] = useState([]);
  const [show, setShow] = useState(false);
  const [amount, setAmount] = useState(0);

  useEffect(() => {
    import("bootstrap/dist/js/bootstrap.bundle.min.js");

    fetchWalletData();
  }, []);

  const fetchWalletData = async () => {
    try {
      const response = await axios.get('/api/wallet');
      setBalance(response.data.balance);
      setTransactions(response.data.transactions);
    } catch (error) {
      console.error('Error fetching wallet data', error);
    }
  };

  const handleAddMoney = async () => {
    try {
      await axios.post('/api/wallet/add', { amount });
      setShow(false);
      fetchWalletData(); // Refresh data
    } catch (error) {
      console.error('Error adding money', error);
    }
  };

  return (
<>
<Head actev={"wallet"} level={"admin"} email={undefined} name={undefined} />
    
  <div className="container mt-5">
    {/* العنوان الرئيسي للمحفظة */}
    <div className="wallet-header text-center mb-4">
      <h1>محفظتي</h1>
    </div>
    {/* عرض الرصيد الحالي */}
    <div className="balance-display text-center mb-4">
      <h2>:الرصيد الحالي</h2>
      <h3 className="text-success" id="balance-display">
        $0
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
        <h3 className='text-center'>سجل المعاملات</h3>
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
      tabIndex={-1}
      aria-labelledby="addMoneyModalLabel"
      aria-hidden="true"
    >
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title" id="addMoneyModalLabel">
              إضافة أموال
            </h5>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
              aria-label="إغلاق"
            />
          </div>
          <div className="modal-body">
            <form id="addMoneyForm">
              <div className="mb-3">
                <label htmlFor="amountInput" className="form-label">
                  المبلغ
                </label>
                <input
                  type="number"
                  className="form-control"
                  id="amountInput"
                  placeholder="أدخل المبلغ"
                />
              </div>
            </form>
          </div>
          <div className="modal-footer">
            <button
              type="button"
              className="btn btn-secondary"
              data-bs-dismiss="modal"
            >
              إغلاق
            </button>
            <button
              type="button"
              className="btn btn-primary"
              onclick="handleAddMoney()"
            >
              إضافة
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</>

  );
}


export default Wallet;
