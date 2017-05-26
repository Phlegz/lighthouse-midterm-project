exports.seed = function(knex, Promise) {
  return knex
  .raw('TRUNCATE TABLE restaurants CASCADE') //truncate table with foreign key constraints
  .then(() => knex('dish_genres').del())  //dish_genres has no ref to restaurants so has to be deleted separately
  .then(() => {
    return knex('dish_genres').insert([
      {name: "appetizer"},
      {name:"main"},
      {name:"beverage"},
      {name:"dessert"}
    ])
    .returning(['id','name']);
  })
  .then((genres) => {
    const genres_object = {};
    genres.map((genre) => {    //turn genres into a map from name to id
      let id = genre.id;
      let name= genre.name;
      genres_object[name] = Number(id);
    });
    return knex('restaurants').insert({
        name: 'Bali Budha',
        phone: '778-778-778',
        region: 'BC',
        city: 'Vancouver',
        street: 'West Hastings',
        postal_code: 'V3A 4S6'
      })
     .returning('id')
     .then((restaurant_id) => {
       const ordersPromise = knex('orders')
       .insert([
         {
            uuid:2423423,
            first_name: "Farnaz",
            last_name: "Rash",
            phone: "778-1000-3000",
            email: "farnaz@gmail.com",
            region: "BC",
            city: "Vancouver",
            street: "W Pender",
            postal_code: "V5A G3S",
            payment_method: "cash",
            total_paid_in_cents: 5990,
            estimated_completion: "60",
            restaurant_id: Number(restaurant_id)
          },
          {
            uuid:4589723,
            first_name: "Aysia",
            last_name: "Lynn",
            phone: "778-2000-1000",
            email: "alysia@gmail.com",
            region: "BC",
            city: "Vancouver",
            street: "Cordova",
            postal_code: "V5T 1S6",
            payment_method: "credit card",
            total_paid_in_cents: 1500,
            estimated_completion: "30",
            restaurant_id: Number(restaurant_id)
          }
        ])
        .returning('id');
        const dishesPromise = knex('dishes')
        .insert([
          {
            name:"Chicken Curry" ,
            price_in_cents: 2095,
            description: "blah blah blah",
            vegan: "no",
            vegetarian: "no",
            gluten_free: "no",
            ocean_wise: "no",
            image_url: "http://www.kawalingpinoy.com/wp-content/uploads/2013/05/currychicken1.jpg",
            restaurant_id: Number(restaurant_id),
            dish_genre_id: genres_object.main
          },
          {
            name:"Budha Salad" ,
            price_in_cents: 1500,
            description: "blah blah blah",
            vegan: "yes",
            vegetarian: "yes",
            gluten_free: "yes",
            ocean_wise: "no",
            image_url: "https://www.wagamama.com/-/media/WagamamaMainsite/hero-pod-images/salads.jpg",
            restaurant_id: Number(restaurant_id),
            dish_genre_id: genres_object.appetizer
          },
        ])
        .returning('id');
        return Promise.all([ordersPromise, dishesPromise]) //needed the id from both orders and dishes to serve as foreign key in line_items, so we used promise.all
        .then(([order_ids, dish_ids]) => {
          return knex('line_items')
          .insert([
            {
              quantity:2,
              order_id: order_ids[0],
              dish_id: dish_ids[0],
            },
            {
              quantity:1,
              order_id: order_ids[1],
              dish_id: dish_ids[1],
            },
          ]);
        });

      });

  });

};
