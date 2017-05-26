$(function() {

  function makeOrderSummaryHTML(order) {
    // loop over lineItems
      // call the aboec function makeLineItemHTML
      // also get the price and do some arithmetic
    // build into a big ol' <div>, return it
  }

  var order = {};

  if (localStorage.order) {
    order = JSON.parse(localStorage.order);
  }

  //when any 'add to cart' button is pressed it passes a JSON with the dish info 
  //to the renderOrder function
  //if the button is pressed more than once, it updates the quanity 
  $('.menu').on('click', '.add-to-cart', function(event) {
    event.preventDefault();
    var id = this.dataset.id;
    var name = this.dataset.name;
    var price = this.dataset.price;
    if (order[id]) {
      order[id].qty++;
    } else {
      order[id] = {
        name,
        price,
        qty: 1
      };
    }
    localStorage.order = JSON.stringify(order);

    console.log("ORDERS ARE: " + JSON.stringify(order));
   
    renderOrder(order);
  });
});


//added function to global scope 
function renderOrder() {
    function makeLineItemHTML(item) {
      var html = `
          <ul>${escape(item.qty)} ${escape(item.name)} ${escape(item.price)}
          <img class= "plus" src="/images/plus.png" height="10px"><img class= "minus" src="/images/minus.png" height="10px">
          </ul>
      `;
      return html;
    }
    order = JSON.parse(localStorage.order);
    var $orderContainer = $('#order-container');
    $orderContainer.empty();
    Object.keys(order).forEach(function(key) {
      var item = order[key];
      $orderContainer.prepend(makeLineItemHTML(item));
    });
  }

