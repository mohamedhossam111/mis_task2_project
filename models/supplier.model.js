const mongoose = require('mongoose');

const SupplierSchema = new mongoose.Schema({
  name: String,
  contactPerson: String,
  phone: String,
  email: {
    type: String,
    unique: true,
  },
  productsSupplied: [String],
  performanceRating: Number,
  lastOrderDate: Date,
  notes: String
}, {
  timestamps: true,
})

const Supplier = mongoose.model('Supplier', SupplierSchema);

module.exports = Supplier;
