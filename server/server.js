require("dotenv").config();
const productRoutes = require("./routes/products");
const wishlistRoutes = require("./routes/wishlist");
const authRoutes = require("./routes/auth");


const mongoose = require("mongoose");

const cors = require("cors");

const express = require("express");

const app = express();


app.use(cors());

app.use(express.json());
app.use("/products", productRoutes);
app.use("/wishlist", wishlistRoutes);
app.use("/auth", authRoutes);

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

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
