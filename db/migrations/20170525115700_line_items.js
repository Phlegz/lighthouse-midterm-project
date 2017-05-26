exports.up = function(knex, Promise) {
  return knex.schema.createTable("line_items", (table) => {
    table.increments("id");
    table.integer("quantity");
    table.integer("order_id");
    table.foreign("order_id").references("orders.id");
    table.integer("dish_id");
    table.foreign("dish_id").references("dishes.id");
  });
};

exports.down = function(knex, Promise) {
  return knex.raw("drop table line_items cascade");
};
