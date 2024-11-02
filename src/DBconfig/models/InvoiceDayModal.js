const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const models = mongoose.models;

// Define the nested product schema
const productSchema = new Schema({
  name: String,
  price: Number,
  quantity: Number,
});

// Define the section schema
const sectionSchema = new Schema({
  sectionName: String,
  products: [productSchema], // Array of products
});

// Define the schema for expenses and storage invoices within `arrinvoice`
const invoiceEntrySchema = new Schema({
  date: String, // يمكن أن يكون String أو Date حسب احتياجاتك
  expense: [Schema.Types.Mixed], // مصفوفة من البيانات العامة لنوع expense
  storageinv: [Schema.Types.Mixed], // مصفوفة من البيانات العامة لنوع storageinv
});

// Define the main schema, with `storage` as an array of sections
const mainSchema = new Schema({
  expen: Array,
  wallet: Number,
  transactions: Array,
  expenn: Array,
  vv:String,
  storage: [sectionSchema], // Array of sections
  arrinvoice: [invoiceEntrySchema], // Array of invoice entries
});

// Create a model based on that schema
const InvoiceDayModal =
  models.expense || mongoose.model("expense", mainSchema);

// Export the model
module.exports = InvoiceDayModal;
