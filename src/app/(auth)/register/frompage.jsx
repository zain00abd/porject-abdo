// @ts-nocheck
"use client";
// @ts-ignore

import Link from "next/link";
import { toast } from "react-toastify";
import React, { useState, useEffect, useRef } from "react";

const Frompage = () => {
  const [name, setname] = useState(null);
  const [email, setemail] = useState(null);
  const [password, setpassword] = useState("");
  const [customers, setcustomers] = useState([]);
  const [loading, setloading] = useState(false);
  const inppassword = useRef(null);

  useEffect(() => {
    const bootstrap = require("bootstrap/dist/js/bootstrap.bundle.min.js");
    const popoverTriggerList = document.querySelectorAll(
      '[data-bs-toggle="tooltip"]'
    );
    // @ts-ignore
    const popoverList = [...popoverTriggerList].map(
      (tooltipTriggerEl) => new bootstrap.Tooltip(tooltipTriggerEl)
    );
  }, []);

  const handelsubmit = async (e) => {
    e.preventDefault();
    setloading(true);
    console.log(name + "/ " + email + "/ " + password);

    const rescheackemail = await fetch("api/cheackuser", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },

      body: JSON.stringify({
        email,
      }),
    });

    const datacheack = await rescheackemail.json();
    console.log(datacheack);
    if (datacheack.user) {
      console.log(datacheack.user);
      setloading(false);
      toast.error(" هذا الحساب موجود بالفعل ");
      return;
    }
    console.log(datacheack.user);

    const response = await fetch("api/pointuser", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },

      body: JSON.stringify({
        name,
        email,
        password,
        customers,
      }),
    });

    const dataFromBackend = await response.json();
    console.log(dataFromBackend);

    if (response.ok) {
      console.log("yes");
      toast.success(" تم الاضافة بنجاح ");

    } else {

    }
    setloading(false)
  };
  const inppass = (e) => {
    if (inppassword.current) {
      console.log(e.value.length);
      inppassword.current.classList.add("form-control");
      if (e.value.length < 8) {
        inppassword.current.classList.add("is-invalid");
      } else {
        inppassword.current.classList.remove("is-invalid");
        inppassword.current.classList.add("is-valid");
      }
    }
  };

  return (
    <>
      <form
        onSubmit={(e) => {
          handelsubmit(e);
        }}
      >
        <div className="form-group">
          <input
            type="text"
            id="username"
            onKeyUp={(e) => {
              setname(e.target.value);
            }}
            placeholder=" الاسم "
          />

          <div className="bar" />
        </div>
        <div className="form-group">
          <input
            type="email"
            id="email"
            onKeyUp={(e) => {
              setemail(e.target.value);
            }}
            placeholder=" البريد الالكتروني "
          />

          <div className="bar" />
        </div>
        <div className="form-group">
          <input
            ref={inppassword}
            type="password"
            className="tt "
            id="validationServer03"
            aria-describedby="validationServer03Feedback"
            required=""
            onKeyUp={(e) => {
              setpassword(e.target.value);
              inppass(e.target);
            }}
            placeholder="كلمة المرور"
          />
          <div
            id="validationServer03Feedback"
            className="invalid-feedback"
            style={{ direction: "rtl" }}
          >
            يجب احتواء كلمة السر على 8 احرف او ارقام او رموز على الاقل
          </div>

          <div className="bar" />
        </div>

        {!loading ? (
          <>
            {" "}
            <div className="suggestion">
              <p>
                {" "}
                   العودة الى الصفحة الرئيسية{" "}
                <Link href={"/"}> الصفحة الرئيسية </Link>
              </p>
            </div>
            <button
              className="btn btn-primary border border-0"
              type="submit"
              disabled={
                !name || !email || password.length < 8 ? "disabled" : ""
              }
            >
              تسجيل
            </button>
          </>
        ) : (
          <div className="d-flex align-items-center text-white justify-content-evenly">
            <div className="spinner-border" aria-hidden="true"></div>
            <strong role="status" className="">
              ..... برجاء الانتظار{" "}
            </strong>
          </div>
        )}
      </form>
    </>
  );
};

export default Frompage;
