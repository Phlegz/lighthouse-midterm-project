exports.up = function(knex, Promise) {
  return knex.schema.createTable("dishes", (table) => {
    table.increments("id");
    table.string("name");
    table.integer("price_in_cents");
    table.string("description");
    table.string("vegan");
    table.string("vegetarian");
    table.string("gluten_free");
    table.string("ocean_wise");
    table.string("image_url");
    table.integer("restaurant_id");
    table.foreign("restaurant_id").references("restaurants.id");
    table.integer("dish_genre_id");
    table.foreign("dish_genre_id").references("dish_genres.id");
  });
};

exports.down = function(knex, Promise) {
  return knex.raw("drop table dishes cascade");
};
