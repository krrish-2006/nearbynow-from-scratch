const products = require("./productsData");

const cors = require("cors");

const express = require("express");

const app = express();

app.use(cors());

const PORT = 5000;

app.get("/", (req, res) => {
  res.send("NearbyNow backend is running");
});

app.get("/products", (req, res) => {
  res.json(products);
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
