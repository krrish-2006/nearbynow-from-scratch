const express = require("express");

const Product = require("../Product");

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (error) {
    console.log("Failed to fetch products", error);
    res.status(500).json({ message: "Unable to load products" });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ message: "Product doesn't exist" });
    }
    res.json(product);
  } catch (error) {
    console.log("Failed to fetch product", error);
    res.status(500).json({ message: "Unable to load product" });
  }
});


router.put("/:id", async (req, res) => {
  try {
    const updatedProduct = await Product.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true },
    );
    if (!updatedProduct) {
      return res.status(404).json({ message: "Product not found" });
    }
    res.json(updatedProduct);
  } catch (error) {
    console.log("Failed to update product", error);
    res.status(500).json({ message: "Unable to update product" });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const deletedProduct = await Product.findByIdAndDelete(req.params.id);
    if (!deletedProduct) {
      return res.status(404).json({ message: "Product not found" });
    }
    res.json({ message: "Product deleted successfully" });
  } catch (error) {
    console.log("Failed to delete product", error);
    res.status(500).json({ message: "Unable to delete product" });
  }
});

router.post("/", async (req, res) => {
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



module.exports = router;