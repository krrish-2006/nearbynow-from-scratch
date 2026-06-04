require("dotenv").config();

const mongoose = require("mongoose");

const Product = require("./Product");

const cors = require("cors");

const express = require("express");

const app = express();

app.use(cors());

app.use(express.json());

mongoose
  .connect(process.env.MONGO_URI)
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

app.post("/products", async (req, res) => {
  try {
    const { name, price, shopName } = req.body;
    if (!name || !price || !shopName) {
      return res
        .status(400)
        .json({ message: "Name, price, and shop name are required" });
    }
    const newProduct = await Product.create(req.body);
    res.status(201).json(newProduct);
  } catch (error) {
    console.log("Failed to create product", error);
    res.status(500).json({ message: "Unable to create product" });
  }
});


app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
