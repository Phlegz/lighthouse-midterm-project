# Midterm Project

A simple restaurant ordering app that allows users to select their dishes and confirm their payment method with the delivery driver. On completion of the order, we used a Twilio API to send the order to the restaurant over the telephone and allow them to confirm and communicate the time to the customer. This full-stack project used HTML, CSS, JS, jQuery and AJAX, Express, and Knex.

## Final Product 

!["Screenshot of the home page"](https://)

## Dependencies

-   Node 5.10.x or above
-   NPM 3.8.x or above
-   Express
-   Node 5.10.x or above
-   Body-parser
-   Express
-   Knex
-   Knex-logger
-   Morgan


## Getting Started

-   Create the `.env` by using `.env.example` as a reference: `cp .env.example .env`
-   Update the .env file with your correct local information
-   Install dependencies: `npm i`
-   Run migrations: `npm run knex migrate:latest`
-   Check the migrations folder to see what gets created in the DB
-   Run the seed: `npm run knex seed:run`
-   Check the seeds file to see what gets seeded in the DB
-   Run the server: `npm run local`
-   Visit `http://localhost:8080/`

