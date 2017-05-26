"use strict";

require('dotenv').config();

const PORT        = process.env.PORT || 8080;
const ENV         = process.env.ENV || "development";
const express     = require("express");
const bodyParser  = require("body-parser");
const sass        = require("node-sass-middleware");
const app         = express();

const knexConfig  = require("./knexfile");
const knex        = require("knex")(knexConfig[ENV]);
const morgan      = require('morgan');
const knexLogger  = require('knex-logger');


const uuidV4 = require ("uuid/v4");
uuidV4();
console.log(uuidV4());
// TODO : uuid middleware
const order = {
  order_id: "22d3f3",
  customer_info: {
    firstName: "Tin",
    lastName: "Dang",
    email: "tindang1710@gmail.com",
    phone: "604-655-6558",
    address: {
      street: "4231 Beatrice",
      city: "Vancouver",
      region: "BC",
      postalCode: "V5N 4H9"
    },
    payment: "Visa",
    total_paid: "83"
  },
  time: {
    created_at: "12:00 PM",
    updated_at: "12:02 PM"
  },
  estimated_completion: "45 mins"
}
// const keyPublishable = process.env.PUBLISHABLE_KEY;
// const keySecret = process.env.SECRET_KEY;
// const stripe = require("stripe")(keySecret);

// Seperated Routes for each Resource
const usersRoutes = require("./routes/users");

// Load the logger first so all (static) HTTP requests are logged to STDOUT
// 'dev' = Concise output colored by response status for development use.
//         The :status token will be colored red for server error codes, yellow for client error codes, cyan for redirection codes, and uncolored for all other codes.
app.use(morgan('dev'));

// Log knex SQL queries to STDOUT as well
app.use(knexLogger(knex));

app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true }));
app.use("/styles", sass({
  src: __dirname + "/styles",
  dest: __dirname + "/public/styles",
  debug: true,
  outputStyle: 'expanded'
}));
app.use(express.static("public"));

// Mount all resource routes
app.use("/api/users", usersRoutes(knex));

// Home page
app.get("/", (req, res) => {
  res.render("index");
});

// Checkout
app.post("/", (req, res) => {
  const order_id = uuid;
  const customer_info = {
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    phone: req.body.phone
  };
  const address = {
    street: req.body.street_name,
    city: req.body.city,
    region: req.body.region
  };
  const created_at = date.now();
  res.redirect("/order_confirmation")
});

// restaurant page
// app.get("/restaurant/:restaurant_id/order_id", (req, res) => {
//   const
//   res.render("order_confirmation")
// });

// app.post("/")

app.listen(PORT, () => {
  console.log("Example app listening on port " + PORT);
});
