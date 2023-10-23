let logoText = document.getElementById("navbar_Logo")
logoText.addEventListener("mouseover", () => {
    logoText.classList.add("hoveredOnLogo");
    logoText.innerText = "You Look Good";
});
logoText.addEventListener("mouseleave", () => {
    logoText.innerText = "Glossier.";
    logoText.classList.remove("hoveredOnLogo");
})
function mobile() {
    var x = document.querySelector(".navbarChild_second")
    if (x.classList.contains("mobilemenu")) {
        x.classList.remove("mobilemenu"); // Remove the class "mobilemenu"
    } else {
        x.classList.add("mobilemenu"); // Add the class "mobilemenu"
    }
}
let isLoggedIn = localStorage.getItem("userName");
let userHello = document.getElementById("userHello")
document.addEventListener("DOMContentLoaded", function () {
    var userDropdown = document.getElementById("user-dropdown");
    var dropdownContent = document.getElementById("user-dropdown-content");
    var loginLink = document.getElementById("login-link");
    var signupLink = document.getElementById("signup-link");
    var signoutLink = document.getElementById("signout-link");

    userDropdown.addEventListener("mouseover", function () {
        dropdownContent.style.display = "block";
        if (localStorage.getItem("isLoggedIn") === "true") {
            loginLink.style.display = "none";
            signupLink.style.display = "none";
            userHello.innerText = `Hello, ${isLoggedIn}`
            signoutLink.style.display = "block";
        } else {
            loginLink.style.display = "block";
            signupLink.style.display = "block";
            signoutLink.style.display = "none";
        }
    });

    userDropdown.addEventListener("mouseout", function () {
        dropdownContent.style.display = "none";
    });
});
function navbar() {
    return `
    <div id="header_navbar">
            <div class="main_container">
                <div id="navbar">
                    <div id="navbarChild_First">
                        <h3 id="navbar_Logo">Glossier.</h3>
                    </div>
                    <div class="navbarChild_second">
                        <ul id="navbar_menu">
                            <li><a href="product.html">Skincare</a></li>
                            <li><a href="product.html">Makeup</a></li>
                            <li><a href="product.html">Sets</a></li>
                            <li><a href="product.html">All</a></li>
                        </ul>
                    </div>
                    <div id="navbarChild_third">
                        <ul id="navbar_icons">
                            <li><a href="#"><span class="material-symbols-outlined">search</span></a></li>
                            <li id="user-dropdown">
                                <a href="#"><span class="material-symbols-outlined">person</span></a>
                                <div id="user-dropdown-content" class="dropdown-content">
                                  <p  id="userHello"></p>
                                  <a id="login-link" href="#">Login</a>
                                  <a id="signup-link" href="#">Sign Up</a>
                                  <a id="signout-link" href="#">Sign Out</a>
                                </div>
                              </li>
                            <li><a href="#"><span class="material-symbols-outlined">favorite</span></a></li>
                            <li id="cartOpen"><a href="#"><span class="material-symbols-outlined">shopping_bag</span></a></li>
                        </ul>
                        <img onclick="mobile()" class="mobile_menu" src="Images/bars-solid.svg">
                    </div>
                </div>
            </div>
        </div>`
}
export { navbar };