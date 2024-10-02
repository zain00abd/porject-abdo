import Link from "next/link";
import Formsignin from "./formsignin";
import Musseg from "components/Musseg";
import "./../style.css"

export const metadata = {
  title: "Signin page",
  description: "description for Signin page",
};

const Page = () => {

  


  return (
    <>
      <Musseg />
      <div className="login-container">
        <div className="login-form">
          <h1> تسجيل الدخول </h1>

          <Formsignin />
        </div>
      </div>
    </>
  );
};

export default Page;
