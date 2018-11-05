const router = require('express').Router()
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY)
const { requireLogin } = require('../middlewares')

module.exports = router

router.post("/charge", requireLogin, async (req, res) => {
  let amount = 500;

  const customer = await stripe.customers.create({
    email: req.body.stripeEmail,
    source: req.body.stripeToken
  })
  const charge = await stripe.charges.create({
    amount,
    description: "Sample Charge",
    currency: "usd",
    customer: customer.id
  })
  console.log('charge:',charge)
  res.json(req.user)
});