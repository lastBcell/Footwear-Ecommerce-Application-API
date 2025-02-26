var express = require('express');
var router = express.Router();
const User = require('../models/userModel');
const Product = require('../models/productModel');
const Cart =require('../models/cartModel');
const Order =require('../models/ordersModel')
const bcrypt = require('bcrypt');
require('dotenv').config();
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');
const fs = require('fs').promises;
const ejs = require('ejs');



const verifyToken = (requiredRole) => {
  return (req, res, next) => {
    const token = req.headers.authorization;

    if (!token) {
      return res.status(401).json({ message: 'Unauthorized - Missing token' });
    }

    jwt.verify(token.split(' ')[1], process.env.JWT_SECRET, (err, decoded) => {
      if (err) {
        return res.status(401).json({ message: 'Unauthorized - Invalid token' });
      }

      // Check the user's role
      if (decoded.role !== requiredRole) {
        return res.status(403).json({ message: 'Forbidden - Insufficient permissions' });
      }

      req.userId = decoded.userId;
      req.role = decoded.role;
      next();
    });
  };
};


/* GET users listing. */
router.get('/', function(req, res, next) {
  res.status('200').json("welcome to User Route");
});

// #User Registration#
router.post('/register', (req, res) => {
  const { email, password, confirmPassword,mobile,name } = req.body;

  // Check if the password and confirm password match
  if (password !== confirmPassword) {
    return res.status(400).json({ message: 'Password and Confirm Password do not match' });
  }

  // Check all fields are not empty
  const user = new User({ email, password,name,mobile });
  const validationError = user.validateSync();

  if (validationError) {
    return res.status(400).json({ error: validationError.errors });
  }

  // Check if the email is already taken
  User.findOne({ email })
    .then(existingUser => {
      if (existingUser) {
         res.status(400).json({ message: 'Email already taken' });
         return
      }
      // Hash the password using bcrypt
      return bcrypt.hash(password, 10);
    })
    .then(hashedPassword => {
      if (!hashedPassword) return;
      // Create a new user in MongoDB
      const newUser = new User({ email, password: hashedPassword ,mobile,name});
      return newUser.save();
    })
    .then(savedUser  => {
      if (!savedUser) return; // Prevents sending multiple responses
      // Respond with success
      res.status(201).json({ message: 'Account created successfully' ,savedUser});
    })
    .catch(error => {
      console.error(error);
      res.status(500).json({ message: 'Internal Server Error' });
    });
});
// #User Login#
router.post('/login', async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    
    if (!user) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const isMatch = await bcrypt.compare(req.body.password, user.password);
    
    
    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }
    if(user.role == "admin"){
      console.log(user.role)
      const token = jwt.sign({ userId: user._id , role:"admin"}, process.env.JWT_SECRET,{ expiresIn: '1h' });
      res.status(200).json({ message: 'Login successful as admin', user,token });
    }
    else
    {
      const token = jwt.sign({ userId: user._id , role :"user"}, process.env.JWT_SECRET,{ expiresIn: '1h' });
      res.status(200).json({ message: 'Login successful', user,token });
    }
    
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// #admin test#
  router.get('/testadmin',verifyToken('admin'),(req ,res,next)=>{
    res.json("admin vanthite")
})
// #get all product were status is show#
router.get('/showallproducts', async (req, res) => {
  try {
      const showProducts = await Product.find({ status: 'show' });
      
      if (showProducts.length === 0) {
          return res.status(404).json({ message: 'No products found with status "show"' });
      }
      
      res.status(200).json({ products: showProducts });
  } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal Server Error' });
  }
});

// #get a particular product#
router.get('/product/:id', async (req, res) => {
  try {
      const product = await Product.findOne({ _id: req.params.id, status: 'show' });

      if (!product) {
          return res.status(404).json({ message: 'Product not found or not available for display' });
      }
      
      res.status(200).json({ product });
  } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal Server Error' });
  }
});
// 🛒 Route: Add product to cart
router.post('/addtocart', async (req, res) => {
  try {
      const { userId, productId, quantity } = req.body;

      if (!userId || !productId) {
          return res.status(400).json({ message: 'User ID and Product ID are required' });
      }

      let cart = await Cart.findOne({ userId });

      if (!cart) {
          // If the cart doesn't exist, create a new one
          cart = new Cart({
              userId,
              cartItems: [{ productId, quantity: quantity || 1 }]
          });
      } else {
          // Check if product already exists in cart
          const itemIndex = cart.cartItems.findIndex(item => item.productId.toString() === productId);

          if (itemIndex > -1) {
              // Product exists, update quantity
              cart.cartItems[itemIndex].quantity += quantity ;
          } else {
              // Add new product
              cart.cartItems.push({ productId, quantity: quantity});
          }
      }

      await cart.save();
      res.status(200).json({ message: 'Product added to cart', cart });
  } catch (error) {
      console.error('Error adding to cart:', error);
      res.status(500).json({ message: 'Server error' });
  }
});
// 🛒 Route: Get cart data of a user
router.get('/getcart/:id', async (req, res) => {
  try {
      const userId  = req.params.id;
      console.log(userId);

      // Find the cart and populate product details
      const cart = await Cart.findOne({ userId }).populate('cartItems.productId');

      if (!cart) {
          return res.status(404).json({ message: 'Cart not found' });
      }

      res.status(200).json(cart.cartItems);
  } catch (error) {
      console.error('Error fetching cart:', error);
      res.status(500).json({ message: 'Server error' });
  }
});
// 🛒 Route: Remove product from cart
router.delete('/removeitem', async (req, res) => {
  try {
      const { userId, productId } = req.body;

      if (!userId || !productId) {
          return res.status(400).json({ message: 'User ID and Product ID are required' });
      }

      let cart = await Cart.findOne({ userId });

      if (!cart) {
          return res.status(404).json({ message: 'Cart not found' });
      }

      // Filter out the product from cartItems array
      cart.cartItems = cart.cartItems.filter(item => item.productId.toString() !== productId);

      await cart.save();
      res.status(200).json({ message: 'Product removed from cart', cart });
  } catch (error) {
      console.error('Error removing product from cart:', error);
      res.status(500).json({ message: 'Server error' });
  }
});
// 🛒 Route: Clear the entire cart for a user
router.delete('/clearcart', async (req, res) => {
  try {
      const { userId } = req.body;

      if (!userId) {
          return res.status(400).json({ message: 'User ID is required' });
      }

      // Find and delete the user's cart
      const cart = await Cart.findOneAndDelete({ userId });

      if (!cart) {
          return res.status(404).json({ message: 'Cart not found' });
      }

      res.status(200).json({ message: 'Cart cleared successfully' });
  } catch (error) {
      console.error('Error clearing cart:', error);
      res.status(500).json({ message: 'Server error' });
  }
});

// Create a new order
router.post('/addorder', async (req, res) => {
  try {
      const { userId, products } = req.body;

      // Validate request body
      if (!userId || !products || !Array.isArray(products) || products.length === 0) {
          return res.status(400).json({ message: 'Invalid request data' });
      }

      // Validate each product and calculate total amount
      let totalAmount = 0;
      for (let item of products) {
          const product = await Product.findById(item.productId);
          if (!product) {
              return res.status(404).json({ message: `Product with ID ${item.productId} not found` });
          }
          totalAmount += product.price * (item.quantity || 1);
      }

      // Create a new order
      const newOrder = new Order({
          user: userId,
          products: products.map(item => ({
              product: item.productId,
              quantity: item.quantity || 1
          })),
          totalAmount
      });

      // Save the order
      const savedOrder = await newOrder.save();
      res.status(201).json({ message: 'Order placed successfully', order: savedOrder });

  } catch (error) {
      res.status(500).json({ message: 'Server error', error: error.message });
  }
});
// get order
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

// Get all orders of a specific user
router.get('/myorders/:userId', async (req, res) => {
  try {
      const { userId } = req.params;

      // Find orders placed by the user, sorted by latest first
      const orders = await Order.find({ user: userId })
          .populate('products.product', 'name price') // Populate product details
          .sort({ createdAt: -1 }); // Sort by latest orders first

      if (!orders.length) {
          return res.status(404).json({ message: 'No orders found for this user' });
      }

      res.status(200).json({ orders });
  } catch (error) {
      res.status(500).json({ message: 'Server error', error: error.message });
  }
});

//send email to the user
router.get('/sendemail/:id', async (req, res) => {
  try {
    // Assuming you have a Product model or equivalent
    const order = await Order.findById( req.params.id)
          .populate('user', 'name email')
          .populate('products.product', 'model price') // Populate product details
          .sort({ createdAt: -1 });

          if (!order) {
            return res.status(404).json({ message: 'No orders found for this user' });
        }
        const userEmail = order.user.email;

    // Create a nodemailer transport object
    // replace this with your copied code
      // Looking to send emails in production? Check out our Email API/SMTP product!
     // Looking to send emails in production? Check out our Email API/SMTP product!
        var transport = nodemailer.createTransport({
          host: "sandbox.smtp.mailtrap.io",
          port: 2525,
          auth: {
            user: process.env.EMAIL_AUTH,
            pass: process.env.EMAIL_PASS
          }
        });


    const template = await fs.readFile('./views/product_email.ejs', 'utf8');
    
    // Email content
    const mailOptions = {
      from: process.env.EMAIL_ADMIN, // Sender email address
      to: `${userEmail}`, // Receiver email address
      subject: 'Order Details', // Email subject
      html: ejs.render(template, { order }) // Render HTML using EJS
    };


    // Send the email
    const info = await transport.sendMail(mailOptions);
    console.log('Email sent:', info.response);


    // Close the transport after sending the email
    transport.close();


    res.send('Email sent successfully');
  } catch (error) {
    console.error('Error sending email:', error);
    res.status(500).send('Internal Server Error');
  }
});
module.exports = router;
