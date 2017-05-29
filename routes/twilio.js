// Logic for Twiolio goes in here
require('dotenv').config();

const express    = require('express');
const twilio     = require('twilio');

const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken  = process.env.TWILIO_AUTH_TOKEN;
const twilioNum = process.env.TWILIO_NUM;
const restNum = process.env.REST_PHONE_NUM;
const ngrokHost = process.env.NGROK_HOST;

const client     = twilio(accountSid, authToken);
const router     = express.Router();

module.exports = (knex) => {

  // route to handle twilio post request
  router.post("/twiml", (req, res) => {
    const id = knex('orders').max('id')
    .returning('id')
    .then((id) => {
      const orderId = id[0].max;
      const table1 = knex('line_items')
      .select('dish_id', 'quantity')
      .where('order_id', orderId)
      .join('dishes', 'dishes.id', '=', 'dish_id')
      .select('dish_id', 'quantity', 'dishes.name', 'price_in_cents')
      .then((result) => {
        res.render("twiml", {orderSummary: result});
      });
    });
  });

  // post request to call restaurant
  router.post("/", (req, res) => {
    client.calls.create({
      url: ngrokHost,
      to: restNum,
      from: twilioNum
    }, function(err, call) {
      if(err){
        console.log(err);
        res.status(500).send(err);
        return;
      }
    });
    return;
  });

  // Twilio sends message to customers
  router.post("/message", (req, res) => {
    const id = knex('orders').max('id')
    .returning('id')
    .then((id) => {
      const orderId = id[0].max;
      const phone = knex('orders').select('phone').where('id', orderId)
      .returning('phone')
      .then((phone) => {
        client.messages.create({
          body: `Your order is ready in ${req.body.Digits} minutes`,
          to: phone[0].phone,
          from: twilioNum
        }, function(err, message) {
          if(err) {
            console.log(err);
            res.status(500).send(err);
          }
        });
        res.setHeader("Content-Type", "text/xml");
        res.send(`<?xml version="1.0" encoding="UTF-8"?><Response><Say>thank you, have a good day</Say></Response>`);
      });
    });
  });

  return router;
};
