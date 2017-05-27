$(function() {
  $(".userdetails").hide();
  $(".edit-order").hide();

  //the user form pops out and the edit button appears and the menu hides
  $(".continue-button").click(function() {
    $(".edit-order").show();
    $(".userdetails").show();
    $(".menu-container").hide();
    $(".continue-button").hide();
    $(".plus").hide();
    $(".minus").hide();
    $(".icon-key").hide();

  // set error message if there are no items in the cart

  });
  //if the edit button is pressed the menu comes back and the form hides
  $(".edit-order").click(function(){
    $(".userdetails").hide();
    $(".edit-order").hide();
    $(".menu-container").show();
    $(".continue-button").show();
    $(".plus").show();
    $(".minus").show();
    $(".icon-key").show();

  });

  renderOrder();

});
