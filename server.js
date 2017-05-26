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
let order = {
  first_name: "Tin",
  last_name: "Dang",
  email: "tindang1710@gmail.com",
  phone: "604-655-6558",
  street: "4231 Beatrice",
  city: "Vancouver",
  region: "BC",
  postal_code: "V5N 4H9"
  payment_method: "cash",
  total_paid_in_cents: "83",
  line_items: [{
    dish_id: "22",
    quantity: "1"
  }],
  estimated_completion: "45 mins"
}

// Step1: create the order in the database with all the order fields firstName -> totalPaid
// Step2: get the id from the new created order
// Step3: for each element in lineItems create new line_item in database with dishId and orderId and quantity

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
  order = {
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

// restaurant page
app.get("/restaurant/:restaurant_id/order_id", (req, res) => {
  if (order.order_id != req.params.order_id) {
    res.status(404).send("You do not any orders that match this order id");
    return;
  }
  res.render("order_confirmation")
});

// app.post("/")

app.listen(PORT, () => {
  console.log("Example app listening on port " + PORT);
});
