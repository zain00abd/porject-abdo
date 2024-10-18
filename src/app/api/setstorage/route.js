import ItemArrModal from "DBconfig/models/ItemArrModal";
import { connectMongoDB } from "DBconfig/mongo";
import { NextResponse } from "next/server";

export async function POST(request) {
  // 1- استلام البيانات من الواجهة الأمامية
  const objFromFrontEnd = await request.json();
  const { sectionName, product } = objFromFrontEnd; // استخلاص البيانات المطلوبة

  console.log("Processing request for section: ", sectionName);

  // 2- الاتصال بقاعدة البيانات
  await connectMongoDB();

  // 3- التحقق مما إذا كان القسم موجودًا بالفعل
  const existingSection = await ItemArrModal.findOne({
    "storage.sectionName": sectionName,
  });

  let result;

  if (existingSection) {
    // إذا كان القسم موجودًا، قم بإضافة المنتج فقط
    console.log("Section exists, adding product to it...");
    result = await ItemArrModal.updateOne(
      { "storage.sectionName": sectionName },
      {
        $push: {
          "storage.$.products": product, // إضافة المنتج إلى القسم الموجود
        },
      }
    );
  } else {
    // إذا لم يكن القسم موجودًا، قم بإنشاء قسم جديد مع المنتج
    console.log("Section does not exist, creating new section...");
    result = await ItemArrModal.updateOne(
      { _id: "66d1c9f56f10c7937d54a1b0" },
      {
        $push: {
          storage: {
            sectionName: sectionName,
            products: [product], // إنشاء قسم جديد مع المنتج
          },
        },
      }
    );
  }

  // 4- إعادة النتيجة إلى الواجهة الأمامية
  return NextResponse.json(result);
}
