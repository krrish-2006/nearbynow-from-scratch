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
  try {
    const products = await Product.find();
    res.json(products);
  } catch (error) {
    console.log("Failed to fetch products", error);
    res.status(500).json({ message: "Unable to load products" });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
