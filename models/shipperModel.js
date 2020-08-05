const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ShipperSchema = new Schema({
  name: String,
  type: Number,
  products: [Number],
});
