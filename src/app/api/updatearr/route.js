import ItemArrModal from "DBconfig/models/ItemArrModal";
import { connectMongoDB } from "DBconfig/mongo";
import { NextResponse } from "next/server";

export async function PUT(request) {
  // 1- استلام البيانات من الواجهة الأمامية
  const  objFromFrontEnd  = await request.json();
  console.log(objFromFrontEnd.item);

  // 2- الاتصال بقاعدة البيانات
  await connectMongoDB();

  // 3- تعديل آخر عنصر في المصفوفة expen
  const invoice = await ItemArrModal.findOne({ _id: "66d1c9f56f10c7937d54a1b0" });
  const lastIndex = invoice.expen.length - 1; // حساب الـ index الأخير في المصفوفة

  // 4- تعديل آخر عنصر في المصفوفة expen
  const result = await ItemArrModal.updateOne(
    { _id: "66d1c9f56f10c7937d54a1b0" },
    { $set: { [`expen.${lastIndex}`]: objFromFrontEnd.item } } // استخدام الـ index لتحديد العنصر الأخير
  );

  // 4- إعادة النتيجة إلى الواجهة الأمامية
  return NextResponse.json(result);
}
