let logoText = document.getElementById("navbar_Logo")
logoText.addEventListener("mouseover", ()=>{
    logoText.classList.add("hoveredOnLogo");
    logoText.innerText = "You Look Good";
});
logoText.addEventListener("mouseleave", ()=>{
    logoText.innerText = "Glossier.";
    logoText.classList.remove("hoveredOnLogo");
})