const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const models = mongoose.models;

const dataSchema = new Schema({
  date: String,
  mode: String,
  money:Number,
  user: String,
});

const TransactionModal = models.expense || mongoose.model('expense', dataSchema);

module.exports = TransactionModal;

  
