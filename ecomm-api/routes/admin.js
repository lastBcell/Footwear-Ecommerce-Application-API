var express = require('express');
var router = express.Router();
const User = require('../models/userModel');
const bcrypt = require('bcrypt');
require('dotenv').config();
const jwt = require('jsonwebtoken');
const Product = require('../models/productModel');
const Order =require('../models/ordersModel')

const QRCode =require('qrcode')



router.get('/', function(req, res) {
    res.json("welcome to Admin route");
  });
// #all products#
router.get('/allproducts', async (req, res) => {
    try {
        const products = await Product.find();
        res.status(200).json({ products });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});
// #add Product#
router.post('/addproduct', (req, res) => {
    const { brand,category,model,size,price,stock,image,status } = req.body;
    const product = new Product({ brand,category,model,size,price,stock,image,status  });

    const validationError = product.validateSync();

    // If there are validation errors, return the error messages
    if (validationError) {
        const errors = {
            brand: validationError.errors.brand ? validationError.errors.brand.properties.message : undefined,
            category: validationError.errors.category ? validationError.errors.category.properties.message : undefined,
            price: validationError.errors.price ? validationError.errors.price.properties.message : undefined,
            model: validationError.errors.model ? validationError.errors.model.properties.message : undefined,
            size: validationError.errors.size ? validationError.errors.size.properties.message : undefined,
            stock: validationError.errors.stock ? validationError.errors.stock.properties.message : undefined,
            status: validationError.errors.status ? validationError.errors.status.properties.message : undefined,
            image:validationError.errors.image ? validationError.error.status.properties.message: undefined
        };
        return res.status(400).json({ errors });
    }

    // Save the product to the database using promises
    product.save()
        .then(() => {
            res.status(201).json({ message: 'Product added successfully' });
        })
        .catch((error) => {
            console.error(error);
            res.status(500).json({ message: 'Server Error' });
        });
});
// # product
router.get('/Adminproduct/:id', async (req, res) => {
  try {
      const product = await Product.findOne({ _id: req.params.id});

      if (!product) {
          return res.status(404).json({ message: 'Product not found or not available for display' });
      }
      
      res.status(200).json({ product });
  } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal Server Error' });
  }
});

// #Edit Product#
router.put('/editproduct/:id', async (req, res) => {
    const productId = req.params.id;
    const { name, description, brand, category, model, size, price, stock, image, status } = req.body;

    // Create a new product instance for validation
    const product = new Product({ name, description, brand, category, model, size, price, stock, image, status });
    const validationError = product.validateSync();

    // If there are validation errors, return the error messages
    if (validationError) {
        const errors = {};
        Object.keys(validationError.errors).forEach((key) => {
            errors[key] = validationError.errors[key].properties.message;
        });
        return res.status(400).json({ errors });
    }

    try {
        // Update the product in the database
        const updatedProduct = await Product.findByIdAndUpdate(
            productId,
            { name, description, brand, category, model, size, price, stock, image, status },
            { new: true, runValidators: true } // Return the updated document and apply validation
        );

        if (!updatedProduct) {
            return res.status(404).json({ message: 'Product not found' });
        }

        res.status(200).json({ message: 'Product updated successfully', product: updatedProduct });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});

// #admin delete#

router.delete('/deleteproduct/:id', async (req, res) => {
    const productId = req.params.id;

    try {
        const deletedProduct = await Product.findByIdAndDelete(productId);
        
        if (!deletedProduct) {
            return res.status(404).json({ message: 'Product not found' });
        }

        res.status(200).json({ message: 'Product deleted successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});

// #disable product#
router.put('/productstatus/:id', async (req, res) => {
    const productId = req.params.id;
    const { status } = req.body;

    try {
        // Update only the 'show' field in the database
        const updatedProduct = await Product.findByIdAndUpdate(
            productId,
            { status },
            { new: true, runValidators: true }
        );

        if (!updatedProduct) {
            return res.status(404).json({ message: 'Product not found' });
        }

        res.status(200).json({ message: 'Status  updated successfully', product: updatedProduct });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});
// #low stock Products#
router.get('/lowstockproducts', async (req, res) => {
    try {
        const lowStockProducts = await Product.find({ stock: { $lte: 10 } });
        res.status(200).json({ products: lowStockProducts });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});
// #update stock of product#

router.put('/updatestock/:id', async (req, res) => {
    const productId = req.params.id;
    const { stock } = req.body;

    try {
        const product = await Product.findById(productId);
        
        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }
        
        product.stock += stock;
        await product.save();

        res.status(200).json({ message: 'Stock updated successfully', product });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});

// #creating a qr code for a product with views page#
router.get('/v1/productqr/:id',async(req,res)=>{
  const productid =req.params.id;

  const url = `http://localhost:3000/user/product/${productid}`;
    const product = await Product.findById(productid);
                
        if (!product) {
             return res.status(404).json({ message: 'Product not found' });
                } 
  QRCode.toDataURL(url,(err,qrCodeUrl)=>{
    if(err){
        res.status(500).send('Internal Server Error');
    }else{
        res.render('qrcode',{data:qrCodeUrl,product})
    }
  })
})
// #api route for qr#
// #creating a qr code for a product with views page#
router.get('/v2/productqr/:id',async(req,res)=>{
  const productid =req.params.id;

  const url = `http://localhost:3000/user/product/${productid}`;
    const product = await Product.findById(productid);
            
    if (!product) {
         return res.status(404).json({ message: 'Product not found' });
            }   
  QRCode.toDataURL(url,(err,qrCodeUrl)=>{
    if(err){
        res.status(500).send('Internal Server Error');
    }else{
        res.status(200).json({qrdata:qrCodeUrl,product});
    }
  })
})
// update order status

router.put('/status/:orderId', async (req, res) => {
    try {
        const { orderId } = req.params;
        const { status } = req.body;
  
        // Allowed status values
        const allowedStatuses = ['pending', 'dispached', 'completed','returned'];
        if (!allowedStatuses.includes(status)) {
            return res.status(400).json({ message: 'Invalid status value' });
        }
  
        // Find and update the order
        const updatedOrder = await Order.findByIdAndUpdate(
            orderId,
            { status },
            { new: true } // Return the updated order
        );
  
        if (!updatedOrder) {
            return res.status(404).json({ message: 'Order not found' });
        }
  
        res.status(200).json({ message: 'Order status updated successfully', order: updatedOrder });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
  });
  router.get('/getorder/:orderId', async (req, res) => {
    try {
        const { orderId } = req.params;
  
        // Find the order and populate user and product details
        const order = await Order.findById(orderId)
            .populate('user', 'name email') // Fetch user details (only name and email)
            .populate('products.product', 'name price'); // Fetch product details (only name and price)
  
        if (!order) {
            return res.status(404).json({ message: 'Order not found' });
        }
  
        res.status(200).json(order);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
  });
//   get all orders and statuses
router.get('/allorders' ,async(req,res)=>{
     const order = await Order.find()
     .populate('user', 'name email') // Fetch user details (only name and email)
     .populate('products.product', 'name price'); // Fetch product details (only name and price)
     if(!order){
        return  res.status(200).json({message:" internal error could not find orders"});
     }
     res.status(200).json(order);
    })
  module.exports = router; 