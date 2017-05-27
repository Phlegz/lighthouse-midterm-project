//added function to global scope
function renderOrder() {
  function makeLineItemHTML(item) {
    var html = `
        <div>${escape(item.qty)} ${escape(item.name)} ${escape(item.price)}
        <img class= "plus" src="/images/plus.png" data-id="${item.id}" height="10px"><img class= "minus" src="/images/minus.png" data-id="${item.id}" height="10px">
        </div>
    `;
    return html;
  }
  function makeOrderSummaryHTML(order) {
    // loop over lineItems
      // call the above function makeLineItemHTML
      // also get the price and do some arithmetic
    // build into a big ol' <div>, return it
  }



  order = JSON.parse(localStorage.order);
  var $orderContainer = $('#order-container');
  $orderContainer.empty();
  var subTotal = 0;
  Object.keys(order).forEach(function(key) {
    var item = order[key];
    $orderContainer.prepend(makeLineItemHTML(item));
    subTotal += item.price * item.qty
  });
  $('#totals .subtotal span').text(subTotal);
}

$(function() {



  var order = {};

  if (localStorage.order) {
    order = JSON.parse(localStorage.order);
  }

  function orderIncrement(data, amount) {
    var id = data.id;
    var name = data.name;
    var price = data.price;
    if (order[id]) {
      order[id].qty += amount;
      if (order[id].qty < 1 ) {
        delete order[id];
      }
    } else {
      order[id] = {
      id,
      name,
      price,
      qty: 1
    };
    }
    localStorage.order = JSON.stringify(order);
    renderOrder();
  }

  $('.menu').on('click', '.add-to-cart', function(event) {
    event.preventDefault();
    orderIncrement(this.dataset, 1);
  });

  $('body').on('click', '.plus', function(event) {
    event.preventDefault();
    orderIncrement(this.dataset, 1);
  });

  $('body').on('click', '.minus', function(event) {
    event.preventDefault();
    orderIncrement(this.dataset, -1);
  });


});
