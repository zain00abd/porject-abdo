const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const models = mongoose.models;

// Define the nested product schema
const productSchema = new Schema({
  name: String,
  price: Number,
  quantity: Number,
}, { _id: false });

const tt = new Schema({
  name:String,
  quantity:Number,
  price:Number,
}, { _id: false });

const ggt = new Schema({
  user: String,
  time: String,
  invarr:[tt],
}, { _id: false });


// Define the section schema
const sectionSchema = new Schema({
  sectionName: String,
  products: [productSchema], // Array of products
}, { _id: false });

const invSchema = new Schema({
  date:String,
  expenses:[ggt],
  storageinv:[ggt],
  storageminus:[ggt],
}, { _id: false })

// Define the main schema, with `storage` as an array of sections
const mainSchema = new Schema({
  arrinvoice:[invSchema],
  expen: Array,
  wallet: Number,
  transactions: Array,
  expenn: Array,
  storage: [sectionSchema], // Array of sections
});

// Create a model based on that schema
const InvoiceDataModal =
  models.expense || mongoose.model("expense", mainSchema);

// Export the model
module.exports = InvoiceDataModal;
