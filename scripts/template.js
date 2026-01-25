
function render() {
    let menuContentRef = document.getElementById('MenuContent');
    let shoppingCart = document.getElementById('shopping-cart-open');
    let cartSection = document.getElementById('shoppingcartsection');
    let ratingElement = document.getElementById('rateStar');
    if (!ratingElement || !shoppingCart || !cartSection) return;

    ratingElement.innerHTML = `
                <h1>BurgerHaus</h1>
                    <div class="stars">
                        <span class="star" data-value="1">★</span>
                        <span class="star" data-value="2">★</span>
                        <span class="star" data-value="3">★</span>
                        <span class="star" data-value="4">★</span>
                        <span class="star" data-value="5">★</span>
                    </div>
                        <i id="rating-output">Rating: 0/5</i>
                    <b>Comfort Food</b>`;
    shoppingCart.innerHTML =
        `<span class="basket_cart" id="cart-count">0</span>
        <img class="shoppingcartimage" src="./assets/image/shoppingcar.png" alt="Warenkorb Icon">`;

    cartSection.innerHTML =
        `<div class="basketPay">
        <header class="basket_header">
        <h2>Warenkorb</h2>
        <button onclick="closeCart()" class="close-cart-button" id="close-cart-button">&#10005;</button>
        </header>
        <div id="cart_empty" class="cart-empty"></div>
        <div id="order" class="order"></div>
        <div id="cart-items" class="cart-items"></div>
        <footer class="basket_footer">
        <div class="total-removeall">
        <h3 id="total-price">Gesamtpreis: 0,00 €</h3>
        <button onclick="removeAll()" class="remove-all-button" id="remove-all-button">Alles entfernen</button>
        </div>
        <button onclick="Payment()" class="payment-button">Pay</button>
        </footer>
        </div>`;
    updateCart();
    setupStarRating();
    if (menuContentRef) {
        let menuHTML = "";
        for (let i = 0; i < menu.length; i++) {
            menuHTML += `<div class="${menu[i].name.toLowerCase()}">
                <div class="${menu[i].name.toLowerCase()}small">
                    <div class="maxwidth1440">
                        <img class="${menu[i].name.toLowerCase()}SmallImage" src="${imgAssetsPath}${menu[i].name}Icon.png" alt="${menu[i].name}Icon">
                        <h2>${menu[i].name}</h2>
                    </div>
                </div>
                <div class="allContent" id="${menu[i].name.toLowerCase()}-content">`;

            for (let j = 0; j < menu[i].items.length; j++) {
                menuHTML +=
                    `<div class="menu-item">
                    <div class="overlay">
                    <img class="burger-content-image" src="${imgAssetsPath}${menu[i].items[j].image}" alt="${menu[i].items[j].name}">
                    <span>${menu[i].items[j].name}</span><span class="price"> € ${menu[i].items[j].price.toFixed(2)}</span>
                    </div>
                    <i class="description-text" id="description">${menu[i].items[j].Beschreibung || ''}</i>
                    <button onclick="addToCart(${i}, ${j}, this)" class="add-to-cart-button">In den Warenkorb</button>
                </div>`;
            }
            menuHTML += `</div></div>`;
        }
        menuContentRef.innerHTML = menuHTML;
    }
}