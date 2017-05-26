$(function() {

$(".userdetails").hide();
$(".edit-order").hide();

//the user form pops out and the edit button appears and the menu hides
$(".continue-button").click(function() {
    $(".edit-order").show();
    $(".userdetails").show();
    $(".menu").hide();
    $(".continue-button").hide();
 // set error message if there are no items in the cart

});
//if the edit button is pressed the menu comes back and the form hides
$(".edit-order").click(function(){
    $(".userdetails").hide();
    $(".edit-order").hide();
    $(".menu").show();
    $(".continue-button").show();
    
})
});