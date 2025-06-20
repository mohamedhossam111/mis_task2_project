const mongoose = require('mongoose');

const CustomerSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    lowercase: true,
    unique: true,
  },
  phone: {
    type: String,
    validate: {
      validator: function(v) {
        return !v || /^[0-9]+$/.test(v);
      },
    },
  },
  preferences: {
    type: [String],
  },
  favoriteDishes: [{
    type: mongoose.Types.ObjectId,
    ref: 'MenuItem',
  }],
  orderHistory: [{
    type: mongoose.Types.ObjectId,
    ref: 'Order',
  }],
}, {
  timestamps: true,
});

CustomerSchema.virtual('orderCount').get(function () {
  return this.orderHistory?.length ?? 0;
});

const Customer = mongoose.model('Customer', CustomerSchema);


module.exports = Customer;
