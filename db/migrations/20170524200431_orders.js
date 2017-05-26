exports.up = function(knex, Promise) {
  return knex.schema.createTable("orders", (table) => {
    table.increments("id");
    table.integer("uuid");
    table.string("first_name");
    table.string("last_name");
    table.string("phone");
    table.string("email");
    table.string("region");
    table.string("city");
    table.string("street");
    table.string("postal_code");
    table.string("payment_method");
    table.integer("total_paid_in_cents");
    table.integer("estimated_completion");
    table.timestamps(true,true);
    table.integer("restaurant_id");
    table.foreign("restaurant_id").references("restaurants.id");
 });
};

exports.down = function(knex, Promise) {
  return knex.raw("drop table orders cascade");
};
