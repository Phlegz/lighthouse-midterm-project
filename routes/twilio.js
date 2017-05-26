// Installed Twilio API for restaurant
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;

const client = require('twilio')(accountSid, authToken);
app.post("/call", (req, res) => {
  client.calls.create({
    url: "https://demo.twilio.com/welcome/voice/",
    to: "+16046556558",
    from: "+14387937553"
  }, function(err, call) {
    process.stdout.write(call.sid);
  });
})
