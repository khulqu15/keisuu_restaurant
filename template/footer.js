class Footer extends HTMLElement {
    constructor() {
        super();
    }

    connectedCallback() {
        this.innerHTML = `
        <footer class="footer">
        <div class="language language-selector">
            <div id="languageToggle" class="div-wrapper">
                <div class="nav-text-wrapper-11">Language</div>
            </div>
            <div id="languageOptions" class="language-options">
                <a href="/en" class="lan1">EN</a>
                <a href="/jp" class="lan2">JP</a>
                <a href="/mm" class="lan3">MM</a>
            </div>
        </div>

        <div class="call">
            <div class="div-wrapper">
                <div class="nav-text-wrapper-12">Call</div>
            </div>
        </div>

        <div class="search">
            <a href="checkout.html">
            <div class="div-wrapper">
                <div class="nav-text-wrapper-13">Check-out</div>
            </div>
            </a>
        </div>

        <div class="overlap-group-wrapper">
            <a href="index.html">
                <div class="div-wrapper">
                    <div class="nav-text-wrapper-14">Menu</div>
                </div>
            </a>
        </div>
        </footer>
      `;
    }
}

customElements.define('footer-component', Footer);

// Elements
var languageOptions = document.getElementById('languageOptions');
var languageToggle = document.getElementById('languageToggle');

/*/ Search bar toggle
var searchBar = document.getElementById('search-bar');
var searchToggle = document.getElementById('search-toggle');
        <div id="search-bar" style="display: none;">
            <input type="text" placeholder="Search...">
            <a href="search.html">
                <button class="search-btn">Find</button>
            </a>
        </div>
        
searchToggle.addEventListener('click', function(event) {
    event.preventDefault();
    searchBar.style.display = searchBar.style.display === 'block' ? 'none' : 'block';

    // Close language options if open
    if (languageOptions.style.display === 'block') {
        languageOptions.style.display = 'none';
    }

    event.stopPropagation();
});

// Prevent the search bar from closing when clicking inside it
searchBar.addEventListener('click', function(event) {
    event.stopPropagation();
});
*/
// Language toggle
languageToggle.addEventListener('click', function (event) {
    languageOptions.style.display = languageOptions.style.display === 'block' ? 'none' : 'block';

    /*/ Close search bar if open
    if (searchBar.style.display === 'block') {
        searchBar.style.display = 'none';
    }*/

    event.stopPropagation();
});

// Prevent clicks within the language dropdown from closing it
languageOptions.addEventListener('click', function (event) {
    event.stopPropagation();
});

// Clicking outside either the search bar or language options will close them
window.onclick = function (event) {
    if (!event.target.matches('#languageToggle')) {
        //if (searchBar.style.display === 'block') {
            //searchBar.style.display = 'none';
        //}
        if (languageOptions.style.display === 'block') {
            languageOptions.style.display = 'none';
        }
    }
};