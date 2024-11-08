
import moment from "moment";
import "moment/locale/ar-ly";

export async function  SetInvoiceDay(arrinvoice, mode){



  const newInvoiceData = {
    date: moment().format(`D/${moment().get("month") + 1}/YYYY`) + "  |  " +  moment().format('dddd'), // التاريخ
    type: mode, // نوع الفاتورة، إما expense أو storageinv
    data: {
      invarr: 
        arrinvoice
      ,
      time: moment().format("LT"),
      user: localStorage.getItem("nameuser"),
    },
  };
  
  const baseURL = window.location.origin;
  const response = await fetch(`${baseURL}/api/additeminarr`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(newInvoiceData),
  });
  
  const dataFromBackend = await response.json();
  console.log(dataFromBackend);
  
  
  return response
};



