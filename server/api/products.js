const router = require('express').Router()
const { Product } = require('../db/models')
const { requireLogin, requireSeller, requireAdmin, requiredev } = require('../middlewares')

module.exports = router

/*
  USER ROUTES
*/

// /api/products GET
router.get('/', requireLogin, async (req, res, next) => {
  try {
    const products = await Product.findAll()
    res.json(products)
  } catch (e) { next(e) }
})

// /api/products/:productId GET
router.get('/:productId', requireLogin, async (req, res, next) => {
  try {
    const { productId } = req.params
    const product = await Product.findById(productId)
    res.json(product)
  } catch (e) { next(e) }
})

/*
  ADMIN ROUTES
*/

// /api/products POST
router.post('/', requireAdmin, async (req, res, next) => {
  try {
    const product = await Product.create(req.body)
    res.json(product)
  } catch (e) { next(e) }  
})

// /api/products/:productId PUT
router.put('/', requireAdmin, async (req, res, next) => {
  try {
    const product = await Product.update(req.body)
    res.json(product)
  } catch (e) { next(e) }  
})

