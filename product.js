let URLdata = "product.json";


let mainSection = document.getElementById("MainDataDiv");
let popUPaddedBag = document.getElementById("popUP-addedBag");


// Sorting
let LOWTOHIGH = document.getElementById("LOWTOHIGH").addEventListener("click",()=>{DataLoad(`${URLdata}?_sort=price&_order=asc`)})
let HIGHTOLOW = document.getElementById("HIGHTOLOW").addEventListener("click",()=>{DataLoad(`${URLdata}?_sort=price&_order=desc`)})

// Filter
let DRYSkin = document.getElementById("DRYSkin").addEventListener("click" , ()=>{DataLoad(`${URLdata}?`)});
let OILYSkin = document.getElementById("OILYSkin").addEventListener("click" , ()=>{DataLoad(`${URLdata}?`)});
let NormalSKIN = document.getElementById("NormalSKIN").addEventListener("click" , ()=>{DataLoad(`${URLdata}?`)});

let btnAll=document.getElementById("btnAll");
btnAll.addEventListener("click", ()=>{
    DataLoad(`${URLdata}?`)
console.log("1")
})

let btnFace=document.getElementById("btnFace");
btnFace.addEventListener("click", ()=>{
    DataLoad(`${URLdata}?`)
console.log("2")
})

let btnEyes=document.getElementById("btnEyes");
btnEyes.addEventListener("click", ()=>{
    DataLoad(`${URLdata}?`)
console.log("3")
})

let btnLips=document.getElementById("btnLips");
btnLips.addEventListener("click", ()=>{
    DataLoad(`${URLdata}?`)
console.log("4")
})

let btnTools=document.getElementById("btnTools");
btnTools.addEventListener("click", ()=>{
    DataLoad(`${URLdata}?`)
console.log("5")
})


DataLoad(URLdata);

// DataLoad(url)
async function DataLoad(url,page){
    try {
        let res = await fetch(`${url}?_page=${page ||1}&_limit=5`);

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

        let img = document.createElement("img");
        img.setAttribute("class" , "img");
        img.src = ele.img;
        img.alt = "image";

        cardImage.append(img);

        let cardBody = document.createElement("div");
        cardBody.setAttribute("class" , "card-body");

        let id = document.createElement("p");
        
        id.setAttribute("class" ,"Id")
        id.setAttribute("data-id" , ele.id)

        let details = document.createElement("h3");
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
        price.innerHTML = ele.price+"$";

        let cartbtn = document.createElement("button");
        cartbtn.classList.add("cartbtn");
        cartbtn.innerHTML = "Add to bag";
        cartbtn.addEventListener("click",()=>{
            cartbtn.innerHTML="Added";
            cartbtn.style.color="green";

            popUPaddedBag.style.display="block";

            setTimeout(() => {
                popUPaddedBag.style.display="none";
            }, 500);
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
