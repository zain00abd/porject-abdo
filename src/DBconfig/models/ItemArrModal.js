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

// Define the main schema, with `storage` as an array of sections
const mainSchema = new Schema({
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
