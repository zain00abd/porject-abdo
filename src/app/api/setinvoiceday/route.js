import InvoiceDataModal from "DBconfig/models/InvoiceDataModal";
import { connectMongoDB } from "DBconfig/mongo";
import { NextResponse } from "next/server";

export async function POST(request) {
  // استلام البيانات من الواجهة الأمامية
  const { date, type, data } = await request.json();

  // الاتصال بقاعدة البيانات
  await connectMongoDB();

  // البحث عن فاتورة لنفس اليوم
  // البحث عن الفاتورة وتحديثها ثم حفظها
let invoice = await InvoiceDataModal.findOne({ "arrinvoice.date": date });

if (invoice) {
  if (type === "expense") {
    invoice.arrinvoice.find(item => item.date === date).expense.push(data);
  } else {
    invoice.arrinvoice.find(item => item.date === date).storageinv.push(data);
  }
  await invoice.save();
} else {
  const newInvoice = {
    date,
    expense: type === "expense" ? [data] : [],
    storageinv: type === "storageinv" ? [data] : [],
  };
  await InvoiceDataModal.updateOne(
    { _id: "66d1c9f56f10c7937d54a1b0" },
    { $push: { arrinvoice: newInvoice } }
  );
}

return NextResponse.json({ message: "تم تحديث الفاتورة بنجاح" });

}
