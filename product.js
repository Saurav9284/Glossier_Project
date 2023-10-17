let mainSection = document.getElementById("MainDataDiv");

let URLdata = "product.json"

DataLoad(URLdata)
async function DataLoad(URLdata){
    try {
        let res = await fetch(URLdata);

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
        rating.innerHTML = ele.star_rating;

        let catogery = document.createElement("p");
        catogery.setAttribute("class" , "catogery");
        catogery.setAttribute("data-id" , ele.catogery);
    
        let price = document.createElement("p");
        price.setAttribute("class" ,"price")
        price.innerHTML = ele.price;

        let cartbtn = document.createElement("button");
        cartbtn.classList.add("cartbtn");
        cartbtn.innerHTML = "Add to bag";


        cardBody.append(details)
        cardBody.append(usage)
        cardBody.append(rating)
        cardBody.append(price)
        cardBody.append(cartbtn)
        // cardBody.append(catogery)

        card.append(cardImage)
        card.append(cardBody)

        cardList.append(card)
        
    });
    
    mainSection.append(cardList)
}
