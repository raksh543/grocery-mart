var form = document.querySelector("#razor-payment-form")

document.querySelector("#clickhere").addEventListener('click', (e) => {
  console.log("Method Running")
  var name = document.querySelector("#name")
  var button = document.querySelector("#submit")
  var cardname = document.querySelector("#card-name")
  var number = document.querySelector("#card-number")
  var cvc = document.querySelector("#card-cvc")
  var month = document.querySelector("#card-expiry-month")
  var year = document.querySelector("#card-expiry-year")

  var options = {
    amount: req.body.amount,  // amount in the smallest currency unit
    currency: "INR",
    receipt: "order_rcptid_11",
    payment_capture: true
  };

  instance.orders.create(options, function(err,order){
      
  })

  Stripe.card.createToken({
    number: number.value,
    cvc: cvc.value,
    exp_month: month.value,
    exp_year: year.value,
    name: cardname.value
  }, function stripeResponseHandler(status, response) {

    if (response.error) {
      // document.querySelector("#charged-error").text(response.error);
      document.querySelector("#charged-error").innerHTML = response.error

    } else { // Token was created!

      // Get the token ID:
      var token = response

      // Insert the token into the form so it gets submitted to the server:
      document.querySelector("#stripeToken").value = token.id
      console.log(token)

      // Submit the form:
      document.querySelector("#submit").click()
    }
  }
  )

  return false
})
