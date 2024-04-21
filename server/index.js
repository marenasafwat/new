const express = require('express');
const mongoose = require('mongoose');
const adminRouter = require("./routes/admin");
const productRouter = require("./routes/product");
const dotenv = require('dotenv');
const { Product } = require('./models/product');
dotenv.config({path: 'config.env'});
const PORT = process.env.PORT || 3000;
const app = express();
const morgan = require('morgan');

//midellware
app.use(express.json());
app.use(adminRouter);
app.use(productRouter); // Use the productRouter for '/api/products' route

// conncetion database
const DB = "mongodb+srv://mohamedhosham143:mohamed123456789@cluster0.ip5k4bi.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";
mongoose.connect(DB).then(() =>{
  console.log('connection Database successful');
}).catch((e) =>{
  console.log(e);
});
/*
// Use routers
app.use(adminRouter(app)); // Pass app to adminRouter
app.use(productRouter(app)); // Pass app to productRouter
*/

// get all products
app.get('/api/products', async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});


// get a specific product by category
app.get('/api/products/:category', async (req, res) => {
  const category = req.params.category;

  try {
    const products = await Product.find({ category: category });
    res.json(products);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

/*
// update a product 
app.put('/api/product/:id' , async (req, res) => {

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

module.exports = router; 
*/

// local host
app.listen(PORT,"0.0.0.0", () => {
  console.log(`connected at port ${PORT}`);
} )



