'use strict'
const mongoose = require('mongoose')
const autoIncrement = require('mongoose-auto-increment')

// var db=mongoose.connection;
// const validator = require('validator')
// mongoose.connect('mongodb://localhost:27017/data')
mongoose.Promise = Promise

const Schema = mongoose.Schema

const productSchema = Schema({

  name: {
    type: String,
    required: true,
    unique: true
  },
 /* author: {
    type: String,
    required: false
  },
  editionDate: {
    type: String,
    required: false
  },*/
  recentPrice: {
    type: Number,
    required: false
  },
  oldPrice: {
    type: Number,
    required: false
  },
  availableproducts: {
    type: Number,
    required: false
  },
  inMarket: { // stock
    type: Number,
    required: false
  },
  description: {
    type: String,
    required: false
  },
  image: {
    type: String,
    required: false
  },
  
  isDeleted: {
    type: Number,
    default: 0,
    min: 0,
    max: 1
  },
  commands: [{
    type: Number,
    ref: 'Command'
  }],
  category: {
    type: Number,
    ref: 'Category'
  },
  carts: [{
    type: Number,
    ref: 'Cart'
  }]
})


productSchema.plugin(autoIncrement.plugin, 'Product')
const product = mongoose.model('Product', productSchema)


module.exports = product
