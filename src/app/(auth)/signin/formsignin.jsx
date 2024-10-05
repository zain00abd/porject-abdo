"use client";

import Link from "next/link";
import { signIn, signOut, useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";


const Formsignin = () => {
  const router = useRouter();
  const [email, setemail] = useState(null);
  const [password, setpassword] = useState(null);
  const [loading, setloading] = useState(false);

  const { data: session, status } = useSession();

  // useEffect(() => {
  //     if(status == "authenticated"){
  //       signOut()
  //     }

  // }, []);

  const handelsubmit = async (e) => {
    setloading(true)
    e.preventDefault();
    console.log(email + " / " + password);

    const res = await signIn("credentials", {
      email,
      password,
      redirect: false,
    });
    console.log(res);

    if (res.error) {
      setloading(false)
      toast.error(" الايميل وكلمة السر غير متطابقة ");

      return;
    }
    router.replace("/");

    
  };

  return (
    <form
      onSubmit={(e) => {
        handelsubmit(e);
      }}
    >
      <div className="form-group">
        <div className="bar" />
      </div>
      <div className="form-group">
        <input
          type="email"
          id="email"
          placeholder=" البريد الالكتروني "
          onKeyUp={(e) => {
            // @ts-ignore
            setemail(e.target.value);
          }}
        />
        <div className="bar" />
      </div>
      <div className="form-group">
        <input
          onKeyUp={(e) => {
            // @ts-ignore
            setpassword(e.target.value);
          }}
          type="password"
          id="password"
          placeholder="كلمة المرور"
        />
        <div className="bar" />
      </div>
      {!loading ? (

          <button type="submit"> تسجيل الدخول </button>
      ) : (
      
          <div className="d-flex align-items-center text-white justify-content-evenly">
            <div className="spinner-border" aria-hidden="true"></div>
            <strong role="status" className="">..... برجاء الانتظار </strong>
          </div>
        
      )}
    </form>
  );
};

export default Formsignin;
