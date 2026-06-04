const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  id: Number,
  image: String,
  shopName: String,
  name: String,
  price: String,
  stock: Number,
  sellerContact: String,
  shopAddress: String,
  mapsUrl: String,
});

const Product = mongoose.model("Product", productSchema);

module.exports = Product;
