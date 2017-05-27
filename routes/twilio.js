// Logic for Twiolio goes in here
require('dotenv').config();

const express = require('express');
const router  = express.Router();

const twilio = require('twilio');
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;

const client = twilio(accountSid, authToken);

module.exports = () => {
  router.post("/call/twiml" , (req, res) => {
    res.render("twiml");
  });

  // router.post("/call", (req, res) => {
    client.calls.create({
      url: "https://2a555f13.ngrok.io/twilio/call/twiml",
      to: "+16046556558",
      from: "+14387937553"
    }, function(err, call) {
      process.stdout.write(call.sid);
    });
  // })





  router.post("/message", (req, res) => {
    let customerNum = "+16046556558";
    client.messages.create({
      body: "Your order is ready in 10 minutes",
      to: customerNum,
      from: twilioNum
    }, function(err, message) {
      process.stdout.write(message.sid);
    });
    res.send("check your message");
  })
  return router;
}
