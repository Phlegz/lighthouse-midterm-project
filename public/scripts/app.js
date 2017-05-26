$(function() {

  function makeLineItemHTML(lineItem) {
  }

  function makeOrderSummaryHTML(order) {
    // loop over lineItems
      // call the aboec function makeLineItemHTML
      // also get the price and do some arithmetic
    // build into a big ol' <div>, return it
  }

  function populateOrderSummary(item) {
    var html = `
        <ul><p>${escape(item.qty)}</p>
        <p>${escape(item.name)}</p>
        <p>${escape(item.price)}</p>
        </ul>
    `;
    return html;
  }

function renderOrder(order) {
  var $orderContainer = $('#order-container');
  $orderContainer.empty();
  Object.keys(order).forEach(function(key) {
    let item = order[key];
    $orderContainer.prepend(populateOrderSummary(item));
  });
};

  var order = {};

  if (localStorage.order) {
    // console.log(localStorage.order);
    order = JSON.parse(localStorage.order);
  }

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