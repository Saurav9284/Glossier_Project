




let URLdata = "https://cwproject-unit5.onrender.com/products";
// let URLdata = "./data.JSON";


let mainSection = document.getElementById("MainDataDiv");
let popUPaddedBag = document.getElementById("popUP-addedBag");
let Pagination = document.getElementById("pagination_Wrapper");

// localStorage For Id:-

let productID = JSON.parse(localStorage.getItem("ProductId"))||[];
// console.log(productID);
let ProDetails = JSON.parse(localStorage.getItem("ProDetails"))||[];

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
    DataLoad(URLdata,1,12)
console.log("1")
})

let btnFace=document.getElementById("btnFace");
btnFace.addEventListener("click", ()=>{
    DataLoad(`${URLdata}?title=json-server&catogery=face`,null,8)
console.log("2")
})

let btnEyes=document.getElementById("btnEyes");
btnEyes.addEventListener("click", ()=>{
    DataLoad(`${URLdata}?title=json-server&catogery=Eyes`,null,8)
console.log("3")
})

let btnLips=document.getElementById("btnLips");
btnLips.addEventListener("click", ()=>{
    DataLoad(`${URLdata}?title=json-server&catogery=lips`,null,8)
console.log("4")
})

let btnTools=document.getElementById("btnTools");
btnTools.addEventListener("click", ()=>{
    DataLoad(`${URLdata}?title=json-server&catogery=Tools`,null,8)
console.log("5")
})


DataLoad(URLdata,1,12);

// DataLoad(url)
async function DataLoad(url,page,limit){
    mainSection.innerHTML="";
    try {
        if(url===URLdata){
        let res = await fetch(`${url}?_page=${page ||1}&_limit=${limit || 16}`);

        let TotalD = res.headers.get("X-Total-Count")
        let DataPer = limit || 12;
        let TotalPage = Math.ceil(TotalD/DataPer);
        console.log(TotalD);

        Pagination.innerHTML="";
        for(let i=1;i<=TotalPage;i++){
            let button = document.createElement("button");
            button.innerText=i;
            button.classList.add("PageButton");
            Pagination.append(button)
        };

        let data = await res.json();
        console.log(data)

        DisplayData(data);
    }else{
        let res = await fetch(`${url}&_page=${page ||1}&_limit=${limit || 12}`);

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

        // img.append(imgWish)
        cardImage.append(img);
        cardImage.append(img2);
        // cardImage.append(imgWish);
        // cardImage.append(imgWish2);


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
           console.log(obj);
        });

        cardBody.append(details)
        cardBody.append(usage)
        // cardBody.append(rating)
        cardBody.append(price)
        cardBody.append(cartbtn)

        cardBody.append(catogery)
        cardBody.append(type)

        card.append(cardImage)
        card.append(cardBody)

        cardList.append(card)
        
    });
    
    mainSection.append(cardList)
}

let page = 1;

function PaginationData(){

}

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