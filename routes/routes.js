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
      var appetizer = [];
      var main = [];
      var dessert = [];
      var beverage = [];
      var categorizedDishes = {main:main,appetizer:appetizer,dessert:dessert,beverage:beverage}
      dishes.forEach((dish) => {
        if(dish.dish_genre_name === 'main' ){ main.push(dish); }
        else if ( dish.dish_genre_name === 'appetizer') {appetizer.push(dish)}
        else if (dish.dish_genre_name === "dessert") {dessert.push(dish)}
        else {beverage.push(dish)}
      })
      res.render('index', {dishes:categorizedDishes})
    });
  });

  // Checkout
  router.post("/", (req, res) => {
    const order = JSON.parse(req.body.order)
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
        var a = JSON.parse(req.body.order)
        let newArr = [];
        for (var prop in a) {
          if (prop != 'total') {
            newArr.push({quantity:a[prop].qty,
                         dish_id:Number(prop),
                         order_id:result[0]
                        });
          }
        }
        knex('line_items').insert(newArr)
        .returning('order_id')
        .then((id) => {
          console.log(id[0]);
          res.redirect(`/order/${id[0]}`)
        });
      });

    });

  });

// TODO use session to keep track of users that are not logged in when they order food.
// if(!req.session.user_id) {
  // req.session.user_id = uuidV4
