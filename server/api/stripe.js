const router = require('express').Router()
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY)
const { requireLogin } = require('../middlewares')

module.exports = router

router.post("/charge", requireLogin, async (req, res) => {
  let amount = 500

  const customer = await stripe.customers.create({
    email: req.body.email,
    source: req.body.id
  })
  const charge = await stripe.charges.create({
    amount,
    description: "Sample Charge",
    currency: "usd",
    customer: customer.id
  })
  res.json(charge)
});