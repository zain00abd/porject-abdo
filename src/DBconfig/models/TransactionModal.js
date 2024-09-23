const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const models = mongoose.models;

const dataSchema = new Schema({
  date: String,
  mode: String,
  money: Number,
  user: String,
});

const TransactionModal =
  models.transaction || mongoose.model("transaction", dataSchema);

module.exports = TransactionModal;
