const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;

const client = require('twilio')(accountSid, authToken);

app.post("/message", (req, res) => {
  client.messages.create({
    body: "Your order is ready in 10 minutes?",
    to: "+16046556558",
    from: "+14387937553"
  }, function(err, message) {
    process.stdout.write(message.sid);
  });
})
