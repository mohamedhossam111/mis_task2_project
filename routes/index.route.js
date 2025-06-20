const Order = require('../models/order.model');
const Transaction = require('../models/transactions.model');

const router = require('express').Router();

router.get('/', async (req, res, next) => {
  // Group transactions by day (or month), summing the total amount per time unit
  const transactionsResult = await Transaction.aggregate([
    {
      $group: {
        _id: {
          $dateToString: { format: "%Y-%m-%d", date: "$timestamp" }
        },
        totalAmount: { $sum: "$amount" },
        count: { $sum: 1 }
      }
    },
    { $sort: { _id: 1 } }
  ]);

  const labels = transactionsResult.map(entry => entry._id);
  const data = transactionsResult.map(entry => entry.totalAmount);

  const transactionsChartData = {
    labels,
    datasets: [
      {
        label: 'Revenue',
        data,
        fill: false,
        tension: 0.1,
        borderColor: 'rgba(75, 192, 192, 1)'
      }
    ]
  };

  const oneMonthAgo = new Date();
  oneMonthAgo.setMonth(oneMonthAgo.getMonth() - 1);

  //const orders = await Order.find({
  //  orderTime: { $gte: oneMonthAgo },
  //  status: { $ne: 'cancelled' },
  //});
  //
  //const menuItemsMap = {};
  //
  //for (const order of orders) {
  //  for (const item of order.items) {
  //    menuItemsMap[item._id]
  //  }
  //}

  const ordersResult = await Order.aggregate([
    {
      $match: {
        orderTime: { $gte: oneMonthAgo },
        status: { $ne: "cancelled" } // optional: exclude cancelled orders
      }
    },
    { $unwind: "$items" },
    {
      $group: {
        _id: "$items.menuItem",
        totalSold: { $sum: "$items.quantity" }
      }
    },
    {
      $lookup: {
        from: "menuitems", // collection name in MongoDB (usually lowercase plural)
        localField: "_id",
        foreignField: "_id",
        as: "menuItem"
      }
    },
    { $unwind: "$menuItem" },
    {
      $project: {
        _id: 0,
        name: "$menuItem.name",
        totalSold: 1
      }
    },
    { $sort: { totalSold: -1 } }
  ]);

  const ordersLabels = ordersResult.map(item => item.name);
  const ordersData = ordersResult.map(item => item.totalSold);

  const ordersChartData = {
    labels: ordersLabels,
    datasets: [
      {
        label: 'Menu Item Sales (Last 30 Days)',
        data: ordersData,
        backgroundColor: 'rgba(54, 162, 235, 0.5)',
        borderColor: 'rgba(54, 162, 235, 1)',
        borderWidth: 1
      }
    ]
  };


  res.render('index', { transactionsChartData, ordersChartData });
});

module.exports = router;
