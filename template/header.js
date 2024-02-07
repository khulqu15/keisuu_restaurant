class Header extends HTMLElement {
    constructor() {
        super();
    }

    connectedCallback() {
        this.innerHTML = `
        <img class="announcement" src="img/announcement.png" alt="Announcement"/>
        <header class="header">
            <div class="overlap-4">
                <div class="site-title">Shwe Kan Kaw</div>
                <a href="food_cart.html">
                    <div class="div-2">
                        <div class="text-check-out">Food Cart</div>
                        <img class="ic-shopping-cart" src="img/ic-shopping-cart-24px.svg" />
                    </div>
                </a>
            </div>
        </header>
      `;
    }
}

customElements.define('header-component', Header);
