"use strict";
// TODO:
// Step1: create the order in the database with all the order fields firstName -> totalPaid
// Step2: get the id from the new created order
// Step3: for each element in lineItems create new line_item in database with dishId and orderId and quantity

const express = require("express");

module.exports = (knex) => {
  const router  = express.Router();

  router.get("/", (req, res) => {
    knex('dishes')
    .join('dish_genres', 'dish_genres.id', '=', 'dishes.dish_genre_id')
    .select('dishes.id','dishes.dish_genre_id','dishes.name','dish_genres.name as dish_genre_name','price_in_cents','description','vegan','vegetarian','gluten_free','ocean_wise','image_url','restaurant_id')
    .then((dishes) => {
      const appetizer = [];
      const main = [];
      const dessert = [];
      const beverage = [];
      const categorizedDishes = {main:main,appetizer:appetizer,dessert:dessert,beverage:beverage};
      dishes.forEach((dish) => {
        if(dish.dish_genre_name === 'main' ){ main.push(dish); }
        else if ( dish.dish_genre_name === 'appetizer') { appetizer.push(dish); }
        else if (dish.dish_genre_name === "dessert") { dessert.push(dish); }
        else { beverage.push(dish); }
      });
      res.render('index', {dishes:categorizedDishes})
    });
  });

  // Checkout
  router.post("/", (req, res) => {
    const order = JSON.parse(req.body.order);
    console.log(order);
    knex.select('id').from('restaurants').orderBy('id').limit(1)
    .then((rows) => {
      //TODO check for row[0].id if it exists
      knex.insert({
        restaurant_id: rows[0].id,
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        email: req.body.email,
        phone: req.body.phone,
        street: req.body.street_name,
        city: req.body.city,
        region: req.body.region,
        payment_method: req.body.payment_method,
        total_paid_in_cents: order.total
      })
      .into("orders")
      .returning('id')
      .then((result) => {
        const order = JSON.parse(req.body.order);
        const newArr = [];
        for (const key in order) {
          if (key != 'total') {
            newArr.push({quantity:order[key].qty,
                         dish_id:Number(key),
                         order_id:result[0]
                        });
          }
        }
        knex('line_items').insert(newArr)
        .returning('order_id')
        .then((id) => {
          res.redirect(`/order/${id[0]}`);
        });
      });

    });

  });

// confirmation page
  router.get("/order/:id", (req, res) => {
    const table1 = knex('line_items')
    .select('dish_id','quantity')
    .where('order_id',req.params.id)
    .join('dishes','dishes.id','=','dish_id')
    .select('dish_id','quantity','dishes.name','price_in_cents')

    .then((result) => {
      res.render("orderconfirmation", {orderSummary:result});
    })
  });


  return router;
}

// TODO use session to keep track of users that are not logged in when they order food.
// if(!req.session.user_id) {
  // req.session.user_id = uuidV4
