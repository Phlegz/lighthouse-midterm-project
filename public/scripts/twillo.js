// $(function() {
//   $('.userform').on('submit', function(e) {
//     // Prevent submit event from bubbling and automatically submitting the
//     // form
//     e.preventDefault();

//     // Call the ajax endpoint on the server to initialize the phone call
//     $.ajax({
//       url: '/call',
//       method: 'POST',
//       dataType: 'json',
//       data: {
//         phoneNumber: $('#phoneNumber').val(),
//         salesNumber: $('#salesNumber').val()
//       }
// // The JSON sent back from the server that contains a success or error message
//     }).done(function(data) {
//       alert(data.message);
//     }).fail(function(error) {
//       alert(JSON.stringify(error));
//     });
//   });
// });
