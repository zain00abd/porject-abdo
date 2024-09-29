import ItemArrModal from "DBconfig/models/ItemArrModal";
import { connectMongoDB } from "DBconfig/mongo";
import { NextResponse } from "next/server";

export async function PUT(request) {
  // 1- استلام البيانات من الواجهة الأمامية
  const objFromFrontEnd = await request.json();
  console.log(objFromFrontEnd.item);
  let data = objFromFrontEnd.item;

  // 2- الاتصال بقاعدة البيانات
  await connectMongoDB();

  // 3- الحصول على الوثيقة من قاعدة البيانات
  const invoice = await ItemArrModal.findOne({
    _id: "66d1c9f56f10c7937d54a1b0",
  });

  // الحصول على آخر كائن داخل مصفوفة expenn
  const lastExpennIndex = invoice.expenn.length - 1;

  // 4- إضافة كائن جديد داخل مصفوفة invoice التابعة لآخر كائن في مصفوفة expenn
  const result = await ItemArrModal.updateOne(
    { _id: "66d1c9f56f10c7937d54a1b0" },
    {
      $push: {
        [`expenn.${lastExpennIndex}.expenses`]: {
          discraption: data.discraption,
          money: data.money,
          user: data.user,
          time: data.time,
        },
      },
    }
  );

  // 5- إعادة النتيجة إلى الواجهة الأمامية
  return NextResponse.json(result);
}
