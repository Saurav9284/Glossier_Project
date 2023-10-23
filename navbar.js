
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