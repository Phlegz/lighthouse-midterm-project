exports.up = function(knex, Promise) {
  return knex.schema.createTable("restaurants", (table) => {
    table.increments("id");
    table.string("name");
    table.string("phone");
    table.string("region");
    table.string("city");
    table.string("street");
    table.string("postal_code");
  });
};

exports.down = function(knex, Promise) {
  return knex.raw("drop table restaurants cascade");
};
