const router = require('express').Router()
const { Jelly, Category } = require('../db/models')
const { requireLogin, requireSeller, requireAdmin, requireDev } = require('../middlewares')

module.exports = router

/*
  GUEST ROUTES
*/

// /api/jellys GET
router.get('/', async (req, res, next) => {
  try {
    // console.log(req.query)
    const jellys = await Jelly.findAll()
    res.json(jellys)
  } catch (e) { next(e) }
})

// /api/jellys/categories GET
router.get('/categories', async (req, res, next) => {
  try {
    const categories = await Category.findAll()
    res.json(categories)
  } catch (e) { next(e) }
})


// /api/jellys/:jellyId GET
router.get('/:jellyId', async (req, res, next) => {
  try {
    const { jellyId } = req.params
    const jelly = await Jelly.findById(jellyId)
    res.json(jelly)
  } catch (e) { next(e) }
})



/*
  ADMIN ROUTES
*/

// /api/jellys POST
router.post('/', requireAdmin, async (req, res, next) => {
  try {
    const jelly = await Jelly.create(req.body)
    res.json(jelly)
  } catch (e) { console.error(e)}
})

// /api/jellys/:jellyId PUT
router.put('/', requireAdmin, async (req, res, next) => {
  try {
    const jelly = await Jelly.update(req.body)
    res.json(jelly)
  } catch (e) { next(e) }
})

