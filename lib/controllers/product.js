'use strict'
let product = require('../models/product')

module.exports = {

  getAllproducts: (req, res) => {
    var response = {}
    product
      .find({ isDeleted: 0 })
      .populate('category')
      .exec((err, data) => {
        // Mongo command to fetch all data from collection.
        if (err) {
          response = { 'error': true, 'message': 'Error fetching data' }
        } else {
          response = data
        }
        res.json(response)
      })
  },

  FindproductRapidSearch: (req, res) => {
    var response = {}
    console.log(req.body)
    product
      .find({
        isDeleted: 0,
        $or: [
          { name: new RegExp(req.body.attr) },
          { author: new RegExp(req.body.attr) },
          { edition: new RegExp(req.body.attr) },
          { editionDate: new RegExp(req.body.attr) },
          { price: req.body.attr }
          //{ category: req.body.attr }

        ]
      })
      .populate('category')
      .exec((err, data) => {
        // Mongo command to fetch all data from collection.
        if (err) {
          response = { 'error': true, 'message': err }
        } else {
          response = data
        }
        res.json(response)
      })
  },

  FindproductByNameOrCategoryOrAuthorOrPriceOrEditionOrEditionDate: (req, res) => {
    var response = {}
    let query = { isDeleted: 0, oldPrice: { $gt: req.body.priceMin, $lt: req.body.priceMax } }
    if (req.body.name) {
      query.name = new RegExp(req.body.name)
    }
    if (req.body.author) {
      query.author = new RegExp(req.body.author)
    }
    if (req.body.editonDate) {
      query.editonDate = req.body.editonDate
    }
    if (req.body.editon) {
      query.editon = new RegExp(req.body.editon)
    }
    if (req.body.category) {
      query.category = +req.body.category
    }
    console.log(query)

    product.find(query, function (err, data) {
      // Mongo command to fetch all data from collection.
      if (err) {
        response = { 'error': true, 'message': err }
      } else {
        response = data
        // console.log(req.body.attr)
      }
      res.json(response)
    }

    )
  },

  FindproductByPrice: (req, res) => {
    var response = {}
    // we specifie the interval of price by req

    product.find({ isDeleted: 0 })
    .aggregate({ $match: { price: { $gt: 70, $lt: 90 } } }, (err, data) => {
      if (err) {
        response = { 'error': true, 'message': 'Error fetching data' }
      } else {
        response = data
      }
      res.json(response)
    })
  },

  FindproductByName: (req, res) => {
    var response = {}
    // we specifie the interval of price by req
    product.findOne({ name: req.params.name }, (err, data) => {
      if (err) {
        response = { 'error': true, 'message': 'Error fetching data' }
      } else {
        response = data
      }
      res.json(response)
    })
  },

  createproduct: (req, res, next) => {
    let db = new product(req.body)

    var response = {}
    db.save(function (err) {
      // save() will run insert() command of MongoDB.
      // it will add new data in collection.
      if (err) {
        return res.send(err)
      } else {
        response = { 'error': false, 'message': 'Data added' }
      }
      res.json(response)
    })
  },

  findproductById: (req, res) => {
    var response = {}
    console.log(req.params._id)
    product.findOne({ _id: req.params._id }, (err, product) => {
      // Mongo command to fetch all data from collection.
      if (err) {
        response = { 'error': true, 'message': 'Error fetching data' }
      } else {
        console.log(product)
        response = product
      }
      res.json(response)
    })
  },

  deleteproduct: (req, res) => {
    var response = {}
    product.findOneAndUpdate({ _id: req.params._id }, req.body, (err, product) => {
      if (err) return res.status(400).json(err)

      else {
        product.isDeleted = 1
        response = product
      }
      res.json(response)
    })
  },
  updateproduct: (req, res, next) => {
    var response = {}
    product.findOneAndUpdate({ _id: req.params._id }, req.body, (err, product) => {
      if (err) return res.status(400).json(err)

      else {
        response = product
      }
      res.json(response)
    })
  },

  getMany: (req, res) => {
    var response = {}
    let tmp = req.params.ids
    let fields = tmp.split(',')

    product.find({ _id: { $in: fields } }, function (err, product) {
      if (err) return res.status(400).json(err)

      else {
        response = product
      }
      res.json(response)
    })
  },

  parseRss: (req, res) => {
    let response = {'salem': 'salem'}
    console.log(response)
    return res.status(200).json(response)
  }
}
