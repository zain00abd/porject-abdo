const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const models = mongoose.models;

// define the Schema (the structure of the article)
const productSchema = new Schema({
  expen: Array,
  wallet: Number,
  transactions:Array,
  expenn:Array,
  storage:Array,
});

// Create a model based on that schema
const InvoiceDataModal =
  models.expense || mongoose.model("expense", productSchema);

// export the model
module.exports = InvoiceDataModal;
