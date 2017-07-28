'use strict'
const express = require('express')
const router = express.Router()
const products = require('../controllers/product')
const jwt = require('express-jwt')

// Authentication middleware provided by express-jwt.
// This middleware will check incoming requests for a valid
// JWT on any routes that it is applied to.
const authCheck = jwt({
  secret: new Buffer('QRczXvcrRwrIyTt3C1uCdrWc-desg8lZX8jetrL3_cA7_qAXJq9aQ-H1QxEsOzND', 'base64'),
  audience: 'U2rU3komYnS2EthOEjwpe1XI6LWAn6PL'
})
// products routes

router.get('/products'/*, authCheck */, products.getAllproducts)
.post('/products', products.createproduct)
.get('/products/:_id/product', products.findproductById)
.get('/products/:name', products.FindproductByName)
.get('/products/:ids/many', products.getMany)
// .get('/products/:name/:category',products.FindproductByNameOrCategoryOrAuthorOrPriceOrEditionOrEditionDate)
.post('/products/advancedSearch', products.FindproductByNameOrCategoryOrAuthorOrPriceOrEditionOrEditionDate)
.post('/products/rapidSearch', products.FindproductRapidSearch)

.put('/products/:name/delete', products.deleteproduct)
.put('/products/:name/update', products.updateproduct)


// export router
module.exports = router
