const router = require('express').Router()
const { Product, Category } = require('../db/models')
const { requireLogin, requireSeller, requireAdmin, requireDev } = require('../middlewares')

module.exports = router

/*
  GUEST ROUTES
*/

// /api/products GET
router.get('/', async (req, res, next) => {
  try {
    // console.log(req.query)
    const products = await Product.findAll()
    res.json(products)
  } catch (e) { next(e) }
})

// /api/products/:productId GET
router.get('/:productId', async (req, res, next) => {
  try {
    const { productId } = req.params
    const product = await Product.findById(productId)
    res.json(product)
  } catch (e) { next(e) }
})

// /api/products/categories GET
router.get('/categories', async (req, res, next) => {
  try {
    const categories = await Category.findAll()
    const list = categories.map(category => category.name)
    res.json(list)
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

