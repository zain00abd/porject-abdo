"use client";

import React, { useEffect, useMemo, useState } from "react";
import "./style.css";
import Musseg from "components/Musseg";
import { toast } from "react-toastify";

const Page = () => {
  const [alluser, setAlluser] = useState(null);
  const [swech, setSwech] = useState([]);
  const [permissions, setPermissions] = useState({});
  const [isloading, setisloading] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

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
          switch5: arr.some((item) => item.includes("storage")),
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
      { pagename: " مخزن " },
    ];
    setSwech(arrSwech);
  }, []);

  // دالة لتحديث صلاحيات المستخدم عند تغيير المدخل
  const handleCheckboxChange = (userId, switchName, element) => {
    setPermissions((prevPermissions) => {
      let name =
        element.parentElement.parentElement.parentElement.querySelector(
          "h5"
        ).textContent;

      const updatedPermissions = {
        ...prevPermissions,
        [userId]: {
          ...prevPermissions[userId],
          [switchName]: !prevPermissions[userId][switchName],
        },
      };

      // استدعاء setarrpowers مع الحالة المحدثة

      setarrpowers(updatedPermissions, userId, name);

      return updatedPermissions; //   
    });
  };

  const setarrpowers = (updatedPermissions, id, name) => {

    
    let arrpowers = ["addinvoice", "wallet", "alldata", "adduser", "storage"];

    // يمكنك الآن استخدام الحالة المحدثة هنا

    if (!updatedPermissions[id].switch1) {
      arrpowers = arrpowers.filter((item) => item !== "addinvoice");
    }

    if (!updatedPermissions[id].switch2) {
      arrpowers = arrpowers.filter((item) => item !== "wallet");
    }

    if (!updatedPermissions[id].switch3) {
      arrpowers = arrpowers.filter((item) => item !== "alldata");
    }

    if (!updatedPermissions[id].switch4) {
      arrpowers = arrpowers.filter((item) => item !== "adduser");
    }

    if (!updatedPermissions[id].switch5) {
      arrpowers = arrpowers.filter((item) => item !== "storage");
    }

    console.log(name + "/" + arrpowers.join("_"));
    let power = name + "/" + arrpowers.join("_");

    
        
      Submitpowers(power, id);
    
    
  };

  const Submitpowers = async (power, id) => {
    if(!isloading){
      setisloading(true);
      const baseURL = window.location.origin;
      const response = await fetch(`${baseURL}/api/setpower`, {
        method: `PUT`,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          textpower: power,
          Iduser: id,
        }),
      });
      
      const dataFromBackend = await response.json();
      if (response.ok) {
        setisloading(false);
        toast.info(" تم تعديل الصلاحية بنجاح ");
      }
      
    }
  };

  const deleteuser = async (email, i) =>{
    const baseURL = window.location.origin;
    const response = await fetch(`${baseURL}/api/deleteuser`, {
      method: `POST`,
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
      }),
    });
    
    const dataFromBackend = await response;
    if (response.ok) {
      i.parentElement.remove()
      toast.error(" تم حذف الحساب  بنجاح ");
    }
  }

  return (
    <>
      <Musseg />
      <div className="container mt-5">
        <h1 className="text-center mb-4">إدارة المستخدمين</h1>

        {alluser !== null
          ? alluser.map((user, Iuser) => (
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
                          handleCheckboxChange(
                            user._id,
                            `switch${index + 1}`,
                            e.target
                          )
                        }
                        checked={
                          permissions[user._id]?.[`switch${index + 1}`] || false
                        }
                        disabled={isloading}
                      />
                    </div>
                  </div>
                ))}

                <button className="btn btn-danger btn-sm" onClick={(e) => deleteuser(user.email, e.target)}>حذف الحساب</button>
              </div>
            ))
          : null}
      </div>
    </>
  );
};

export default Page;
