let searchIcon = document.getElementById("searchIcon");
let searchBar = document.querySelector(".search")
const userData = JSON.parse(localStorage.getItem("userData"))
let loginIcon = document.querySelector(".loginIcon");
let userName = document.querySelector("#userName");
let cartTotalProducts = document.querySelector("#cartTotal");
let cartArr = JSON.parse(localStorage.getItem("cart")) || [];
let cartOpenBtn = document.getElementById("cartOpen");
let cartContainer = document.getElementById("cartContainer")
let closeCart = document.querySelector("#closeCart")
let closeNav = document.getElementById("closeNav")
let openNav = document.querySelector(".mobileIcon")
let backdrop = document.querySelector(".backdrop")

let productContainer = document.getElementById("product-list-wrapper")
let totalCartProducts = document.getElementById("totalItem")
let totalPriceHTMl = document.getElementById("totalPrice");
// let cartArr = JSON.parse(localStorage.getItem("cart")) || [];
let shippingChargMsg = document.getElementById("shippingCharges");



openNav.addEventListener("click", () => {
    backdrop.setAttribute("id", "show")
    console.log("back")
    document.querySelector(".mobile-nav").style.display = "flex";

})

closeNav.addEventListener("click", () => {
    document.querySelector(".mobile-nav").style.display = "none";
    backdrop.removeAttribute("id", "show")
})

// closeCart.addEventListener("click", () => {
//     cartContainer.classList.remove("openCart")
//     // cartContainer.style.display = "none"
//     backdrop.removeAttribute("id", "show")
// })

cartOpenBtn.addEventListener("click", () => {
    
    cartContainer.classList.add("openCart")
    // cartContainer.style.display = "inline-block"
    backdrop.setAttribute("id", "show")
})

function updateTotalProducts() {
    setInterval(() => {
        let cartArr = JSON.parse(localStorage.getItem("cart")) || [];
        if (cartArr) {
            cartTotalProducts.textContent = cartArr.length;
        }
    }, 1000);

}

updateTotalProducts();
searchIcon.addEventListener("click", () => {

    if (searchBar.style.display == "none") {
        searchBar.style.display = "initial";
    }
    else {
        searchBar.style.display = "none";
    }
})


let personName = localStorage.getItem("userName") || ""

if (personName) {
    loginIcon.style.display = "none";
    userName.textContent = personName;
}
else {
    loginIcon.style.display = "initial";

}



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
    let data = cartProductArr;


    if (cartProductArr.length > 0) {
        displayData(data);
    }
    else {
        emptyCart();
    }
}



getData();
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
            cartProductArr.splice(index, 1);

            totalPriceFunction();
            shipping();
            totalNoOfProducts();
            emptyCart();
            localStorage.setItem("cartProductArr", JSON.stringify(cartProductArr));
            displayData(cartProductArr);
        })
        let cardContent = document.createElement("div")
        cardContent.className = "card-content";
        cardContent.style.width = "100%"

        let cardImg = document.createElement("div")
        cardImg.className = "cardImg";
        let img = document.createElement("img")
        img.src = element.ProdImg;
        img.alt = element.Name;
        cardImg.append(img);

        let cardBody = document.createElement("div")
        cardBody.className = "cardBody";

        let cardBodyLeft = document.createElement("div")
        cardBodyLeft.className = "cardBodyLeft";

        let cardTitle = document.createElement("p")
        cardTitle.className = "cardTitle"
        cardTitle.textContent = element.content;

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
                localStorage.setItem("cartProductArr", JSON.stringify(cartProductArr));
                totalPriceFunction();
                displayData(cartProductArr);
                shipping();
            }
            else {
                cartProductArr.splice(index, 1);
                localStorage.setItem("cartProductArr", JSON.stringify(cartProductArr));
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
            localStorage.setItem("cartProductArr", JSON.stringify(cartProductArr));
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
        cartPrice.textContent = `$${element.price}`

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

    if (totalPrice > 40) {
        shippingCharges = 0;
    }
    else {
        shippingCharges = 40 - totalPrice;
        shippingChargMsg.textContent = `$${shippingCharges} away from free standard shipping`
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
    window.location.href = "../address.html"
})

totalNoOfProducts();
shipping();
totalPriceFunction();
localStorage.setItem("cartProductArr", JSON.stringify(cartProductArr));


