const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const models = mongoose.models;

// define the Schema (the structure of the article)
const productSchema = new Schema({
  nmae: String,
  email: String,
  password:String,
});

// Create a model based on that schema
const InvoiceDataModal =
  models.userabdo || mongoose.model("userabdo", productSchema);

// export the model
module.exports = InvoiceDataModal;