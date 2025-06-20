const mongoose = require('mongoose');

const InventorySchema = new mongoose.Schema({
  item_name: String,
  supplierId: {
    type: mongoose.Types.ObjectId,
    ref: 'Supplier',
  },
  quantity: Number,
  unit: String,
  reorderThreshold: Number,
  lastUpdated: Date
}, {
  timestamps: true,
});

const Inventory = mongoose.model('Inventory', InventorySchema);

module.exports = Inventory;
