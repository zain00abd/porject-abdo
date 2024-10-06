


import { signIn, signOut, useSession } from "next-auth/react";
import { toast } from "react-toastify";



export async function CheackPoint() {
  const res = await signIn("credentials", {
    email:localStorage.getItem("email"),
    password: localStorage.getItem("password"),
    redirect: false,
  });
  console.log(res);

  if (res.error) {
    toast.error(" تم حظر الوصول للتطبيق ");
    setTimeout(() => {
      
      signOut()
    }, 1500);
    return;
  }

};





