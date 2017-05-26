$(function() {

  function makeLineItemHTML(lineItem) {
  }

  function makeOrderSummaryHTML(order) {
    // loop over lineItems
      // call the aboec function makeLineItemHTML
      // also get the price and do some arithmetic
    // build into a big ol' <div>, return it
  }

  function redrawOrderSummary(order) {
    var html = `
      <article>
          <header>
            <h3>${escape(tweet.user.handle)}</h3>
            <img class="avatar" src="${tweet.user.avatars.regular}">
            <h2>${escape(tweet.user.name)}</h2>
          </header>
          <p>${escape(tweet.content.text)} </p>
          <footer>
            <img class=icon src="images/heart-icon.png">
            <img class=icon src="images/retwitt-icon.png">
            <img class=flag-icon src="images/flag-icon.png">
            <p>${moment(tweet.created_at).startOf('hour').fromNow()}</p>
          </footer>
        </article>
    `;
    return html;
  }



  var order = {};

  if (localStorage.order) {
    console.log("lso", localStorage.order);
    order = JSON.parse(localStorage.order);
  }

  $('.menu').on('click', '.add-to-cart', function(e) {
    e.preventDefault();
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

    console.log(JSON.stringify(order));

    // at same time use $ to change cart html on page so cart updates visually to user
    redrawOrderSummary(order);
  });
});

 