"use strict";
// TODO:
// Step1: create the order in the database with all the order fields firstName -> totalPaid
// Step2: get the id from the new created order
// Step3: for each element in lineItems create new line_item in database with dishId and orderId and quantity
require('dotenv').config();

const express = require('express');
const router  = express.Router();

const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = require('twilio')(accountSid, authToken);

module.exports = (knex) => {

  // Home page
  router.get("/", (req, res) => {

  });

  // Checkout
  router.post("/", (req, res) => {
    let order = {
      first_name: req.body.first_name,
      last_name: req.body.last_name,
      email: req.body.email,
      phone: req.body.phone,
      street: req.body.street_name,
      city: req.body.city,
      region: req.body.region,
      restaurant_id: req.body.restaurant_id,
      payment_method: req.body.payment_method,
      total_paid_in_cents: req.body.total_paid_in_cents,
      line_items: {
        dish_id: req.body.dish_id,
        quantity: req.body.quantity
      }
    }
    res.redirect("/order_id")
  });

  router.post("/call", (req, res) => {
    client.calls.create({
      url: "https://demo.twilio.com/welcome/voice/",
      to: "+16046556558",
      from: "+14387937553"
    }, function(err, call) {
      process.stdout.write(call.sid);
    });
  })

  // restaurant page
  router.get("/restaurant/:restaurant_id/order_id", (req, res) => {
    if (order.order_id != req.params.order_id) {
      res.status(404).send("You do not any orders that match this order id");
      return;
    }
    res.render("order_confirmation")
  });

  router.post("/message", (req, res) => {
    client.messages.create({
      body: "Your order is ready in 10 minutes?",
      to: "+16046556558",
      from: "+14387937553"
    }, function(err, message) {
      process.stdout.write(message.sid);
    });
  })
  return router;
}

// use session to keep track of users that are not logged in when they order food.
// if(!req.session.user_id) {
  // req.session.user_id = uuidV4
