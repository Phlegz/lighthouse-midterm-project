//added function to global scope
function renderOrder() {
  function makeLineItemHTML(item) {
    var name = decodeURIComponent(item.name);
    var html = `
        <div>${escape(item.qty)} ${name} ${escape(item.price/100)}
        <img class= "plus" src="/images/plus.png" data-id="${item.id}" height="10px"><img class= "minus" src="/images/minus.png" data-id="${item.id}" height="10px">
        </div>
    `;
    return html;
  }

  //loops through the order and calcultes subtotal, tax, and total
  order = JSON.parse(localStorage.order);
  var $orderContainer = $('#order-container');
  $orderContainer.empty();
  var subTotal = 0;
  var taxRates = 0.07;
  var tax = 0;
  var total = 0;
  Object.keys(order).forEach(function(key) {
    var item = order[key];
    $orderContainer.prepend(makeLineItemHTML(item));
    subTotal += item.price * item.qty;
    tax = subTotal * taxRates;
    total = subTotal + tax;
  });
  $('#totals .subtotal span').text((subTotal/100).toFixed(2));
  $('#totals .tax span').text((tax/100).toFixed(2));
  $('#totals .total span').text((total/100).toFixed(2));
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
