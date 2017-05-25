$(function() {
  $('.menu').on('click', '.add-to-cart', function(e) {
    e.preventDefault();
    console.log('adding item to cart');
  })
});