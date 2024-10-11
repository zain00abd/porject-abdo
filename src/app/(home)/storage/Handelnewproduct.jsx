import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './stylehandel.css';

export default function Handelnewproduct() {
  const [showAddProductForm, setShowAddProductForm] = useState(false); // حالة التحكم بظهور النموذج
  const [newProduct, setNewProduct] = useState({
    section: '',
    name: '',
    price: '',
    quantity: '',
  });

  const sections = ['الإلكترونيات', 'الأثاث'];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewProduct({ ...newProduct, [name]: value });
  };

  const handleSave = () => {
    // منطق الحفظ
    console.log('تم حفظ المنتج:', newProduct);
    setShowAddProductForm(false); // إخفاء الفورم بعد الحفظ
  };

  const handleCancel = () => {
    setShowAddProductForm(false); // إخفاء النموذج عند الضغط على "إلغاء"
  };

  return (
    <div className="container-fluid bg-light text-dark py-4" dir="rtl">
      <div className="row mb-4">
        <div className="col-12 d-flex justify-content-between align-items-center">
          <h2 className="text-primary">المخزن</h2>
          <button
            className="btn gradient-btn"
            onClick={() => setShowAddProductForm(true)} // إظهار النموذج عند الضغط
          >
            إضافة منتج
          </button>
        </div>
      </div>

      {/* عرض المنتجات أو واجهة إضافة المنتج حسب حالة showAddProductForm */}
      {showAddProductForm ? (
        <div className="row">
          <div className="col-md-6 col-sm-12 mx-auto">
            {/* فورم إضافة المنتج */}
            <form className="product-form p-4 rounded shadow-sm">
              <div className="mb-3">
                <label htmlFor="section" className="form-label">القسم</label>
                <select
                  id="section"
                  name="section"
                  className="form-select"
                  value={newProduct.section}
                  onChange={handleInputChange}
                >
                  <option value="">اختر القسم</option>
                  {sections.map((section, index) => (
                    <option key={index} value={section}>
                      {section}
                    </option>
                  ))}
                </select>
              </div>

              <div className="mb-3">
                <label htmlFor="name" className="form-label">اسم المنتج</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  className="form-control"
                  value={newProduct.name}
                  onChange={handleInputChange}
                  placeholder="ادخل اسم المنتج"
                />
              </div>

              <div className="mb-3">
                <label htmlFor="price" className="form-label">السعر</label>
                <input
                  type="number"
                  id="price"
                  name="price"
                  className="form-control"
                  value={newProduct.price}
                  onChange={handleInputChange}
                  placeholder="ادخل سعر المنتج"
                />
              </div>

              <div className="mb-3">
                <label htmlFor="quantity" className="form-label">الكمية</label>
                <input
                  type="number"
                  id="quantity"
                  name="quantity"
                  className="form-control"
                  value={newProduct.quantity}
                  onChange={handleInputChange}
                  placeholder="ادخل الكمية المتاحة"
                />
              </div>

              {/* أزرار حفظ وإلغاء */}
              <div className="d-flex justify-content-between">
                <button type="button" className="btn save-btn" onClick={handleSave}>
                  حفظ
                </button>
                <button type="button" className="btn cancel-btn" onClick={handleCancel}>
                  إلغاء
                </button>
              </div>
            </form>
          </div>
        </div>
      ) : (
        <div className="row">
          {/* هنا يمكن عرض المنتجات حسب التصميم السابق */}
          <div className="col-12">
            {/* عرض المنتجات */}
            <h3>عرض المنتجات هنا</h3>
          </div>
        </div>
      )}
    </div>
  );
}
