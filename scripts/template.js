function menuItemTemplate(item, index) {
    return `<div class="${item.category.toLowerCase()}-headline">
            <div class="headline-menu-item">
            <img class="headline-image" src="${imagePath}${item.Icon}" alt="${item.name}">
            <h2>${item.category}</h2>
            </div>
        </div>
    <div class="spacer">
    <div class="menu-item">
    <div class="menu-item-content">
        <h3>${item.name}</h3>
        <img class="menu-item-image" src="${imagePath}${item.image}" alt="${item.name}">
                <span class="price">€ ${item.price}</span>
    </div>
        <p>${item.Beschreibung}</p>
    <div class="menu-item-buttons">
        <button class="add-to-cart" id="add-to-cart-${index}" onclick="addToCart(${index})">
        <p id="menuCount${index}" class="menucount">ADD</p>
        </button>
        <button class="remove-from-cart" id="remove-from-cart-${index}" onclick="minus(${item.id})">🗑</button>
    </div>

    </div>
    </div>`;
}
function dialogTemplate() {
    return `<section class="dialogsection">
                <header class="basket_header">
                    <button class="close-basket-button" onclick="closeBasket()">✖</button>
                    <h2>Warenkorb</h2>
                </header>
                    <div id="cart-empty-dialog" class="cart-empty">Warenkorb ist leer</div>
                    <div id="cart-items-dialog" class="cart-items"></div>
                <footer class="basket_footer">
                    <div class="total-removeall">
                        <h3 id="total-price-dialog">Total 0.00 €</h3>
                        <button type="button" onclick="removeAll()" class="remove-all-button" id="remove-all-button-dialog">Remove</button>
                    </div>
                    <button type="button" id="PayBtn-dialog" onclick="pay()" class="payment-button">Pay</button>
                </footer>
            </section>`;
}

function basketTemplate() {
    return `<div class="basketPay">
            <header class="basket_header">
                <h2>Warenkorb</h2>
            </header>
                <div id="cart_empty" class="cart-empty">Warenkorb ist leer</div>
                <div id="cart-items" class="cart-items"></div>
            <footer class="basket_footer">
                <div class="total-removeall">
                <h3 id="total-price">Total 0.00 €</h3>
                <button type="button" onclick="removeAll()" class="remove-all-button" id="remove-all-button">Remove</button>
                </div>
                <button type="button" id="Payment" onclick="pay()" class="payment-button">Pay</button>
            </footer>
            </div>`;
}

function cartItemsTemplate(item) {
    return `<div class="cart-item">
                <div class="remove-quantity">
                <button onclick="removeOneItem(${item.id})" class="remove-one-button">X</button>
                <p>${item.quantity}x</p>
                </div>
                <p>${item.name}</p>
            <div id="BtnBasket" class="BtnBasket">
                <p>€ ${item.price}</p>
                <button onclick="plus(${item.id})">+</button>
                <button onclick="minus(${item.id})">🗑</button>
            </div>
            </div>`;
}

function cartItemsDialogTemplate(item) {
    return `<div class="cart-item">
                <div class="remove-quantity">
                <button onclick="removeOneItem(${item.id})" class="remove-one-button">X</button>
                <p>${item.quantity}x</p>
                </div>
                <p>${item.name}</p>
            <div id="BtnBasket" class="BtnBasket">
                <p>€ ${item.price}</p>
            <button onclick="plus(${item.id})">+</button>
            <button onclick="minus(${item.id})">🗑</button>
            </div>
            </div>`;
}