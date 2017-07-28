'use strict'
let command = require('../models/command')
let product = require('../models/product')

module.exports = {
  // fetch all Commands
  getCommands: (req, res) => {
    var response = {}
    command.find({}, (err, data) => {
      // Mongo command to fetch all data from collection.
      if (err) {
        response = { 'error': true, 'message': 'Error fetching data' }
      } else {
        response = data
      }
      res.json(response)
    })
  },
  getCommandById: (req, res) => {
    var response = {}
    console.log(req.params._id)
    command.findOne({ _id: req.params._id })
      .populate('cart')
      .exec((err, data) => {
        if (err) {
          response = { 'error': true, 'message': 'Error fetching data' }
        } else {
          response = data
        }
        res.json(response)
      })
  },
  // insert a command
  addCommand: (req, res) => {
    var response = {}
    console.log(req.body)
    req.body.products.forEach((element) => {
      let productToUpdated = {
        _id: element._id,
        oldPrice: element.oldPrice,
        recentPrice: element.recentPrice,
        availableproducts: element.availableproducts,
        inMarket: element.inMarket,
        name: element.name,
        image: element.image,
        description: element.description,
        editionDate: element.editionDate,
        author: element.author,
        edition: element.edition,
        carts: element.carts,
        commands: element.commands,
        isDeleted: element.isDeleted
      }
      productToUpdated.inMarket -= element.TotalQty
      productToUpdated.availableproducts -= element.TotalQty
      product.findOneAndUpdate({ _id: element._id }, productToUpdated, (err, data) => {
        if (err) console.error(err)

        else {
          console.log(data)
        }
      })
    }
    )
    let db = new command(req.body)

    db.save((err, data) => {
      // save() will run insert() command of MongoDB.
      // it will add new data in collection.
      if (err) {
        return res.send(err)
      } else {
        response = data
      }
      res.json(response)
    })
  }

}
