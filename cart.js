let cartArr = JSON.parse(localStorage.getItem("ProductId")) || [];
let cartContainer = document.getElementById("cartContainer")
let closeCart = document.querySelector("#closeCart")
let productContainer = document.getElementById("product-list-wrapper")
let totalCartProducts = document.getElementById("totalItem")
let totalPriceHTMl = document.getElementById("totalPrice");
let shippingChargMsg = document.getElementById("shippingCharges");
let backdrop = document.querySelector(".backdrop")
let cartOpenBtn = document.getElementById("cartOpen");

closeCart.addEventListener("click", () => {
    cartContainer.classList.remove("openCart")
    // cartContainer.style.display = "none"
    backdrop.removeAttribute("id", "show")
})

cartOpenBtn.addEventListener("click", () => {
    
    cartContainer.classList.add("openCart")
    // cartContainer.style.display = "inline-block"
    backdrop.setAttribute("id", "show")
})

let totalPrice;
let shippingCharges;
let cartProductArr = [];

if (cartArr) {
    cartArr.forEach((element) => {
        let obj = { ...element }
        obj.quantity = 1;
        obj.totalPrice = element.price

        cartProductArr.push(obj)
    })
}

console.log(cartProductArr)

function emptyCart() {
    if (cartProductArr.length === 0) {
        document.getElementById("product-section").innerHTML = `
        <div id="emptyCartMsg">
        Your bag is empty,
        <br>
        but you still look good.
    </div>`

        document.getElementById("checkout").style.display = "none";
    }

}

function getData() {
    let data =cartProductArr;
    


    if (cartProductArr.length > 0) {
        displayData(data);
    }
    else {
        emptyCart();
    }
}



getData()
function displayData(data) {
    productContainer.innerHTML = "";
    data.forEach((element, index) => {

        let card = document.createElement("div");
        card.className = "card";

        let crossIcon = document.createElement("div")
        let p = document.createElement("p")
        p.className = "crossIcon";
        p.innerHTML = `&times;`
        crossIcon.append(p);

        crossIcon.addEventListener("click", () => {
            cartProductArr.splice(index,1);
            cartArr.splice(index,1);

            console.log(cartProductArr);
            totalPriceFunction();
            shipping();
            totalNoOfProducts();
            emptyCart();
            
            localStorage.setItem("cartProductArr", JSON.stringify(cartProductArr));
            localStorage.setItem("ProductId", JSON.stringify(cartArr));

            displayData(cartProductArr);
        })
        let cardContent = document.createElement("div")
        cardContent.className = "card-content";
        cardContent.style.width = "100%"

        let cardImg = document.createElement("div")
        cardImg.className = "cardImg";
        let img = document.createElement("img")
        img.src = element.img;
        img.alt = element.name;
        cardImg.append(img);

        let cardBody = document.createElement("div")
        cardBody.className = "cardBody";

        let cardBodyLeft = document.createElement("div")
        cardBodyLeft.className = "cardBodyLeft";

        let cardTitle = document.createElement("p")
        cardTitle.className = "cardTitle"
        cardTitle.textContent = element.details;

        let cartBtn = document.createElement("div")
        cartBtn.className = "cart-btn";
        let decrease = document.createElement("span")
        decrease.classList.add("decrease", "pointer");
        decrease.innerHTML = "&#8722;";

        decrease.addEventListener("click", () => {
            if (element.quantity > 1) {
                element.quantity--;
                element.totalPrice = element.totalPrice - element.price;
                cartProductArr[index].quantity = Number(element.quantity);
                cartArr[index].quantity = Number(element.quantity);
                localStorage.setItem("cartProductArr", JSON.stringify(cartProductArr));
                localStorage.setItem("ProductId", JSON.stringify(cartArr));

                totalPriceFunction();
                displayData(cartProductArr);
                shipping();
            }
            else {
                cartProductArr.splice(index, 1);
                cartArr.splice(index, 1);
                localStorage.setItem("cartProductArr", JSON.stringify(cartProductArr));
                localStorage.setItem("ProductId", JSON.stringify(cartArr));

                totalNoOfProducts();
                emptyCart();
                displayData(cartProductArr);
                shipping();
                totalPriceFunction();
            }

        })

        let noOfProducts = document.createElement("span")
        noOfProducts.className = "noOfProducts";
        noOfProducts.textContent = element.quantity;

        let increase = document.createElement("span")
        increase.classList.add("increase");
        increase.classList.add("pointer");

        increase.addEventListener("click", () => {
            element.quantity++;
            element.totalPrice += element.price;

            cartProductArr[index].quantity = Number(element.quantity);
            cartArr[index].quantity = Number(element.quantity);
            localStorage.setItem("cartProductArr", JSON.stringify(cartProductArr));
            localStorage.setItem("ProductId", JSON.stringify(cartArr));

            shipping();
            displayData(cartProductArr);
            totalPriceFunction();
        })

        increase.textContent = "+";

        cartBtn.append(decrease, noOfProducts, increase);

        cardBodyLeft.append(cardTitle, cartBtn);

        let cardBodyRight = document.createElement("div")
        cardBodyRight.className = "cardBodyRight";
        let i = document.createElement("i")
        i.classList.add("fa-sharp", "fa-regular", "fa-heart")

        let cartPrice = document.createElement("p")
        cartPrice.className = "cartPrice";
        cartPrice.textContent = `Rs. ${element.price}`

        cardBodyRight.append(i, cartPrice)

        cardBody.append(cardBodyLeft, cardBodyRight)
        cardContent.append(cardImg, cardBody)
        card.append(crossIcon, cardContent)


        productContainer.append(card);
    })
}
function totalNoOfProducts() {
    if (cartProductArr.length === 0) {
        totalCartProducts.textContent = "";
    }
    else {
        totalCartProducts.textContent = `(${cartProductArr.length} items)`;
    }
}

function shipping() {
    totalPrice = cartProductArr.reduce((acc, currentElement) => {
        return acc += Number(currentElement.totalPrice);
    }, 0)

    if (totalPrice > 400) {
        shippingCharges = 0;
    }
    else {
        shippingCharges = 400 - totalPrice;
        shippingChargMsg.textContent = `Rs.${shippingCharges} away from free standard shipping`
    }
}
function totalPriceFunction() {
    totalPrice = cartProductArr.reduce((acc, currentElement) => {
        return acc += Number(currentElement.totalPrice);
    }, 0)

    totalPriceHTMl.textContent = totalPrice;
}


let checkoutBtn = document.getElementById("checkout")
checkoutBtn.addEventListener("click", () => {
    window.location.reload();
    window.location.href = "payment.html"
})




totalNoOfProducts();
shipping();
totalPriceFunction();
localStorage.setItem("cartProductArr", JSON.stringify(cartProductArr));
