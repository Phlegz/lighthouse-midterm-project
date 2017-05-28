// Logic for Twiolio goes in here
require('dotenv').config();

const express = require('express');
const router  = express.Router();

const twilio = require('twilio');
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;

const client = twilio(accountSid, authToken);

module.exports = () => {
  // route to handle twilio post request
  router.post("/call/twiml", (req, res) => {
    res.render("twiml");
  })
  // route to handle post request when customer place an order and inform Twilio to call the restaurant
  router.post("/call", (req, res) => {
    client.calls.create({
      url: "https://614c7384.ngrok.io/order/call/twiml",
      to: "+16046556558",
      from: "+14387937553"
    }, function(err, call) {
        if(err){
          console.log(err);
          response.status(500).send(err);
          return;
        }
      });
    res.redirect("orderconfirmation").end()
  });


  router.post("/message", (req, res) => {
    console.log(req.body.Digits);
    client.messages.create({
      body: `Your order is ready in ${req.body.Digits} minutes`,
      to: "+16046556558",
      from: "+14387937553"
    }, function(err, message) {
      if(err)
      console.log(err);
    });
    res.setHeader("Content-Type", "text/xml")
    res.send(`<?xml version="1.0" encoding="UTF-8"?><Response><Say>thank you, have a good day</Say></Response>`);
  })
  return router;
}
