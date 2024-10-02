"use client";

import React, { useEffect, useState } from "react";
import "./style.css";

const Page = () => {
  const [alluser, setalluser] = useState(null);

  useEffect(() => {
    const getData = async () => {
      const res = await fetch(`https://nextback-seven.vercel.app/abdouser`);
      if (!res.ok) {
        // notFound();
      }
      const result = await res.json();
      console.log(result);
      setalluser(result);
    };
    getData();
  }, []);

  return (
    <div className="container mt-5">
      <h1 className="text-center mb-4">إدارة المستخدمين</h1>

      {alluser !== null
        ? alluser.map((user) => (
            <div className="user-card" key={user._id} id={user._id}>
              <h5> {user.name} </h5>
              <p>{ user.email }</p>

              <div className="permission-card">
                <span> الصفحة الرئيسية </span>
                <div className="form-check form-switch">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    id="switch1"
                  />
                </div>
              </div>

              <div className="permission-card">
                <span> اضافة فواتير </span>
                <div className="form-check form-switch">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    id="switch2"
                  />
                </div>
              </div>

              <div className="permission-card">
                <span> المحفظة </span>
                <div className="form-check form-switch">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    id="switch3"
                  />
                </div>
              </div>

              <div className="permission-card">
                <span> عرض جميع الفواتير </span>
                <div className="form-check form-switch">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    id="switch3"
                  />
                </div>
              </div>

              <div className="permission-card">
                <span> اضافة عملاء جدد </span>
                <div className="form-check form-switch">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    id="switch3"
                  />
                </div>
              </div>

              <button className="btn btn-danger btn-sm">حذف الحساب</button>
            </div>
          ))
        : null}
    </div>
  );
};

export default Page;
