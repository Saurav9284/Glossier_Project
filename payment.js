
var options = {
    "key": "rzp_test_GVBdlYJTGaLoSd", // Enter the Key ID generated from the Dashboard
    "amount": 10 * 100,
    "currency": "INR",
    "description": "Acme Corp",
    "image": "https://s3.amazonaws.com/rzp-mobile/images/rzp.jpg",
    "prefill":
    {
      "email": "gaurav.kumar@example.com",
      "contact": +919900000000,
    },
    "handler": function (response) {

        window.location.href = "cart.html";

    }

    }

    
  var rzp1 = new Razorpay(options);
  document.getElementById('rzp-button1').onclick = function (e) {
    rzp1.open();
    e.preventDefault();
}