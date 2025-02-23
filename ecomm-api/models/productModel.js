const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  brand: {
    type: String,
    required: true,
    trim: true
  },
  category: {
    type: String,
    required: true,
    trim: true
  },
  model: {
    type: String,
    required: true,
    trim: true
  },
  size: {
    type: String,
    required: true,
    trim: true
  },
  price: {
    type: Number,
    required: true,
    min: 0
  },
  stock: {
    type: Number,
    required: true,
    min: 0
  },
  image: {
    type: String, 
    required:true
    },
  status:{
    type:String,
    required:true
    }


}, { timestamps: true });

const Product = mongoose.model('Product', productSchema);

module.exports = Product;
