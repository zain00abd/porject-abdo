"use client"
import React, { useEffect, useState } from 'react';


const Page = () => {


  const [lastexpen, setlastexpen] = useState(null);
  const [date, setdate] = useState(null);
  

  useEffect(() => {
    const getData = async () => {
      const res = await fetch(`https://nextback-seven.vercel.app/abdodata`);
      if (!res.ok) {
        return;
      }
      const result = await res.json();
      if (result && result[0].expen && result[0].expen.length > 0) {
        let expensesarr = JSON.parse(result[0].expen[result[0].expen.length - 1]);
        setdate(expensesarr.date);
        setlastexpen(expensesarr.expenses || []); // Add fallback if 'expenses' is not available
      }
    };
  
    getData();
  }, []);

  const data = [
    
      "{\"date\":\"8/9/2024\",\"expenses\":[{\"discraption\":[\"خيط\",\"ابر\"],\"money\":[50,150],\"user\":\"zain\",\"time\":\"9:57 PM\",\"total\":200},{\"discraption\":[\"خيط\",\"ابر\",\"نمل\"],\"money\":[250,500,80],\"user\":\"ابو النور\",\"time\":\"9:59 PM\"}]}",
      "{\"date\":\"8/9/2024\",\"expenses\":[{\"discraption\":[\"خيط\",\"ابر\"],\"money\":[50,150],\"user\":\"zain\",\"time\":\"9:57 PM\",\"total\":200},{\"discraption\":[\"خيط\",\"ابر\",\"نمل\"],\"money\":[250,500,80],\"user\":\"ابو النور\",\"time\":\"9:59 PM\"}]}",
      "{\"date\":\"8/9/2024\",\"expenses\":[{\"discraption\":[\"خيط\",\"ابر\"],\"money\":[50,150],\"user\":\"zain\",\"time\":\"9:57 PM\",\"total\":200},{\"discraption\":[\"خيط\",\"ابر\",\"نمل\"],\"money\":[250,500,80],\"user\":\"ابو النور\",\"time\":\"9:59 PM\"}]}",
      "{\"date\":\"8/9/2024\",\"expenses\":[{\"discraption\":[\"خيط\",\"ابر\"],\"money\":[50,150],\"user\":\"zain\",\"time\":\"9:57 PM\",\"total\":200},{\"discraption\":[\"خيط\",\"ابر\",\"نمل\"],\"money\":[250,500,80],\"user\":\"ابو النور\",\"time\":\"9:59 PM\"}]}",
      "{\"date\":\"8/9/2024\",\"expenses\":[{\"discraption\":[\"خيط\",\"ابر\"],\"money\":[50,150],\"user\":\"zain\",\"time\":\"9:57 PM\",\"total\":200},{\"discraption\":[\"خيط\",\"ابر\",\"نمل\"],\"money\":[250,500,80],\"user\":\"ابو النور\",\"time\":\"9:59 PM\"}]}",
      "{\"date\":\"8/9/2024\",\"expenses\":[{\"discraption\":[\"خيط\",\"ابر\"],\"money\":[50,150],\"user\":\"zain\",\"time\":\"9:57 PM\",\"total\":200},{\"discraption\":[\"خيط\",\"ابر\",\"نمل\"],\"money\":[250,500,80],\"user\":\"ابو النور\",\"time\":\"9:59 PM\"}]}",
      "{\"date\":\"8/9/2024\",\"expenses\":[{\"discraption\":[\"خيط\",\"ابر\"],\"money\":[50,150],\"user\":\"zain\",\"time\":\"9:57 PM\",\"total\":200},{\"discraption\":[\"خيط\",\"ابر\",\"نمل\"],\"money\":[250,500,80],\"user\":\"ابو النور\",\"time\":\"9:59 PM\"}]}",
      "{\"date\":\"8/9/2024\",\"expenses\":[{\"discraption\":[\"خيط\",\"ابر\"],\"money\":[50,150],\"user\":\"zain\",\"time\":\"9:57 PM\",\"total\":200},{\"discraption\":[\"خيط\",\"ابر\",\"نمل\"],\"money\":[250,500,80],\"user\":\"ابو النور\",\"time\":\"9:59 PM\"}]}",
      "{\"date\":\"8/9/2024\",\"expenses\":[{\"discraption\":[\"خيط\",\"ابر\"],\"money\":[50,150],\"user\":\"zain\",\"time\":\"9:57 PM\",\"total\":200},{\"discraption\":[\"خيط\",\"ابر\",\"نمل\"],\"money\":[250,500,80],\"user\":\"ابو النور\",\"time\":\"9:59 PM\"}]}",
      "{\"date\":\"9/9/2024\",\"expenses\":[{\"discraption\":[\"علبة\",\"ابر\",\"نمل\",\"مي\",\"كوكي\",\"ليز\"],\"money\":[50,80,20,80,82,80],\"user\":\"ابو النور\",\"time\":\"10:22 PM\"}]}"
  
  ];
  
  





  return (
    <div>
{data && data.length > 0 && data.map((invoice, invoiceIndex) => {
  // Parse the JSON for each invoice if necessary
  const parsedInvoice = JSON.parse(invoice);

  return (
    <div key={invoiceIndex} style={{ marginBottom: "20px" }}>
      <h4>Date: {parsedInvoice.date}</h4>

      {parsedInvoice.expenses && parsedInvoice.expenses.length > 0 && parsedInvoice.expenses.map((entry, entryIndex) => (
        <div key={entryIndex} style={{ position: "relative", marginBottom: "10px" }}>
          {entry.discraption.map((item, itemIndex) => (
            <div key={itemIndex} style={{ position: "relative" }}>
              <li
                className="list-group-item d-flex justify-content-between align-items-center list-group-item-danger"
                style={{
                  width: "66.7%",
                  left: "33.3%",
                  padding: "7px 0px",
                }}
              >
                <div style={{ width: "100%", textAlign: "center" }} id="inv_Ms">
                  {entry.money[itemIndex]}
                </div>
                <div className="vr" />
                <div
                  className="dropend"
                  style={{ width: "100%", textAlign: "center" }}
                >
                  <button
                    style={{
                      border: "none",
                      outline: "none",
                      background: "none",
                      fontWeight: 500,
                    }}
                    data-bs-toggle="dropdown"
                  >
                    {item}
                  </button>
                  <div
                    className="dropdown-menu"
                    style={{
                      width: "1%",
                      background: "none",
                      border: "none",
                    }}
                  >
                    <p
                      style={{
                        backgroundColor: "rgb(68, 0, 0)",
                        width: "auto",
                        marginRight: 100,
                        textAlign: "center",
                        color: "#ffffff",
                        borderRadius: 18,
                      }}
                    >
                      {entry.money[itemIndex]}
                    </p>
                  </div>
                </div>
              </li>
            </div>
          ))}

          <div className="div-time">
            {entry.user}
            <br />
            {entry.time}
          </div>
        </div>
      ))}
    </div>
  );
})}



    </div>
  );
}

export default Page;
