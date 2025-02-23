var express = require('express');
var router = express.Router();
const User = require('../models/userModel');
const Product = require('../models/productModel');
const bcrypt = require('bcrypt');
require('dotenv').config();
const jwt = require('jsonwebtoken');

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


module.exports = router;
