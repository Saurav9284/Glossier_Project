var video = document.getElementById("myVideo");
video.addEventListener("pause", function (e) {
  e.preventDefault();
  video.play();
});


// for adding data into cart 
let cartButton = document.getElementById("cartButton")
let alertContainer = document.getElementById("alert-container");

cartButton.addEventListener("click", () => {

  let obj= localStorage.getItem("detail");
  obj=JSON.parse(obj);
  let data = JSON.parse(localStorage.getItem("ProductId")) || [];
  data.push(obj);
  localStorage.setItem("ProductId", JSON.stringify(data));
  let msg = document.getElementById("alert-msg");
  msg.textContent=`Product Added to Cart 🛍️`;
  alertContainer.style.display = "block";
  setTimeout(() => {
    alertContainer.style.display = "none";
  }, 800);
  localStorage.setItem("cart", JSON.stringify(data));
  cartButton.textContent="Product Added ✅"
},
{ once: true });



// for adding product into wishlist

let heart= document.querySelector(".fa-regular");
heart.addEventListener("click", () => {
  let msg = document.getElementById("alert-msg");
  msg.textContent=`Item added into a WishList ❤️`;
 alertContainer.style.display = "block";
  setTimeout(() => {
    alertContainer.style.display = "none";
  }, 800);

  heart.addEventListener("click",()=>{
    window.location.replace('fav.html')
  })
  let obj= localStorage.getItem("detail");
  obj=JSON.parse(obj);
   let fav = JSON.parse(localStorage.getItem("ProductId")) || [];
  fav.push(obj);
  localStorage.setItem("fav",JSON.stringify(fav));
  heart.style.color ="red ";
  // heart.style.color="red";
},
{ once: true });



let data = [
  {
catogery: "face",
details: "Magicare All Day Foundation",
id: 1,
img: "https://www.hokmakeup.com/cdn/shop/files/1143325-Revolution-ConcealAndDefine-PowderFoundation-P0.2_2a.jpg?v=1696594794",
img2: "https://c4.wallpaperflare.com/wallpaper/181/495/615/5bd03af005089-wallpaper-preview.jpg",
name: "Example Product",
price: 105,
star_rating: 4.5,
type: "Oil",
usage: "For best results.",
  },
  {
    id: 2,
    Name: "Balm-Dotcom",
    content: "Oil serum hybrid",
    ProdImg:
      "../Images/Balm-dotcom/glossier-bdc-wildfig-carousel-01.avif",
    actor: "../Images/Balm-dotcom/Hover.avif",
    price: 26,
    type: "balm",
  },
  {
    id: 3,
    Name: "Milkey Jelly Cleanser",
    content: "Universal Salve",
    ProdImg:
      "../Images/Milkey-jelly-cleanser/glossier-mjc-futuredew-carousel-01.avif",
    actor: "../Images/Milkey-jelly-cleanser/hover.avif",
    price: 14,
    type: "Cleanser",
  },
  {
    id: 11,
    Name: "Balm Dotcom Trio",
    content: "Choose three balms",
    ProdImg:
      "../Images/Balm-dotcom-trio/glossier-bdctrio-carousel-01.avif",
    actor:
      "../Images/Balm-dotcom-trio/glossier-bdctrio-carousel-02.avif",
    price: 36,
    type: "balm",
    skin: "Dry",
  },
];

var container = document.querySelector("#container");
function DisplyData(data) {
  data.forEach((element) => {
    //Card :-
    let cardi = document.createElement("div");
    cardi.classList.add("card-div");

    //Imag Container :-
    let ImgCont = document.createElement("div");
    ImgCont.classList.add("Img-cont");

    //Image :-
    let img = document.createElement("img");
    img.classList.add("img-product-details");
    img.src = element.img;
    // Add event listener to change the image on hover
    img.addEventListener("mouseover", () => {
      img.src = element.img2;
    });
    img.addEventListener("mouseleave", () => {
      img.src = element.img;
    });

    //info:-
    let info = document.createElement("div");

    //Name Price :-
    let name = document.createElement("div");
    name.classList.add("Name-Price-details");
    let pName = document.createElement("p");
    pName.classList.add("pName-details");
    pName.innerText = element.details;
    let pPrice = document.createElement("p");
    pPrice.classList.add("pPrice-details");
    pPrice.innerHTML = `<span>  &#8377; <span>${element.price}`;

    //Description:-
    let des = document.createElement("p");
    des.classList.add("description-details");
    des.innerText = element.usage;

    //Button :-
    let btn = document.createElement("button");
    btn.classList.add("Add-btn-details");
    btn.innerText = "Add To Bag";




    btn.addEventListener("click", () => {
      let data = JSON.parse(localStorage.getItem("ProductId")) || [];
      data.push(element);
      alertContainer.style.display = "block";
      setTimeout(() => {
        alertContainer.style.display = "none";
      }, 800);
      localStorage.setItem("ProductId", JSON.stringify(data));
    });

    ImgCont.append(img);
    name.append(pName, pPrice);
    info.append(name, des, btn);
    cardi.append(ImgCont, name, info);

    container.append(cardi);
  });
}

DisplyData(data);
