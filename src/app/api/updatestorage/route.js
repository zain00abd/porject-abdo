import ItemArrModal from "DBconfig/models/ItemArrModal";
import { connectMongoDB } from "DBconfig/mongo";
import { NextResponse } from "next/server";

export async function POST(request) {
  try {
    // 1- استلام البيانات من الواجهة الأمامية (مجموعة من الأقسام والمنتجات)
    const objFromFrontEnd = await request.json();
  
    // 2- الاتصال بقاعدة البيانات
    await connectMongoDB();
    
    let result = null;
  
    // 3- معالجة كل قسم ومنتجاته
    for (const section of objFromFrontEnd) {
      const { sectionName, products } = section; // استخلاص القسم والمنتجات
      
      console.log("Processing request for section: ", sectionName);

      // 4- التحقق مما إذا كان القسم موجودًا بالفعل
      const existingSection = await ItemArrModal.findOne({
        "storage.sectionName": sectionName,
      });

      if (existingSection) {
        // التحقق من وجود كل منتج في القسم
        for (const product of products) {
          const productExists = existingSection.storage.some((section) => {
            return section.products.some((existingProduct) => existingProduct.name === product.name);
          });

          if (productExists) {
            // إذا كان المنتج موجودًا بالفعل، نقوم بتحديث الكمية والسعر
            console.log("Product exists, updating...");
            result = await ItemArrModal.updateOne(
              { "storage.sectionName": sectionName, "storage.products.name": product.name },
              {
                $inc: {
                  "storage.$.products.$[product].quantity": product.quantity,
                  "storage.$.products.$[product].price": product.price,
                },
              },
              {
                arrayFilters: [{ "product.name": product.name }],
              }
            );
          } else {
            // إذا لم يكن المنتج موجودًا، نقوم بإضافته
            console.log("Product does not exist, adding product...");
            result = await ItemArrModal.updateOne(
              { "storage.sectionName": sectionName },
              { $push: { "storage.$.products": product } } // إضافة المنتج إلى القسم الموجود
            );
          }
        }
      } else {
        // إذا لم يكن القسم موجودًا، قم بإنشاء قسم جديد مع المنتج
        console.log("Section does not exist, creating new section...");
        result = await ItemArrModal.updateOne(
          { _id: "66d1c9f56f10c7937d54a1b0" },
          {
            $push: {
              storage: {
                sectionName: sectionName,
                products: products, // إنشاء قسم جديد مع المنتجات
              },
            },
          }
        );
      }
    }

    // 5- إعادة النتيجة إلى الواجهة الأمامية
    return NextResponse.json(result);
  } catch (error) {
    console.error("Error occurred:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
