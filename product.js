




let URLdata = "https://cwproject-unit5.onrender.com/products";
// let URLdata = "./data.JSON";


let mainSection = document.getElementById("MainDataDiv");
let popUPaddedBag = document.getElementById("popUP-addedBag");
let popUPaddedBagh2 = document.getElementById("popUP-addedBagH2");
let Pagination = document.getElementById("pagination_Wrapper");

// localStorage For Id:-
let productID = JSON.parse(localStorage.getItem("ProductId"))||[];
let ProDetails = JSON.parse(localStorage.getItem("ProDetails"))||[];
let ProWish = JSON.parse(localStorage.getItem("ProWISHLIST")) || [];


// Sorting
var selectElement = document.getElementById('sortBy');

selectElement.addEventListener('change', function() {
   
    var selectedOption = selectElement.options[selectElement.selectedIndex];
    
    if (selectedOption.value === 'LOWTOHIGH') {
        PaginationData(URLdata,`?_sort=price&_order=asc`,1,8)
        console.log('HI');
    }
    else if (selectedOption.value === 'HIGHTOLOW') {
        PaginationData(URLdata,`?_sort=price&_order=desc`,1,8)
        console.log('NO');
    }else{
        PaginationData(URLdata,"",1,8);
    }
});

// Filter
var selectCatogery = document.getElementById("catogeryID");
selectCatogery.addEventListener('change',()=>{

    var selected_Catogery = selectCatogery.options[selectCatogery.selectedIndex];

    if(selected_Catogery.value ==="DRYSkin"){
        PaginationData(`${URLdata}`,`?_title=json-server&type=Dry`,1,12);
        PageButton.style.display="none";
        console.log("Dry")
    }
    else if(selected_Catogery.value ==="OILYSkin"){
        PaginationData(`${URLdata}`,`?_title=json-server&type=Oil`,1,12);
        PageButton.style.display="none";
        console.log("Oil")
    }
    else if(selected_Catogery.value ==="NormalSKIN"){
        // PageButton.style.display="none";
        PaginationData(`${URLdata}`,`?_title=json-server&type=Normal`,1,12);
        console.log("Normal")
    }
    else{
        PaginationData(URLdata,"",1,8);
    }
})



// buttons 
let btnAll=document.getElementById("btnAll");
btnAll.addEventListener("click", ()=>{
    PaginationData(URLdata,"",1,12)
console.log("1")
})

let btnFace=document.getElementById("btnFace");
btnFace.addEventListener("click", ()=>{
    PaginationData(`${URLdata}`,`?_title=json-server&catogery=face`,null,12)

console.log("2")
})

let btnEyes=document.getElementById("btnEyes");
btnEyes.addEventListener("click", ()=>{
    PaginationData(`${URLdata}`,`?_title=json-server&catogery=Eyes`,null,12)
console.log("3")
})

let btnLips=document.getElementById("btnLips");
btnLips.addEventListener("click", ()=>{
    PaginationData(`${URLdata}`,`?_title=json-server&catogery=lips`,null,12)
console.log("4")
})

let btnTools=document.getElementById("btnTools");
btnTools.addEventListener("click", ()=>{
    PaginationData(`${URLdata}`,`?_title=json-server&catogery=Tools`,null,12)
console.log("5")
})


PaginationData(URLdata,"",1,12);


async function DataLoad(url){
    mainSection.innerHTML="";
    try {
        // if(queryParameter==""){
        let res = await fetch(url);


        // PaginationData(URLdata,TotalPage,12)

        let data = await res.json();
        console.log(data)

        DisplayData(data);
 
    } catch (error) {
        console.log(error);
    }
}

function DisplayData(item){
    let cardList = document.createElement("div");
    cardList.setAttribute("class" , "card-List");


    item.forEach((ele) => {
        let card = document.createElement("div");
        card.setAttribute("class","card");
        

        let cardImage = document.createElement("div");
        cardImage.setAttribute("class" , "card-img");

        cardImage.addEventListener("click",()=>{
            let objProD={
                id:ele.id,
                price:ele.price,
                img:ele.img,
                img2:ele.img2,
                type:ele.type,
                catogery:ele.catogery,
                details:ele.details
            }
            ProDetails.push(objProD);
            let ProDetDATA = JSON.stringify(ProDetails) 
            localStorage.setItem("ProDetails",ProDetDATA);
            window.location.href="./cart"


        });



        let img = document.createElement("img");
        img.setAttribute("class" , "img");
        img.src = ele.img;
        img.alt = "image";

        
        let img2 = document.createElement("img");
        img2.setAttribute("class" , "img2");
        img2.src= ele.img2;
        img2.alt ="Image";
        
        let imgWish = document.createElement("img");
        imgWish.setAttribute("id" , "imgWish");
        imgWish.src = "https://static.thenounproject.com/png/4590951-200.png";
        imgWish.alt = "image";

        let imgWish2 = document.createElement("img");
        imgWish2.setAttribute("id" , "imgWish2");
        imgWish2.src = "https://upload.wikimedia.org/wikipedia/commons/thumb/f/f1/Heart_coraz%C3%B3n.svg/800px-Heart_coraz%C3%B3n.svg.png";
        imgWish2.alt = "image";

        
        cardImage.append(img);
        cardImage.append(img2);

        let cardBody = document.createElement("div");
        cardBody.setAttribute("class" , "card-body");

        let id = document.createElement("p");
        
        id.setAttribute("class" ,"Id")
        id.setAttribute("data-id" , ele.id)

        let details = document.createElement("h4");
        details.setAttribute("class", "card-details");
        details.innerHTML=ele.details;

        let usage = document.createElement("p");
        usage.setAttribute("class" ,"usage")
        usage.innerHTML = ele.usage;

        let rating = document.createElement("p");
        rating.setAttribute("class" ,"rating")
        rating.innerHTML = "Rating:  "+ele.star_rating;



        let catogery = document.createElement("p");
        catogery.setAttribute("class" , "catogery");
        catogery.setAttribute("data-id" , ele.catogery);
    
        let type = document.createElement("p");
        type.setAttribute("class" , "type");
        type.setAttribute("data-id" , ele.type);



        let price = document.createElement("p");
        price.setAttribute("class" ,"price")
        price.innerHTML = "Rs. "+ele.price+"/-";

        let cardBtnDiv = document.createElement("div");
        cardBtnDiv.setAttribute("class","cardBtnDiv");



        let cartbtn = document.createElement("button");
        cartbtn.classList.add("cartbtn");
        cartbtn.innerHTML = "Add to bag";
        cartbtn.addEventListener("click",()=>{
            cartbtn.innerHTML="Added";
            cartbtn.style.color="white";

            window.location.href="cart.html";
           
            let obj={
                id:ele.id,
                price:ele.price,
                img:ele.img,
                img2:ele.img2,
                type:ele.type,
                catogery:ele.catogery,
                details:ele.details
            }
            productID.push(obj);
            var localData = JSON.stringify(productID)
            localStorage.setItem("ProductId",localData);

            
            // setTimeout(() => {
            //     // window.location.href="./cart.html";
            // }, 1000);

        //    console.log(obj);
        });

        let wishList = document.createElement("button");
        wishList.innerText="WishList";
        wishList.setAttribute("class","wishList")
        wishList.addEventListener("click",()=>{

            // popUPaddedBagh2.style.innerText="Item Added To WishList";

            let obj={
                id:ele.id,
                price:ele.price,
                img:ele.img,
                img2:ele.img2,
                type:ele.type,
                catogery:ele.catogery,
                details:ele.details
            }
            wishList.innerHTML="Added";
            wishList.style.color="#ca4e46";
            
            ProWish.push(obj);
            let localData = JSON.stringify(ProWish);
            localStorage.setItem("ProWISHLIST",localData);

        })


        cardBtnDiv.append(cartbtn);
        cardBtnDiv.append(wishList);

        cardBody.append(details)
        cardBody.append(usage)
        // cardBody.append(rating)
        cardBody.append(price)
        cardBody.append(cardBtnDiv)

        cardBody.append(catogery)
        cardBody.append(type)

        card.append(cardImage)
        card.append(cardBody)

        cardList.append(card)
        
    });
    
    mainSection.append(cardList)
}


let num=0;


async function PaginationData(url,queryParameter,page,limit){
    
 try {
         let res = await fetch(url);
         // console.log(res.headers.get("X-Total-Count"));
         
         let data = await res.json();
         // console.log(data);
         console.log(data.length);
       //   console.log(url);
         let n = data.length;
      //   console.log(n)
        let pageNum = Math.ceil(n / limit);
        Pagination.innerHTML = "";
        if(pageNum>1){
        for (let i = 1; i <= pageNum; i++) {
          let btn = document.createElement("button");
          btn.innerText = i;

          btn.classList.add("PageButton");

          btn.addEventListener("click", () => {
            if (queryParameter==="") {
              let newUrl = url + `?_page=${i}&_limit=${limit}`;
              console.log(newUrl)
              DataLoad(newUrl);
            } else {
              let newUrl = url + `${queryParameter}&_page=${i}&_limit=${limit}`;
              console.log(newUrl)
              DataLoad(newUrl);
              
            }
          
          });
         
          Pagination.append(btn);
        }
      }
        
     
        if (queryParameter==="") {
          DataLoad(url + `?_page=1&_limit=${limit}`);
          console.log("first")
        } else {
          DataLoad(url + `${queryParameter}&_page=1&_limit=${limit}`);
          console.log("second")
        }
      } 
      catch (err) {
        console.log(err);
       }

    // Pagination.append(buttonNext);

}