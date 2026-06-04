const mongoose = require("mongoose");

const Product = require("./Product");

const cors = require("cors");

const express = require("express");

const app = express();

app.use(cors());

mongoose
  .connect("mongodb://127.0.0.1:27017/nearbynow")
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((error) => {
    console.log("MongoDB connection failed", error);
  });

const PORT = 5000;

app.get("/", (req, res) => {
  res.send("NearbyNow backend is running");
});

app.get("/products", async (req, res) => {
  const products = await Product.find();
  res.json(products);
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
