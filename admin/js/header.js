class Header extends HTMLElement {
    constructor() {
        super();
    }

    connectedCallback() {
        this.innerHTML = `
        <div class="header">
            <span id="menu-icon" onclick="openNav()">&#9776;</span>
            <h2 id="header-title">Shwe Kan Kaw</h2>
            <div class="dropdown">
            <img src="../img/profile.jpg" class="img-profile">
                <div class="dropdown-content">
                    <a href="signin.html">Sign Out</a>
                </div>
            </div>
        </div>
        <div id="mySidenav" class="sidenav">
            <a href="javascript:void(0)" class="closebtn" onclick="closeNav()">&times;</a>
            <a href="index.html">Home</a>
            <a href="food_list.html">Food List</a>
            <a href="user_registration.html">Add Staffs</a>
            <a href="staff_list.html">Staffs List</a>
        </div> 
      `;
    }
}

customElements.define('header-component', Header);

function openNav() {
    document.getElementById("mySidenav").style.width = "300px";
    document.getElementById("main").style.marginLeft = "300px";
    document.getElementById("header-title").style.marginLeft = "300px";
    document.getElementById("menu-icon").style.marginLeft = "300px";
    document.getElementById("dashboard-container").style.marginLeft = "auto";
}

function closeNav() {
    document.getElementById("mySidenav").style.width = "0";
    document.getElementById("main").style.marginLeft = "0";
    document.getElementById("header-title").style.marginLeft = "0";
    document.getElementById("menu-icon").style.marginLeft = "0";
    document.getElementById("dashboard-container").style.marginLeft = "auto";
}