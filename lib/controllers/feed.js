'use strict'
const feedparser = require('feedparser-promised')
const product = require('../models/product')
const Category = require('../models/category')
const productUrls = require('../models/feed')
module.exports = {

  parseRss: (req, res) => {
    function getFeed (item) {
      return (item.key === req.params.key)
    }
    const feed = productUrls.filter(getFeed)
    const url = feed[0].url
    let products = []
    let names = [
      'Javier Eguia',
      'Harlan Gramling',
      'Joye Holm',
      'Mildred Tetterton',
      'Todd Kozlowski',
      'Florrie Karlin',
      'Forest Mcavoy',
      'Bailey Maier',
      'Ileen Dendy',
      'Olimpia Trull',
      'Lon Frese',
      'Kareen Ferebee',
      'Shelli Kneeland',
      'Zulema Simmons',
      'Theron Risley',
      'Lynsey Schildgen',
      'Roderick Messier',
      'Artie Grasso',
      'Chaya Artis',
      'Monique Skiles',
      'Hiroko Hilburn',
      'Gino Normandin',
      'Eveline Alameda',
      'Bella Withrow',
      'Weldon Santamaria',
      'Trenton Shepler',
      'Tamiko Treadaway',
      'Milford Sanzone',
      'Jerri Finnen',
      'Estell Carls',
      'Lura Speaks',
      'Katheleen Oviatt',
      'Latia Tune',
      'Elmira Foote',
      'Providencia Innis',
      'Lino Groleau',
      'Parker Grissom',
      'Normand Evelyn',
      'Santos Mcconville',
      'Sung Fine',
      'Monet Tomasello',
      'Perry Ciccone',
      'Brianna Mean',
      'Kittie Murrill',
      'Veola Hamblin',
      'Maribel Gilley',
      'Fausto Sellars',
      'Janae Scroggs',
      'Johnnie Pedigo',
      'Polly Clukey'
    ]
    let editions = [
      'site point',
      'oreilly',
      'Small Business Trends',
      'Wiley',
      'Innovation & Tech Today',
      'Groovy Beets',
      'Inc.'
    ]
    let response = {
      'products': [],
      'category': ''
    }
    feedparser.parse(url).then((items) => {      
      items.forEach((item) => {
        let product = {}
        console.log()
        product.oldPrice = Math.round(Math.random() * 100)
        product.recentPrice = product.oldPrice
        product.availableproducts = 20
        product.inMarket = 20
        product.isDeleted = 0
        // console.log(`title: ${item.pubDate.toString().split(' ')[3]}`)
        product.name = item.title
        // console.log(`img: ${item.description.split('src="')[1].split('"')[0]}`)
        product.image = item.description.split('src="')[1].split('"')[0]
        let desc = ''
        if (item.description.includes('</I>')) {
          desc = item.description.split('</I>')[1]
        } else if (item.description.includes('</i>')) {
          desc = item.description.split('</i>')[1]
        } else {
          desc = item.description
        }
        let description = ''
        if (desc.includes('<')) {
          description = desc.split('<')[0]
        } else {
          description = desc
        }
        product.description = `${item.title}${description}`
        product.editionDate = item.pubDate.toString().split(' ')[3]
        product.author = names[Math.round(Math.random() * 50)]
        product.edition = editions[Math.round(Math.random() * 7)]
        // console.log(`description: ${item.title}${description}`)
        // console.log('==================')
        let db = new product(product)
        db.save((err, data) => {
          // save() will run insert() command of MongoDB.
          // it will add new data in collection.
          if (err) {
            return res.send(err)
          } else {
            console.log(data)
            response.products.push(data)
          }
        })
        console.log(db)
      })
      /*let category = { 'name': req.params.key }
      let db = new Category(category)
      db.save((err, data) => {
        if (err) {
          console.error(err)
          return res.send(err)
        } else {
          console.log(data)
          response.category = data.name
        }
      })*/
    }).catch((error) => {
      console.log('error: ', error)
    }).then(
      res.json(response))
  }
  /*,
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
  } */
}
