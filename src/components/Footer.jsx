import React, { useState } from "react";

import "./stylecomp.css";

import { GetData } from "app/helpers/GetData";

const Footer = ({ page, total }) => {

  const [amount, setamount] = useState(null);
  

  const wallet = async () =>{
    setamount(await GetData())

  }

  wallet()

  return (
    <footer
      // @ts-ignore
      style={styles.footer}
    >
      <div style={styles.container}>
        <div style={styles.balance}></div>
        {page === "alldata" ? (
          <>
            <p
              style={{
                display: "inline",
                alignItems: "center",
                textAlign: "center",
              }}
            >
              {" "}
              ج{" "}
            </p>{" "}
            <span style={styles.number}> {total} </span>
            <span> : إجمالي المعروض </span>
          </>
        ) : (
          <div className="d-flex justify-content-between align-items-center">
            <div>
              <p
                style={{
                  display: "inline",
                  alignItems: "center",
                  textAlign: "center",
                }}
              >
                {" "}
                ج{" "}
              </p>{" "}
              <span style={styles.number}> {amount} </span>
              <span> : رصيد المحفظة </span>
            </div>

            <button
              className="footer-button"
              data-bs-toggle="modal"
              data-bs-target="#staticBackdrop"
            >
              <i
                className="fa-solid fa-file-circle-plus fa-lg"
                style={{ bottom: "3px", position: "relative" }}
              ></i>{" "}
              إضافة
            </button>
          </div>
        )}
      </div>
    </footer>
  );
};

const styles = {
  footer: {
    position: "fixed",
    left: 0,
    bottom: 0,
    width: "100%",
    backgroundColor: "#2c3e50", // لون أزرق داكن يتناسب مع الموقع
    color: "#ecf0f1", // لون النص أبيض مائل للرمادي الفاتح
    textAlign: "center",
    padding: "8px 0",
  },
  container: {
    maxWidth: "1200px",
    margin: "0 auto",
    alignItems: "start",
    padding: "0 20px",
  },
  balance: {
    display: "flex",
    alignItems: "center",
    fontSize: "16px", // حجم خط أصغر للمحصلة والرقم
    color: "#ecf0f1", // لون النص أبيض مائل للرمادي الفاتح
  },
  number: {
    fontSize: "18px", // حجم خط أكبر قليلاً للرقم لجعله يبرز
    fontWeight: "bold",
    color: "#f39c12", // لون برتقالي يتناسب مع الموقع
    marginRight: "4px", // مسافة صغيرة بين "المحصلة" والرقم
  },
};

export default Footer;
