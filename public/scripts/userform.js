$(function() {
  $(".userdetails").hide();
  $(".edit-order").hide();

  //the user form pops out and the edit button appears and the menu hides
  $(".continue-button").click(function() {
    $(".edit-order").show();
    $(".userdetails").show();
    $(".sidenav").hide();
    $(".menu").hide();
    $(".continue-button").hide();
    $(".plus").hide();
    $(".minus").hide();
    $(".icon-key").hide();

  // set error message if there are no items in the cart

  });
  //if the edit button is pressed the menu comes back and the form hides
  $(".edit-order").click(function(){
    $(".edit-order").hide();
    $(".userdetails").hide();
    $(".sidenav").show();
    $(".menu").show();
    $(".continue-button").show();
    $(".plus").show();
    $(".minus").show();
    $(".icon-key").show();

  });

  renderOrder();

});
