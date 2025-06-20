const mongoose = require('mongoose');

const MenuItemSchema = new mongoose.Schema({
  name: String,
  category: String,
  price: Number,
  ingredients: [String],
  isAvailable: Boolean,
}, {
  timestamps: true,
})

const MenuItem = mongoose.model('MenuItem', MenuItemSchema);

module.exports = MenuItem;
