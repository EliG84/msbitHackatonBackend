const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ProductSchema = new Schema({
  extId: Number,
  creationDate: Number,
  name: String,
  url: String,
  thumbnailUrl: String,
  description: String,
  price: Number,
  delivered: Boolean,
  shipper: Number,
});

const Product = mongoose.model('product', ProductSchema);

module.exports = Product;
