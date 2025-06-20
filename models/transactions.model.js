const mongoose = require('mongoose');

const TransactionSchema = new mongoose.Schema({
  orderId: {
    type: mongoose.Types.ObjectId,
    ref: 'Order',
  },
  amount: Number,
  paymentMethod: String,
  timestamp: Date,
  notes: String
}, {
  timestamps: true,
})

const Transaction = mongoose.model('Transaction', TransactionSchema);

module.exports = Transaction;
