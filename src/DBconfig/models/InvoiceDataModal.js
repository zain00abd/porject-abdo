import mongoose from "mongoose";

const invoiceSchema = new mongoose.Schema({
  date: { type: String, required: true },
  expense: [
    {
      inv: [
        {
          discraption: String,
          money: Number,
        },
      ],
      time: String,
      user: String,
    },
  ],
  storageinv: [
    {
      inv: [
        {
          discraption: String,
          quatity: Number,
          price: Number,
        },
      ],
      time: String,
      user: String,
    },
  ],
});

const InvoiceDataModal = mongoose.models.InvoiceData || mongoose.model('InvoiceData', invoiceSchema);
export default InvoiceDataModal;
