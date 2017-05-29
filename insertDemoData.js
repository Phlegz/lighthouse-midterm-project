const knexConfig  = require("./knexfile");
const knex        = require("knex")(knexConfig['development']);

knex
.raw('TRUNCATE TABLE restaurants CASCADE') //truncate table with foreign key constraints
.then(() => knex('dish_genres').del())
.then(() => {
  const generesPromise = knex('dish_genres')
    .insert([
      {name: "appetizer"},
      {name:"main"},
      {name:"beverage"},
      {name:"dessert"}
    ])
    .returning(['id','name']);

  const restaurantsPromise = knex('restaurants')
    .insert({
      name: 'Bali Budha',
      phone: '778-778-778',
      region: 'BC',
      city: 'Vancouver',
      street: 'West Hastings',
      postal_code: 'V3A 4S6'
      })
     .returning('id');

  Promise.all([generesPromise, restaurantsPromise])
  .then(([genreResults,restResults]) => {
    const genres_object = {};
    genreResults.map((genre) => {    //turn genres into a map from name to id
    let id = genre.id;
    let name= genre.name;
    genres_object[name] = Number(id);
    });
    knex('dishes')
    .insert([
      {
        name:"Chicken Curry" ,
        price_in_cents: 2095,
        description: "Organic chicken cookde in coconut milk with with onions, ginger, garlic, and tomatoes, and powdered spices. served with aromatic rice",
        vegan: "no",
        vegetarian: "no",
        gluten_free: "no",
        ocean_wise: "no",
        image_url: "http://www.kawalingpinoy.com/wp-content/uploads/2013/05/currychicken1.jpg",
        restaurant_id: Number(restResults[0]),
        dish_genre_id: genres_object.main
      },
      {
        name:"Bali Budha Tacos" ,
        price_in_cents: 1695,
        description: "Vegetarian tacos filled with fried beans, fresh veggies, guacomole, salsa,cheddar and spiced yogurt",
        vegan: "no",
        vegetarian: "yes",
        gluten_free: "yes",
        ocean_wise: "no",
        image_url: "http://www.akingslife.com/wp-content/uploads/2012/06/IMG_2911.jpg",
        restaurant_id: Number(restResults[0]),
        dish_genre_id: genres_object.main
      },
      {
        name:"Gourmet Burgers" ,
        price_in_cents: 2295,
        description: "Choose from chicken, bean, tofu, or beet root patties topped with pesto, mayo and fresh veggies. Comes with a side of organic salad and homemade fries",
        vegan: "no",
        vegetarian: "yes",
        gluten_free: "no",
        ocean_wise: "no",
        image_url: "http://www.taste.com.au/images/recipes/agt/2012/08/30765_l.jpg",
        restaurant_id: Number(restResults[0]),
        dish_genre_id: genres_object.main
      },
      {
        name:"Budha Salad Bowl" ,
        price_in_cents: 1500,
        description: "Fresh organic tomatos, ruccola, onion, avocado and mango tossed with feta cheese",
        vegan: "yes",
        vegetarian: "yes",
        gluten_free: "yes",
        ocean_wise: "no",
        image_url: "https://www.wagamama.com/-/media/WagamamaMainsite/hero-pod-images/salads.jpg",
        restaurant_id: Number(restResults[0]),
        dish_genre_id: genres_object.appetizer
      },
      {
        name:"Thai Green Papaya Salad" ,
        price_in_cents: 1600,
        description: "Green papaya, herbs and chili on a bed of organic salad topped with a zesty dressing and roasted peanuts",
        vegan: "yes",
        vegetarian: "yes",
        gluten_free: "no",
        ocean_wise: "no",
        image_url: "http://www.sbs.com.au/food/sites/sbs.com.au.food/files/41-papayasalad_0.jpg",
        restaurant_id: Number(restResults[0]),
        dish_genre_id: genres_object.appetizer
      },
      {
        name:"Ayomayo Salad" ,
        price_in_cents: 1400,
        description: "Chicken with spiced mayo on a bed of organic salad with kale and side of our home made pita bread",
        vegan: "no",
        vegetarian: "no",
        gluten_free: "no",
        ocean_wise: "no",
        image_url: "https://www.friendlys.com/wp-content/themes/netplus/img/production/detail/menu/lunch-dinner_soups-salads_crispy-chicken-salad.jpg",
        restaurant_id: Number(restResults[0]),
        dish_genre_id: genres_object.appetizer
      },
      {
        name:"Fresh Juices" ,
        price_in_cents: 700,
        description: "Pineapple, papaya, avocado, banana, mango, passion fruit or mixed",
        image_url: "http://www.berkeleywellness.com/sites/default/files/400-06365527c-Masterfile-Boarding1Now.jpg",
        restaurant_id: Number(restResults[0]),
        dish_genre_id: genres_object.beverage
      },
      {
        name:"Lassies" ,
        price_in_cents: 1000,
        description: "Plane, honey, cardomom, fruit, vanilla or blueberry",
        image_url: "http://www.vegrecipesofindia.com/wp-content/uploads/2010/05/mango-lassi-recipe7.jpg",
        restaurant_id: Number(restResults[0]),
        dish_genre_id: genres_object.beverage
      },
      {
        name:"Goji Turmeric Super Duper" ,
        price_in_cents: 1000,
        description: "Goji juice, fresh turmeric, tamarind, lemon, black pepper and honey",
        image_url: "http://www.coconutandberries.com/wp-content/uploads/2014/09/DSC_0246_thumb.jpg",
        restaurant_id: Number(restResults[0]),
        dish_genre_id: genres_object.beverage
      },
      {
        name:"Full Creame Chocolate Gelato" ,
        price_in_cents: 600,
        image_url: "http://1.bp.blogspot.com/_LuT4cCnLT1g/S76ZEbSL_SI/AAAAAAAAEGo/F0-9uqRggUw/s1600/IMG_6341.JPG",
        restaurant_id: Number(restResults[0]),
        dish_genre_id: genres_object.dessert
      },
      {
        name:"Fruits with mango ice cream" ,
        price_in_cents: 600,
        image_url: "http://www.monikaicecream.com/img/gallery/fruit%20salad/img3.jpg",
        restaurant_id: Number(restResults[0]),
        dish_genre_id: genres_object.dessert
      },
      {
        name:"Strawberry Tart" ,
        price_in_cents: 600,
        image_url: "https://images-gmi-pmc.edge-generalmills.com/df5104d1-5ec9-4fc6-aa6c-75662ea74f52.jpg",
        restaurant_id: Number(restResults[0]),
        dish_genre_id: genres_object.dessert
      },
    ])
    .then(()=>{
      knex.destroy();
    });
  });

});
