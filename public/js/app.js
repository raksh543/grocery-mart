console.log("Client side javascript is running")


// var stripe = Stripe('sk_test_ibdmQudewKOFQONKNrhpqcJQ00QKbE1M9a');
// var elements = stripe.elements();


// var card = elements.create('card', {
//   'style': {
//     'base': {
//       'fontFamily': 'Arial, sans-serif',
//       'fontSize': '8px',
//       'color': '#C1C7CD',
//     },
//     'invalid': {
//       'color': 'red',
//     },
//   }
// });

// // Mount the UI card component into the `card-element` <div>
// card.mount('#card-element');

// var stripeResponseHandler = function(status, response) {
//   // Grab the form:
//   var form = document.getElementById('checkout-form');

//   if (response.error) { // Problem!
//     // Show the errors on the form:
//   } else { // Token was created!
//     // Get the token ID:
//     var token = response.id;

//     // Insert the token ID into the form so it gets submitted to the server
//     var form = document.getElementById('checkout-form');
//     var hiddenInput = document.createElement('input');
//     hiddenInput.setAttribute('type', 'hidden');
//     hiddenInput.setAttribute('name', 'stripeToken');
//     hiddenInput.setAttribute('value', token);
//     form.appendChild(hiddenInput);

//     // Submit the form
//     form.submit();
//   }
// };
// function createToken() {
//   stripe.createToken(card).then(function(result) {
//     if (result.error) {
//       // Inform the user if there was an error
//       var errorElement = document.getElementById('card-errors');
//       errorElement.textContent = result.error.message;
//     } else {
//       // Send the token to your server
//       stripeTokenHandler(result.token);
//     }
//   });
// };

// form.addEventListener('submit', function(e) {
//   e.preventDefault();
//   Stripe.card.createToken(form, stripeResponseHandler);
// });



// function stripeTokenHandler(token) {
//   // Insert the token ID into the form so it gets submitted to the server
//   var form = document.getElementById('checkout-form');
//   var hiddenInput = document.createElement('input');
//   hiddenInput.setAttribute('type', 'hidden');
//   hiddenInput.setAttribute('name', 'stripeToken');
//   hiddenInput.setAttribute('value', token.id);
//   form.appendChild(hiddenInput);

//   // Submit the form
//   form.submit();
// }

// card.addEventListener('change', function(event) {
//   var displayError = document.getElementById('card-errors');
//   if (event.error) {
//     displayError.textContent = event.error.message;
//   } else {
//     displayError.textContent = '';
//   }
// });



// Stripe.setPublishableKey('pk_test_VgEg9d0xqcY7X7WQet0lfRoC00p4FukC7d');
Stripe.setPublishableKey('pk_test_VgEg9d0xqcY7X7WQet0lfRoC00p4FukC7d');

var form = document.querySelector("#payment-form")

// form.addEventListener('submit', (e) => {
  // document.querySelector("#clickhere").click(() => {
    document.querySelector("#clickhere").addEventListener('click', (e) => {
    console.log("Method Running")
  var name = document.querySelector("#name")
  var button = document.querySelector("#submit")
  var cardname = document.querySelector("#card-name")
  var number = document.querySelector("#card-number")
  var cvc = document.querySelector("#card-cvc")
  var month = document.querySelector("#card-expiry-month")
  var year = document.querySelector("#card-expiry-year")

  // button.prop('disabled', true)

  Stripe.card.createToken({
    number: number.value,
    cvc: cvc.value,
    exp_month: month.value,
    exp_year: year.value,
    name: cardname.value
  }, function stripeResponseHandler(status, response) {

    if (response.error) {
      // document.querySelector("#charged-error").text(response.error);
      document.querySelector("#charged-error").innerHTML=response.error

    } else { // Token was created!

      // Get the token ID:
      var token = response

      // Insert the token into the form so it gets submitted to the server:
      // form.append(document.querySelector('<input type="hidden" name="stripeToken"/>').val(token));
      document.querySelector("#stripeToken").value = token.id
      console.log(token)

      // Submit the form:
      // form.get(0).submit();
      // $("input").trigger("select");
      // document.querySelector("#submit").trigger("select")
      document.querySelector("#submit").click()
    }
  }
  )
  
  return false


})


// $form.submit(function(event){
//     // $form.find('button').prop('disabled', true);
//     $('#button').prop('disabled', true);
//     console.log( $('#card-number').value)
//     Stripe.card.createToken({
//         number: $('#card-number').val(),
//         cvc: $('#card-cvc').val(),
//         exp_month: $('#card-expiry-month').val(),
//         exp_year: $('#card-expiry-year').val(),
//         name: $('#card-name').val()
//       }, stripeResponseHandler);
//       return false;
// });

// function stripeResponseHandler(status, response) {

//   if (response.error) { // Problem!

//     // Show the errors on the form
//     // $('#charged-error').text(response.  error.message);
//     document.querySelector("#charged-error").text(response.error);
//     // $('#charged-error').text(response.error);


//     // var button = document.querySelector("#submit")
//     // button.prop('disabled', false)
//     // $form.find('button').prop('disabled', false); // Re-enable submission

//   } else { // Token was created!

//     // Get the token ID:
//     var token = response.id;

//     // Insert the token into the form so it gets submitted to the server:
//     // form.append(document.querySelector('<input type="hidden" name="stripeToken"/>').val(token));
//     document.querySelector("#stripeToken").value=token

//     // Submit the form:
//     // form.get(0).submit();

//   }
// }
