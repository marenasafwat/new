const express = require("express");
const productRouter = express.Router();
const { Product } = require("../models/product");
const { PromiseProvider } = require("mongoose");
module.exports = productRouter;


// get all products
productRouter.get("/api/allproducts/",  async (req, res) => {
  try {
    const products = await Product.find({});
    if (products.length==0) {
      return res.status(404).json({ message: "there is no products" });
    }
    res.json(products);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});


// get product by category
productRouter.get("/api/productsbycategory/",  async (req, res) => {
  try {
    const {category} = req.body;
    if (!category) {
      return res.status(404).json({ message: "please entre a category name" });
    }
    const products = await Product.find({ category});
    if (products.length==0) {
      return res.status(404).json({ message: "there is no products" });
    }
    
    res.json(products);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

/*
// Update a product by ID
app.put('/api/products/:id', async (req, res) => {
  const productId = req.params.id;
  const updateData = req.body;

  try {
    const updatedProduct = await Product.findByIdAndUpdate(productId, updateData, { new: true });
    if (!updatedProduct) {
      return res.status(404).json({ error: 'Product not found' });
    }
    res.json(updatedProduct);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});
*/
