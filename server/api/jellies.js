const router = require('express').Router()

// const { Jelly, Category } = require('../db/models')


const { requireLogin, requireSeller, requireAdmin, requireDev } = require('../middlewares')


const db = require('../db/db')

const {
    jelly: Jelly,
    category: Category,
    jelly_category: JellyCategory,
} = db.models

module.exports = router

/*
  GUEST ROUTES
*/

// /api/jellies GET
router.get('/', async (req, res, next) => {
  try {
    // console.log(req.query)
    const jellies = await Jelly.findAll()
    res.json(jellies)
  } catch (e) { next(e) }
})

// /api/jellies/categories GET
router.get('/categories', async (req, res, next) => {
  try {
    const categories = await Category.findAll()
    res.json(categories)
  } catch (e) { next(e) }
})


// /api/jellies/:jellyId GET
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

// /api/jellies POST
router.post('/', requireAdmin, async (req, res, next) => {
  try {
    const jelly = await Jelly.create(req.body)
    res.json(jelly)
    await JellyCategory.create({
      jellyId: jelly.dataValues.id,
      categoryId: req.body.categoryId
    })


  } catch (e) { console.error(e)}
})

// /api/jellies/:jellyId PUT
router.put('/', requireAdmin, async (req, res, next) => {
  try {
    const jelly = await Jelly.update(req.body)
    res.json(jelly)
  } catch (e) { next(e) }
})

// /api/jellies/categories POST
router.post('/categories', requireAdmin, async (req, res, next) => {
  try {
    const category = await Category.create(req.body)
    res.json(category)
  } catch (e) { console.error(e)}
})
