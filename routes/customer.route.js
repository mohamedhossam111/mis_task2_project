const router = require('express').Router();

const Customer = require('../models/customer.model');

router.get('/', async (req, res, next) => {
  const customers = await Customer.find();

  res.render('customers-list', { customers });
});

module.exports = router;
