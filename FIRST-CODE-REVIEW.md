# Issues

## Log In

* Error: `user.name cannot be null`

## Middlewares

* "Nice implementations of access levels"

## `averageRating`

* `Try/catch` the `await Promise.all`
* Question of whether we need to `await` the final rating when it updates

## Models/Jelly.js

* PRICE: `INTEGER` vs `DECIMAL`
* Add min value to inventory

## Models - Jelly-Order

* Needs primary key!

## Models - Pricing

Capture current price in the itemization of the order e.g.

| OrderNum | Jelly             | Quantity | Price per Jelly | Subtotal | Order Total |
| -------- | ----------------- | -------- | --------------- | -------- | ----------- |
| 1        | Dark Matter Jelly | 2        | $2.00           | $4.00    |
| 1        | Anti Matter Jelly | 3        | $3.00           | $9.00    |
| 1        | Rose Matter Jelly | 4        | $4.00           | $16.00   |
| 1        | Dark Matter Jelly | 5        | $5.00           | $25.00   |
| 1        |                   |          |                 |          | $54.00      |

Think about how to capture the price at the **time of purchase.** Worth thinking about how to store subtotals, order totals.

## Models/Index.js

* Add inverse of Jelly-Orders `belongsToMany`

## Store/jellies

* Maybe change jellies to allJellies?

## Store/index.js

* Use selectors to grab things off state
  * Look into `reselect` library
* Use case - passing plain ol' `state` to `mapStateToProps` to avoid destructuring and headaches with large state mappings
* Look into `normalizr` library
* `jellies` and `singleJelly` - watch out for having the same data, in its entirety or partially, in two places in your state

## Components/JellyList.js

* `keyedJellies` in render via a selector?
* Why not sort the jellies before returning the JSX?z

## Components/SingleJelly.js

* Make the physical form

## Things Geohn likes

* Components that do one thing and that one thing well
* Remember to try and keep presentation and logic separate
  * Use case: placing the tags in a container of sorts; leaving logic inside component

## Takeaways

* Quantity field on join table for orders
* CookieID translates to SessionID
* On Signup:
  * Grab user, take id and put on session
    * db entry will feature `passport(user: NUMBER)`
    * This gets added to `req.user`
  * This allows us to designate key-value pairs as necessary
    * In any route: `req.session.favFood = 'tacos'`
    * It'll appear in the db as part of the `passport` sections
