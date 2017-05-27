"use strict";
// TODO:
// Step1: create the order in the database with all the order fields firstName -> totalPaid
// Step2: get the id from the new created order
// Step3: for each element in lineItems create new line_item in database with dishId and orderId and quantity

const express = require("express");

module.exports = (knex) => {
  const router  = express.Router();

  router.get("/", (req, res) => {
    console.log('hello');
    // const order = {
    //   id:1
    //   name:'salad'
    //   price:10
    //   qty: 1
    // }
    // localStorage.order = JSON.stringify(order);
    // knex.select('id','name','price_in_cents','description','vegan','vegetarian','gluten_free','ocean_wise','image_url','restaurant_id','dish_genre_id').from('dishes')
    // .then((dishes) => {
    //   console.log(localStorage.order);
    //   res.render("index",{dishes})
    // })
  });


  // Checkout
  router.post("/", (req, res) => {

    // knex.select('id').from('restaurants').orderBy('id').limit(1)
    // .then((rows) => {
    //   //TODO check for row[0].id
    //   knex.insert({
    //     restaurant_id: rows[0].id,
    //     first_name: req.body.first_name,
    //     last_name: req.body.last_name,
    //     email: req.body.email,
    //     phone: req.body.phone,
    //     street: req.body.street_name,
    //     city: req.body.city,
    //     region: req.body.region,
    //     payment_method: req.body.payment_method,
    //     total_paid_in_cents: req.body.total_paid_in_cents
    //   })
    //   .into("orders")
    //   .returning('id')
    //   .then((result) => {
    //     const items = req.body.item;
    //     knex(table_name).insert(JSON.parse(req.body.param_name)));
    //     const lineItemsPromise = knex.insert(JSON.parse(req.body.items))
    //       console.log(result);

        // line_items: [{
        //   dish_id: ,
        //   quantity: req.body.quantity
        // }]

      })
      .then(() => {
        console.log(order);
        res.redirect("/order_id")
      })
    })


  });


  // restaurant page
  router.get("/order/:id", (req, res) => {
    knex.select(saasd,dads,sdasd).from("orders")
    .then((dishes) => {
      res.render("index",{dishes})
    })
    if (order.order_id != req.params.order_id) {
      res.status(404).send("You do not any orders that match this order id");
      return;
    }
    res.render("order_confirmation")
  });

  return router;
}

// use session to keep track of users that are not logged in when they order food.
// if(!req.session.user_id) {
  // req.session.user_id = uuidV4
