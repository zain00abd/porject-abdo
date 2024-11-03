
import moment from "moment";



export async function  SetTransaction(mode, money, title){

  const baseURL = window.location.origin;
  const response = await fetch(`${baseURL}/api/settransaction`, {
    method: `POST`,
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      date: moment().format(`D/${moment().get("month") + 1}/YYYY`),
      mode: mode,
      money: Number(money),
      title:title,
      user: localStorage.getItem("nameuser"),
    }),
  });

  const objFromFrontEnd = await response.json();


  
};



