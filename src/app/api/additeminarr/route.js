import ItemArrModal from "DBconfig/models/ItemArrModal";
import { connectMongoDB } from "DBconfig/mongo";
import { NextResponse } from "next/server";

export async function POST(request) {
  // 1- استلام البيانات من الواجهة الأمامية
  const { date, type, data } = await request.json();
  console.log(date);
  console.log(type);
  console.log(data);

  // 2- الاتصال بقاعدة البيانات
  await connectMongoDB();

  let invoice = await ItemArrModal.findOne({ "arrinvoice.date": date });


  if (invoice) {
    const indexarr = invoice.arrinvoice.length - 1;

    const result = await ItemArrModal.updateOne(
      { _id: "66d1c9f56f10c7937d54a1b0" },
      {
        $push: {
          [`arrinvoice.${indexarr}.${type}`]: 
            data,
          
        },
      }
    );
  } else {
    const result = await ItemArrModal.updateOne(
      { _id: "66d1c9f56f10c7937d54a1b0" },
      {
        $push: {
          arrinvoice: {
            date: date,
            expenses: type === "expenses" ? data : [],
            storageinv: type === "storageinv" ? data : [],
            
          },
        },
      }
    );
  }

  // 4- إعادة النتيجة إلى الواجهة الأمامية
  return NextResponse.json("result");
}
