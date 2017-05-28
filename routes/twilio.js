// Logic for Twiolio goes in here
require('dotenv').config();

const express = require('express');
const router  = express.Router();

const twilio = require('twilio');
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const twilioNum = process.env.TWILIO_NUM;
const client = twilio(accountSid, authToken);

module.exports = () => {

  // route to handle twilio post request
  router.post("/call/twiml", (req, res) => {
    res.render("twiml");
  });
  // route to handle post request when customer place an order and inform Twilio to call the restaurant
  router.post("/call", (req, res) => {
    client.calls.create({
      url: "https://8661532f.ngrok.io/call/twiml",
      to: "+16046556558",
      from: twilioNum
    }, function(err, call) {
      if(err){
        console.log(err);
        res.status(500).send(err);
        return;
      }
    });
    res.redirect("orderconfirmation").end();
  });

  // Twilio send message to customers
  router.post("/message", (req, res) => {
    console.log(req.body.Digits);
    client.messages.create({
      body: `Your order is ready in ${req.body.Digits} minutes`,
      to: "+16046556558",
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
  return router;
};
