exports.up = function(knex, Promise) {
  return knex.schema.createTable("dish_genres", (table) => {
    table.increments("id");
    table.string("name");
  });
};

exports.down = function(knex, Promise) {
  return knex.raw("drop table dish_genres cascade");
};
