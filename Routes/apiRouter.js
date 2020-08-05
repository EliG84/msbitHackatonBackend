const express = require('express');
const Product = require('../Models/productModel');
const _ = require('lodash');
const router = express.Router();

router.get('/products', async (req, res) => {
  const { page = 1, limit = 100, search = '' } = req.query;
  const mySearch = new RegExp(`${search}`, 'i');
  const data = await Product.find({
    $and: [
      { delivered: true },
      { $or: [{ name: mySearch }, { description: mySearch }] },
    ],
  })
    .limit(Number(limit))
    .skip((page <= 0 ? 0 : page - 1) * limit);
  const count = await Product.find({
    $and: [
      { delivered: true },
      { $or: [{ name: mySearch }, { description: mySearch }] },
    ],
  }).countDocuments();
  res.status(200).json({
    totalPages: Math.ceil(count / limit),
    limitPerPage: Number(limit),
    totalFound: Number(count),
    products: _.map(
      data,
      _.partialRight(_.pick, [
        'extId',
        'name',
        'description',
        'thumbnailUrl',
        'price',
      ])
    ),
  });
});

router.get('/adminAccess', async (req, res) => {
  const data = await Product.find();
  res.status(200).json(data);
});

module.exports = router;
