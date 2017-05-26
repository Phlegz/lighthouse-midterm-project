// Logic for Twiolio goes in here
require('dotenv').config();

const express = require('express');
const router  = express.Router();

const twilio = require('twilio');
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;

const client = twilio(accountSid, authToken);
const VoiceResponse = twilio.twiml.VoiceResponse;

module.exports = () => {
  router.post("/call", (req, res) => {
    client.calls.create({
      url: "https://demo.twilio.com/welcome/voice/",
      to: "+16046556558",
      from: "+14387937553"
    }, function(err, call) {
      process.stdout.write(call.sid);
    });
    res.send("We're calling you");
  })

  router.post("/message", (req, res) => {
    client.messages.create({
      body: "Your order is ready in 10 minutes",
      to: "+16046556558",
      from: "+14387937553"
    }, function(err, message) {
      process.stdout.write(message.sid);
    });
    res.send("check your message");
  })
  return router;
}
