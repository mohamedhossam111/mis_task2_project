require('dotenv').config();

const customerData = require('./mock_customers.json');
const menuItemData = require('./mock_menu_items.json');
const orderData = require('./mock_orders.json');
const supplierData = require('./mock_suppliers.json');
const transactionData = require('./mock_transactions.json');

const Customer = require('./models/customer.model');
const Order = require('./models/order.model');
const MenuItem = require('./models/menu-item.model');
const Supplier = require('./models/supplier.model');
const Transaction = require('./models/transactions.model');

const importFn = async () => {
  const toSave = [];

  const customerCount =  await Customer.count();

  if (customerCount > 0) {
    console.log('data already imported, skipping import');
    return;
  }

  console.log('Importing data...');

  copyFromData(customerData, Customer, toSave);
  copyFromData(menuItemData, MenuItem, toSave);
  copyFromData(orderData, Order, toSave);
  copyFromData(supplierData, Supplier, toSave);
  copyFromData(transactionData, Transaction, toSave);

  const promises = [];
  for (const doc of toSave) {
    promises.push(doc.save());
  }

  await Promise.all(promises);

  const menuItems = await MenuItem.find();

  const customers = await Customer.find();
  for (const customer of customers) {
    const favoriteDishes = [];
    for (const _ of customer.favoriteDishes) {
      favoriteDishes.push(randomFrom(menuItems));
    }

    customer.favoriteDishes = favoriteDishes;
    await customer.save();
  }

  const orders = await Order.find();
  for (const order of orders) {
    const items = [];
    for (const item of order.items) {
      item.menuItem = randomFrom(menuItems);
      items.push(item);
    }

    order.items = items;
    await order.save();
  }

  console.log('Data imported successfully');
};

function copyFromData(data, ModelClass, aggrArray) {
  for (const entry of data) {
    const doc = new ModelClass();
    for (const [key, value] of Object.entries(entry)) {
      doc[key] = value;
    }

    aggrArray.push(doc);
  }
}

function randomFrom(array) {
  return array[Math.floor(Math.random() * array.length)];
}

module.exports = importFn;
