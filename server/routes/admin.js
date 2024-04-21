const express = require("express");
const adminRouter = express.Router();
const { Product } = require("../models/product");
const { PromiseProvider } = require("mongoose");
module.exports = adminRouter;


// get all my products
adminRouter.get("/api/myproducts", async (req, res) => {
  try {
    const {seller} = req.body;
    if (!seller) {
      return res.status(404).json({ message: "please entre a seller name" });
    }
    const product = await Product.find({seller});
    if (product.length==0) {
      return res.status(404).json({ message: "there is no products" });
    }
    res.status(200).json(product);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// add product
adminRouter.post("/api/AddProducts", async (req, res) => {
  try {
    const { name, description, images, quantity, price, category ,seller } = req.body;
    let product = new Product({
      name,
      description,
      images,
      quantity,
      price,
      category,
      seller,
    });
    product = await product.save();
    res.json(product);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});


// update product
adminRouter.put("/api/products/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Product.findByIdAndUpdate(id, req.body);
    if (!product) {
      return res.status(404).json({ message: "product not found" });
    }
    const UpdateProducts = await Product.findById(id);
    res.status(200).json(UpdateProducts);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});


// delete product
adminRouter.delete("/api/DeleteProduct", async (req, res) => {
  try {
    const { id } = req.body;
    let product = await Product.findByIdAndDelete(id);
    if (!product) {
      return res.status(404).json({ message: "product not found" });
    }
    res.json({ message: "product deleted" });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});