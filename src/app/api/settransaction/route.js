import ItemArrModal from "DBconfig/models/ItemArrModal";
import { connectMongoDB } from "DBconfig/mongo";
import { NextResponse } from "next/server";

export async function POST(request) {
  // 1- استلام البيانات من الواجهة الأمامية
  const objFromFrontEnd = await request.json();
  console.log(objFromFrontEnd.mode);

  console.log("iiiiiiiiiteeeeeeeeeeeeeemmmmmmmmmmmmm");

  // 2- الاتصال بقاعدة البيانات
  await connectMongoDB();

  await ItemArrModal.updateOne(
    { _id: "66d1c9f56f10c7937d54a1b0" },
    {
      $push: {
        transactions: {
          date: objFromFrontEnd.date,
          mode: objFromFrontEnd.mode,
          money: objFromFrontEnd.money,
          user: objFromFrontEnd.user,
          title: objFromFrontEnd.title,
        },
      },
    }
  );

  // 4- إعادة النتيجة إلى الواجهة الأمامية
  return NextResponse.json("result");
}
