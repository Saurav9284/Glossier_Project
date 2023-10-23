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
document.addEventListener("DOMContentLoaded", function() {
    var userDropdown = document.getElementById("user-dropdown");
    var dropdownContent = document.getElementById("user-dropdown-content");
    var loginLink = document.getElementById("login-link");
    var signupLink = document.getElementById("signup-link");
    var signoutLink = document.getElementById("signout-link");
  
    userDropdown.addEventListener("mouseover", function() {
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
  
    userDropdown.addEventListener("mouseout", function() {
      dropdownContent.style.display = "none";
    });
  });