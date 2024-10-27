"use client"
import Head from 'components/Head';
import React, { useEffect, useState } from 'react';
import "./style.css"
import Footer from 'components/Footer';
import Link from "next/link";
import { GetData } from 'app/helpers/GetData';
import WarehouseModal from './[formsetdata]/WarehouseModal';
const Page = () => {

  const [section, setsection] = useState(null);
  

  useEffect(() => {

    const getdata = async () =>{

      const arrproduct = await GetData()
      setsection(arrproduct.storage)
      const sections = arrproduct.storage
      console.log(arrproduct.storage)
    }

    getdata()
      
  }, []);



  useEffect(() => {
    import("bootstrap/dist/js/bootstrap.bundle.min.js");
    const bootstrap = require("bootstrap/dist/js/bootstrap.bundle.min.js");
    const popoverTriggerList = document.querySelectorAll(
      '[data-bs-toggle="popover"]'
    );
    // @ts-ignore
    const popoverList = [...popoverTriggerList].map(
      (popoverTriggerEl) => new bootstrap.Popover(popoverTriggerEl)
    );
  }, []);


  return (


<>

    < Head actev={"storage"} level={undefined} email={undefined} name={undefined} onValueChange={undefined} powers={undefined}/>
      <div className="container-fluid text-dark py-4 mb-5" dir="rtl" style={{backgroundColor:"#b4c1cab9"}}>
        <div className="row mb-4">
          <div className="col-12 d-flex justify-content-between align-items-center">
            <h2 className="text-primary">المخزن</h2>
            <button className="btn gradient-btn">
              <Link className={`nav-link text-center`} href={"/storage/formsetdata"}> انشاء منتج </Link>
            </button>
            {section && <WarehouseModal data={section && section} />}
            
          </div>
        </div>
  
        {section && section.map((section, sectionIndex) => (
          <div key={sectionIndex} className="rounded" style={{backgroundColor:"#93b5ceb9"}}>
            {/* عرض اسم القسم */}
            <h3 className="my-3 text-dark text-center pt-2">{section.sectionName}</h3>
  
            {/* جدول المنتجات - متجاوب مع جميع الأحجام */}
            <div className="table-responsive">
              <table className="table table-striped table-hover text-center">
                <thead className="thead-light">
                  <tr>
                    <th scope="col" style={{backgroundColor:"#808d9675"}}>#</th>
                    <th scope="col" style={{backgroundColor:"#808d9675"}}>اسم المنتج</th>
                    <th scope="col" style={{backgroundColor:"#808d9675"}}>السعر</th>
                    <th scope="col" style={{backgroundColor:"#808d9675"}}>الكمية </th>
                    <th scope="col" style={{backgroundColor:"#808d9675"}}>إجراءات</th>
                  </tr>
                </thead>
                <tbody>
                  {section.products.map((product, index) => (
                    <tr key={index}>
                      <th scope="row">{index + 1}</th>
                      <td>{product.name}</td>
                      <td>{product.price}</td>
                      <td>{product.quantity}</td>
                      <td>
                        {/* زر الإجراءات المنسدلة */}
                        <div className="dropdown">
                          <button
                            className="btn btn-sm btn-outline-secondary dropdown-toggle modern-btn"
                            type="button"
                            id={`dropdownMenuButton${product.id}`}
                            data-bs-toggle="dropdown"
                            aria-expanded="false"
                          >
                            ⋮
                          </button>
                          <ul className="dropdown-menu animate-dropdown" aria-labelledby={`dropdownMenuButton${product.id}`}>
                            <li><button className="dropdown-item edit-btn">تعديل</button></li>
                            <li><button className="dropdown-item delete-btn">حذف</button></li>
                          </ul>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        ))}
  
        {/* ملخص المخزون */}



      </div>

      < Footer/>
  
</>


  );
}

export default Page;
