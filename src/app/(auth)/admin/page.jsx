"use client";

import React, { useEffect, useState } from "react";
import "./style.css";

const Page = () => {
  const [alluser, setAlluser] = useState(null);
  const [swech, setSwech] = useState([]);
  const [permissions, setPermissions] = useState({}); // حالة للتحكم في صلاحيات المستخدمين

  useEffect(() => {
    // جلب بيانات المستخدمين من الـ API
    const getData = async () => {
      const res = await fetch(`https://nextback-seven.vercel.app/abdouser`);
      if (!res.ok) {
        // معالجة الخطأ
      }
      const result = await res.json();
      
      setAlluser(result);

      // إعداد الحالة الافتراضية لصلاحيات كل مستخدم
      const initialPermissions = {};
      result.forEach((user) => {
        // تقسيم الاسم للحصول على جزء الصلاحيات
        let arrpowers = user.name.split("/")[1];
        
        let arr = [];

        // التأكد من أن الصلاحيات موجودة ومقسمة بشكل صحيح
        if (arrpowers !== undefined && arrpowers !== null) {
          
          arr = arrpowers.split("_");

          
        }

        // إعداد الصلاحيات بناءً على الصلاحيات المستخرجة
        initialPermissions[user._id] = {
          switch1: arr.some((item) => item.includes("addinvoice")), // استخدم some للتحقق مما إذا كانت القيمة موجودة
          switch2: arr.some((item) => item.includes("wallet")), // مثلاً "addbill" كمثال للصلاحيات
          switch3: arr.some((item) => item.includes("alldata")),
          switch4: arr.some((item) => item.includes("adduser")),
        };
      });

      setPermissions(initialPermissions);
    };
    getData();

    // قائمة صفحات الصلاحيات
    const arrSwech = [
      { pagename: "اضافة فواتير" },
      { pagename: "المحفظة" },
      { pagename: "جميع الفواتير" },
      { pagename: "اضافة عملاء جدد" },
    ];
    setSwech(arrSwech);
  }, []);

  // دالة لتحديث صلاحيات المستخدم عند تغيير المدخل
  const handleCheckboxChange = (userId, switchName, element) => {

    
    setPermissions((prevPermissions) => {
      let name = element.parentElement.parentElement.parentElement.querySelector('h5').textContent
      
      const updatedPermissions = {
        ...prevPermissions,
        [userId]: {
          ...prevPermissions[userId],
          [switchName]: !prevPermissions[userId][switchName],
        },
      };

      // استدعاء setarrpowers مع الحالة المحدثة

      setarrpowers(updatedPermissions, userId, name);

      return updatedPermissions; // العودة بالحالة المحدثة
    });
  };

  const setarrpowers = (updatedPermissions, id, name) => {
    let arrpowers = ["addinvoice", "wallet", "alldata", "adduser"];
    
    
    // يمكنك الآن استخدام الحالة المحدثة هنا
    

    if (!updatedPermissions[id].switch1) {arrpowers = arrpowers.filter(item => item !== "addinvoice")};

    if (!updatedPermissions[id].switch2) {arrpowers = arrpowers.filter(item => item !== "wallet")};

    if (!updatedPermissions[id].switch3) {arrpowers = arrpowers.filter(item => item !== "alldata")};

    if (!updatedPermissions[id].switch4) {arrpowers = arrpowers.filter(item => item !== "adduser")};

    console.log(name + "/" + arrpowers.join("_"))
    let power = name + "/" + arrpowers.join("_")
    Submitpowers(power, id)
    
  };

  const Submitpowers = async (power, id) =>{

    const baseURL = window.location.origin;
    const response = await fetch(`${baseURL}/api/setpower`, {
      method: `PUT`,
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        textpower: power,
        Iduser:id
      }),
    });

    const dataFromBackend = await response.json();

  }

  return (
    <div className="container mt-5">
      <h1 className="text-center mb-4">إدارة المستخدمين</h1>

      {alluser !== null
        ? alluser.map((user) => (
            <div className="user-card" key={user._id} id={user._id}>
              <h5>{user.name.split("/")[0]}</h5>
              <p>{user.email}</p>

              {swech.map((s, index) => (
                <div className="permission-card" key={index}>
                  <span>{s.pagename}</span>
                  <div className="form-check form-switch">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      id={`switch_${index}`}
                      onChange={(e) =>
                        handleCheckboxChange(user._id, `switch${index + 1}`, e.target)
                      }
                      checked={
                        permissions[user._id]?.[`switch${index + 1}`] || false
                      }
                    />
                  </div>
                </div>
              ))}

              <button className="btn btn-danger btn-sm">حذف الحساب</button>
            </div>
          ))
        : null}
    </div>
  );
};

export default Page;
