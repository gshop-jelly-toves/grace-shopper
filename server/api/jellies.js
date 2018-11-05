const router = require('express').Router()
const {Jelly, Category, Review, User, JellyOrder} = require('../db/models')
const {jelly_category: JellyCategory} = require('../db/db').models
const {
  requireLogin,
  requireSeller,
  requireAdmin,
  requireDev
} = require('../middlewares')

module.exports = router

/*
  GUEST ROUTES
*/

// /api/jellies?index=0&amount=10 GET jellies in range (index, amount)
router.get('/', async (req, res, next) => {
  try {
    const index = parseInt(req.query.index)
    const amount = parseInt(req.query.amount)
    const allJellies = await Jelly.findAll()

    const jellies = allJellies
      .sort(function(a, b) {
        if (a.rating > b.rating) return -1
        if (a.rating < b.rating) return 1
        return 0
      })
      .slice(index, index + amount)

    res.json(jellies)
  } catch (e) {
    next(e)
  }
})

// /api/jellies/categories GET all categories
router.get('/categories', async (req, res, next) => {
  try {
    const categories = await Category.findAll()
    res.json(categories)
  } catch (e) {
    next(e)
  }
})

// /api/jellies/:jellyId/reviews/:reviewId GET single review for single jelly
router.get('/:jellyId/reviews/:reviewId', async (req, res, next) => {
  try {
    const {reviewId} = req.params
    const review = await Review.findOne({
      where: {
        id: reviewId
      },
      include: [{model: User}, {model: Jelly}]
    })
    res.json(review)
  } catch (e) {
    next(e)
  }
})

// /api/jellies/:jellyId/reviews GET all reviews for single jelly
router.get('/:jellyId/reviews', async (req, res, next) => {
  try {
    const {jellyId} = req.params
    const jelly = await Jelly.findOne({
      where: {
        id: jellyId
      },
      include: [{model: Review, include: [{model: User}]}]
    })
    res.json(jelly)
  } catch (e) {
    next(e)
  }
})

// /api/jellies/:jellyId/reviews POST new review for single jelly
router.post('/:jellyId/reviews', async (req, res, next) => {
  try {
    const {jellyId} = req.params
    const review = await Review.create(req.body)
    res.json(review)
  } catch (e) {
    next(e)
  }
})

// /api/jellies/:jellyId GET specific jelly
router.get('/:jellyId', async (req, res, next) => {
  try {
    const {jellyId} = req.params
    const jelly = await Jelly.findById(jellyId)
    res.json(jelly)
  } catch (e) {
    next(e)
  }
})

/*
  ADMIN ROUTES
*/

// /api/jellies POST one jelly
router.post('/', requireAdmin, async (req, res, next) => {
  try {
    const jelly = await Jelly.create(req.body)

    // await JellyCategory.create({
    //   jellyId: jelly.dataValues.id,
    //   categoryId: req.body.categoryId
    // })

    console.log('CATEGORY ARRAY', req.body.categoryIds)
    req.body.categoryIds.forEach(
      async id =>
        await JellyCategory.create({
          jellyId: jelly.dataValues.id,
          categoryId: id
        })
    )

    res.json(jelly)
  } catch (e) {
    console.error(e)
  }
})

// /api/jellies/:jellyId PUT
router.put('/:jellyId', requireAdmin, async (req, res, next) => {
  try {
    const {jellyId} = req.params
    const jelly = await Jelly.findById(jellyId)
    jelly.update(req.body)
    res.json(jelly)
  } catch (e) {
    next(e)
  }
})

// /api/jellies/categories POST
router.post('/categories', requireAdmin, async (req, res, next) => {
  try {
    const category = await Category.create(req.body)
    res.json(category)
  } catch (e) {
    console.error(e)
  }
})
