const mongoose = require("mongoose");
const Product = require("./Product");
const products = require("./productsData");

async function seedProducts() {
  await mongoose.connect("mongodb://127.0.0.1:27017/nearbynow");

  await Product.deleteMany();
  await Product.insertMany(products);

  console.log("Products seeded successfully");

  await mongoose.connection.close();
}

seedProducts();

