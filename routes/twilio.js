// Logic for Twiolio goes in here
require('dotenv').config();

const express    = require('express');
const twilio     = require('twilio');

const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken  = process.env.TWILIO_AUTH_TOKEN;
const  twilioNum = process.env.TWILIO_NUM;

const client     = twilio(accountSid, authToken);
const router     = express.Router();

module.exports = (knex) => {

  // route to handle twilio post request
  router.post("/twiml", (req, res) => {
    const id = knex('orders').max('id')  //extracts the last order id from db
    .returning('id')
    .then((id) => {
      const orderId = id[0].max;
      const table1 = knex('line_items')   //creates a table first and then joins it
      .select('dish_id','quantity')
      .where('order_id',orderId)
      .join('dishes','dishes.id','=','dish_id')
      .select('dish_id','quantity','dishes.name','price_in_cents')
      .then((result) => {
        res.render("twiml", {orderSummary:result});
      })
    })
  });

  router.post("/", (req, res) => {
    client.calls.create({
      url: "https://51f904b2.ngrok.io/call/twiml",  //TODO change the url accordingly
      to: "+17788772010",    //This is technically the restaurant phone number
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
      const phone = knex('orders').select('phone').where('id',orderId)
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
      })
    })
  });

  return router;
};
