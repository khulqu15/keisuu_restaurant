class Footer extends HTMLElement {
    constructor() {
        super();
    }
    connectedCallback() {
        this.innerHTML = `
        <footer class="footer">
        <div class="language language-selector">
            <div id="languageToggle" class="div-wrapper">
                <div class="nav-text-wrapper-11" id="language-footer">Language</div>
            </div>
            <div id="languageOptions" class="language-options">
                <a href="#" onclick="changeLang('en')" class="lan1">EN</a>
                <a href="#" onclick="changeLang('ja')" class="lan2">JP</a>
                <a href="#" onclick="changeLang('mm')" class="lan3">MM</a>
            </div>
        </div>

        <div class="call">
            <div class="div-wrapper">
                <div class="nav-text-wrapper-12" id="call-footer">Call</div>
            </div>
        </div>

        <div class="search">
            <a href="checkout.html">
            <div class="div-wrapper">
                <div class="nav-text-wrapper-13" id="checkout-footer">Check-out</div>
            </div>
            </a>
        </div>

        <div class="overlap-group-wrapper">
            <a href="index.html">
                <div class="div-wrapper">
                    <div class="nav-text-wrapper-14" id="menu-footer">Menu</div>
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

function changeLang(lang) {
    sessionStorage.setItem('language', lang)
    window.location.reload()
}

fetch(domain_enpoint+'/api/admin/translation/', {
    headers: {
        'Accept': 'application/json'
    }
})
.then((response) => { return response.json() })
.then((data) => {
    let menu_footer = document.getElementById('menu-footer')
    let checkout_footer = document.getElementById('checkout-footer')
    let language_footer = document.getElementById('language-footer')
    let call_footer = document.getElementById('call-footer')
    let table_content = document.getElementById('table-content')
    let number_of_order_content = document.getElementById('number_of_order-content')
    let add_to_order_list_content = document.getElementById('add_to_order_list-content') 
    let your_receipt_content = document.getElementById('your_receipt_content')
    let food_header = document.getElementById('food_header')
    let quantity_header = document.getElementById('quantity_header')
    let price_header = document.getElementById('price_header')
    let tax_header = document.getElementById('tax_footer')
    let total_header = document.getElementById('total_footer')

    let default_language = sessionStorage.getItem('language') || 'en'
    let languages = data.data
    if(menu_footer) menu_footer.innerHTML = default_language == 'en' ? languages[3].english : default_language == 'ja' ? languages[3].japan : languages[3].myanmar
    if(checkout_footer) checkout_footer.innerHTML = default_language == 'en' ? languages[4].english : default_language == 'ja' ? languages[4].japan : languages[4].myanmar
    if(language_footer) language_footer.innerHTML = default_language == 'en' ? languages[5].english : default_language == 'ja' ? languages[5].japan : languages[5].myanmar
    if(call_footer) call_footer.innerHTML = default_language == 'en' ? languages[6].english : default_language == 'ja' ? languages[6].japan : languages[6].myanmar
    if(table_content) table_content.innerHTML = default_language == 'en' ? languages[7].english : default_language == 'ja' ? languages[7].japan : languages[7].myanmar
    if(number_of_order_content) number_of_order_content.innerHTML = default_language == 'en' ? languages[8].english : default_language == 'ja' ? languages[8].japan : languages[8].myanmar
    if(add_to_order_list_content) add_to_order_list_content.innerHTML = default_language == 'en' ? languages[9].english : default_language == 'ja' ? languages[9].japan : languages[9].myanmar
    if(food_header) food_header.innerHTML = default_language == 'en' ? languages[1].english : default_language == 'ja' ? languages[1].japan : languages[1].myanmar
    if(quantity_header) quantity_header.innerHTML = default_language == 'en' ? languages[2].english : default_language == 'ja' ? languages[2].japan : languages[2].myanmar
    if(price_header) price_header.innerHTML = default_language == 'en' ? languages[3].english : default_language == 'ja' ? languages[3].japan : languages[3].myanmar
    if(your_receipt_content) your_receipt_content.innerHTML = default_language == 'en' ? languages[10].english : default_language == 'ja' ? languages[10].japan : languages[10].myanmar
    if(tax_header) tax_header.innerHTML = default_language == 'en' ? languages[11].english : default_language == 'ja' ? languages[11].japan : languages[11].myanmar
    if(total_header) total_header.innerHTML = default_language == 'en' ? languages[12].english : default_language == 'ja' ? languages[12].japan : languages[12].myanmar
})