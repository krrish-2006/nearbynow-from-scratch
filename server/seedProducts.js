require("dotenv").config();
const mongoose = require("mongoose");
const Product = require("./Product");
const products = require("./productsData");

async function seedProducts() {
  await mongoose.connect(process.env.MONGO_URI);
  await Product.deleteMany();
  await Product.insertMany(products);

  console.log("Products seeded successfully");

  await mongoose.connection.close();
}

seedProducts();
