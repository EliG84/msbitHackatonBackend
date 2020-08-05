const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ProductSchema = new Schema({
  id: Number,
  creationDate: Number,
  name: String,
  url: String,
  thunmbnailUrl: String,
  price: Number,
});

const Product = mongoose.model("product", ProductSchema);
