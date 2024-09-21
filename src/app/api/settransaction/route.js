import TransactionModal from "DBconfig/models/TransactionModal";
import { connectMongoDB } from "DBconfig/mongo";
import { NextResponse } from "next/server";

export async function PUT(request) {
  // 1- استلام البيانات من الواجهة الأمامية
  const objFromFrontEnd = await request.json();
  console.log(objFromFrontEnd.transactions);

  console.log("iiiiiiiiiteeeeeeeeeeeeeemmmmmmmmmmmmm")

  // 2- الاتصال بقاعدة البيانات
  await connectMongoDB();


  const result = await TransactionModal.updateOne(
    { _id: "66d1c9f56f10c7937d54a1b0" },
    { $push: { transactions: {
      date: "String",
      mode: "String",
      money: 1000,
      user: "String",
    } } }
  );

  // 4- إعادة النتيجة إلى الواجهة الأمامية
  return NextResponse.json(result);
}
