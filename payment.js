let INFORMATION=JSON.parse(localStorage.getItem("cartProductArr"));
const priceTag = document.querySelector("#totalPrice");
let arr=[];
arr.push(INFORMATION);
console.log(arr);
var totalPrice = 0;
INFORMATION.forEach(function(product) {
  totalPrice += (+product.price);
});




console.log(totalPrice);
let totalPrice1 = Math.floor(totalPrice);
let priceString = totalPrice1 + "";

priceString = priceString.split("");

priceString = priceString.join("");

priceTag.textContent = "Rs " + priceString;

var options = {
    "key": "rzp_test_GVBdlYJTGaLoSd", // Enter the Key ID generated from the Dashboard
    "amount": totalPrice1 * 100 ,
    "currency": "INR",
    "description": "Acme Corp",
    "image": "https://s3.amazonaws.com/rzp-mobile/images/rzp.jpg",
    "prefill":
    {
      "email": "gaurav.kumar@example.com",
      "contact": +919900000000,
    },
    "handler": function (response) {

        window.location.href = "index.html";

    }

    }

    
  var rzp1 = new Razorpay(options);
  document.getElementById('rzp-button1').onclick = function (e) {
    rzp1.open();
    e.preventDefault();
}