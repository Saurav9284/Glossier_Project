




// let URLdata = "https://cwproject-unit5.onrender.com/products";
let URLdata = "./data.JSON";


let mainSection = document.getElementById("MainDataDiv");
let popUPaddedBag = document.getElementById("popUP-addedBag");
let See_More = document.getElementById("See_More");
See_More.addEventListener("click",()=>{
    DataLoad(URLdata,2,16);
})


// localStorage For Id:-

let productID = JSON.parse(localStorage.getItem("ProductId"));


// Sorting
var selectElement = document.getElementById('sortBy');

selectElement.addEventListener('change', function() {
   
    var selectedOption = selectElement.options[selectElement.selectedIndex];
    
    if (selectedOption.value === 'LOWTOHIGH') {
        DataLoad(`${URLdata}?_sort=price&_order=asc`,1,8)
        console.log('HI');
        loginData(URLdata)
    }
    else if (selectedOption.value === 'HIGHTOLOW') {
        DataLoad(`${URLdata}?_sort=price&_order=desc`,1,8)
        console.log('NO');
    }else{
        DataLoad(URLdata,1,8);
    }
});

// Filter
var selectCatogery = document.getElementById("catogeryID");
selectCatogery.addEventListener('change',()=>{

    var selected_Catogery = selectCatogery.options[selectCatogery.selectedIndex];

    if(selected_Catogery.value ==="DRYSkin"){
        DataLoad(`${URLdata}?title=json-server&type=Dry`,1,8);
        console.log("Dry")
    }
    else if(selected_Catogery.value ==="OILYSkin"){
        DataLoad(`${URLdata}?title=json-server&type=Oil`,1,8);
        console.log("Oil")
    }
    else if(selected_Catogery.value ==="NormalSKIN"){
        DataLoad(`${URLdata}?title=json-server&type=Normal`,1,8);
        console.log("Normal")
    }
    else{
        DataLoad(URLdata,1,8);
    }
})



// buttons 
let btnAll=document.getElementById("btnAll");
btnAll.addEventListener("click", ()=>{
    DataLoad(URLdata,1,8)
console.log("1")
})

let btnFace=document.getElementById("btnFace");
btnFace.addEventListener("click", ()=>{
    DataLoad(URLdata,2,8)
console.log("2")
})

let btnEyes=document.getElementById("btnEyes");
btnEyes.addEventListener("click", ()=>{
    DataLoad(URLdata,3,8)
console.log("3")
})

let btnLips=document.getElementById("btnLips");
btnLips.addEventListener("click", ()=>{
    DataLoad(URLdata,4,8)
console.log("4")
})

let btnTools=document.getElementById("btnTools");
btnTools.addEventListener("click", ()=>{
    DataLoad(URLdata,5,8)
console.log("5")
})


DataLoad(URLdata,1,16);

// DataLoad(url)
async function DataLoad(url,page,limit){
    mainSection.innerHTML="";
    try {
        if(url===URLdata){
        let res = await fetch(`${url}?_page=${page ||1}&_limit=${limit || 16}`);

        let data = await res.json();
        console.log(data)

        DisplayData(data);
    }else{
        let res = await fetch(`${url}&_page=${page ||1}&_limit=${limit || 16}`);

        let data = await res.json();
        console.log(data)

        DisplayData(data);
    }
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

        let img = document.createElement("img");
        img.setAttribute("class" , "img");
        img.src = ele.img;
        img.alt = "image";

        let img2 = document.createElement("img");
        img2.setAttribute("class" , "img2");
        img2.src= ele.img2;
        img2.alt ="Image";

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

        let cartbtn = document.createElement("button");
        cartbtn.classList.add("cartbtn");
        cartbtn.innerHTML = "Add to bag";
        cartbtn.addEventListener("click",()=>{
            cartbtn.innerHTML="Added";
            cartbtn.style.color="green";

            setTimeout(() => {
                popUPaddedBag.style.display="none";
            }, 500);
            popUPaddedBag.style.display="block";

            let obj={
                price:ele.price
            }
            localStorage.setItem("ProductId",)
           
        });

        cardBody.append(details)
        cardBody.append(usage)
        // cardBody.append(rating)
        cardBody.append(price)
        cardBody.append(cartbtn)

        // cardBody.append(catogery)
        // cardBody.append(type)

        card.append(cardImage)
        card.append(cardBody)

        cardList.append(card)
        
    });
    
    mainSection.append(cardList)
}

let page = 1;

// window.addEventListener("scroll", ()=>{
//     let scrollTop = document.documentElement.scrollTop;
//   let scrollHeight = document.documentElement.scrollHeight;
//   let clientHeight = document.documentElement.clientHeight;

//   console.log(scrollTop, scrollHeight, clientHeight);
//   let size=Math.ceil(clientHeight + scrollTop)
//   if ( size>= scrollHeight) {
//     // window.location.reload();
//     console.log("hitbtom");
//     page++;
//     DataLoad(URLdata,page,8);
//   }
// });


// loginData(URLdata)

// async function loginData(url) {
let obj={
    
        id: "123",
        name: "mmmmm",
        img: "https://www.biotique.com/cdn/shop/products/8904317304672_5.jpg?v=1665663336&width=533",
        img2:"./image",
        details: "This is a sample product description..",
        usage: "For best results, use as directed by the manufacturer.",
        star_rating: 4.5,
        price: 59.99,
        catogery: "lips",
        type: "Dry"
}
//     try {
//       let res = await DataLoad(url, {
//         method: "POST",
//         headers: {
//           "content-type": "application/json",
//         },
//         body: JSON.stringify(obj),
//       });
//       let data = await res.json();
//       console.log(data);
//     }
//     catch(error){
//         console.log(error)
//     }
// }
