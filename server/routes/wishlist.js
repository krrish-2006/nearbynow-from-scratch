const express = require("express");

const WishlistItem = require("../WishlistItem");

const router = express.Router();

router.get("/:userId", async (req, res) => {
  try {
    const wishlistItems = await WishlistItem.find({
      userId: req.params.userId,
    }).populate("productId");

    const products = wishlistItems.map((item) => item.productId);

    res.json(products);
  } catch (error) {
    console.log("Failed to fetch wishlist", error);
    res.status(500).json({ message: "Unable to load wishlist" });
  }
});

router.post("/", async (req, res) => {
  try {
    const { productId, userId } = req.body;
    if (!productId) {
      return res.status(400).json({ message: "Product ID is required" });
    }
    const existingWishlistItem = await WishlistItem.findOne({
      productId,
      userId,
    });

    if (existingWishlistItem) {
      return res.status(400).json({
        message: "Product already in wishlist",
      });
    }

    const wishlistItem = await WishlistItem.create({ productId, userId });

    res.status(201).json(wishlistItem);
  } catch (error) {
    console.log("Failed to add wishlist item", error);
    res.status(500).json({ message: "Unable to add wishlist item" });
  }
});


router.delete("/:productId/:userId", async (req, res) => {
  try {
    const deletedItem = await WishlistItem.findOneAndDelete({
      productId: req.params.productId,
      userId: req.params.userId,
    });

    if (!deletedItem) {
      return res.status(404).json({ message: "Wishlist item not found" });
    }

    res.json({ message: "Wishlist item removed" });
  } catch (error) {
    console.log("Failed to remove wishlist item", error);
    res.status(500).json({ message: "Unable to remove wishlist item" });
  }
});


module.exports = router;