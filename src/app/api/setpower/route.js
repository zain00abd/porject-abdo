import PowerModal from "DBconfig/models/PowerModal";
import { connectMongoDB } from "DBconfig/mongo";
import { NextResponse } from "next/server";

export async function PUT(request) {
  // 1- استلام البيانات من الواجهة الأمامية
  const objFromFrontEnd = await request.json();
  console.log(objFromFrontEnd.textpower);
  console.log(objFromFrontEnd.Iduser);

  console.log("iiiiiiiiiteeeeeeeeeeeeeemmmmmmmmmmmmm");

  // 2- الاتصال بقاعدة البيانات
  await connectMongoDB();

  await PowerModal.updateOne(
    { _id: objFromFrontEnd.Iduser },
    {
      name:objFromFrontEnd.textpower,
    }
  );

  // 4- إعادة النتيجة إلى الواجهة الأمامية
  return NextResponse.json("result");
}
