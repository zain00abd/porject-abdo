import ItemArrModal from "DBconfig/models/ItemArrModal";
import { connectMongoDB } from "DBconfig/mongo";
import { NextResponse } from "next/server";

export async function POST(request) {
  // 1- استلام البيانات من الواجهة الأمامية
  const objFromFrontEnd = await request.json();

  let data = objFromFrontEnd.item;
  console.log(objFromFrontEnd.item.date);

  console.log("iiiiiiiiiteeeeeeeeeeeeeemmmmmmmmmmmmm");

  // 2- الاتصال بقاعدة البيانات
  await connectMongoDB();

  const result = await ItemArrModal.updateOne(
    { _id: "66d1c9f56f10c7937d54a1b0" },
    {
      $push: {
        storage: {
          sectionName: " خيوط ",
          products: [
            { id: 1, name: ' خيط رمادي ', price: '100$', quantity: 20 },
          ],
        },
      },
    }
  );

  // 4- إعادة النتيجة إلى الواجهة الأمامية
  return NextResponse.json(result);
}
