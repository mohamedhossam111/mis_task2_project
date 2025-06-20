const mongoose = require('mongoose');

const OrderSchema = new mongoose.Schema({
  customer: {
    type: mongoose.Types.ObjectId,
    ref: 'Customer',
  },
  items: {
    type: [
      {
        menuItem: {
          type: mongoose.Types.ObjectId,
          ref: 'MenuItem',
        },
        quantity: Number,
        notes: String,
      },
    ],
  },
  totalPrice: Number,
  paymentStatus: String,
  orderTime: Date,
  deliveryType: String,
  status: String,
}, {
  timestamps: true,
});

const Order = mongoose.model('Order', OrderSchema);

module.exports = Order;
