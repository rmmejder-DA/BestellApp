
function render() {
    let menuContentRef = document.getElementById('MenuContent');
    let basket = document.getElementById('basket');
    let basketOpen = document.getElementById('basketOpen');

    setupStarRating();
    updateCart();
    if (basket) {
        basket.innerHTML =
            `<div class="basketPay">
        <header class="basket_header">
        <button class="close-basket-button" onclick="closeBasket()">&#10006;</button>
        <h2>Warenkorb</h2>
        </header>
        <div id="cart_empty" class="cart-empty"></div>
        <div id="order" class="order"></div>
        <div id="cart-items" class="cart-items"></div>
        <footer class="basket_footer">
        <div class="total-removeall">
        <h3 id="total-price">0,00 €</h3>
        <button onclick="removeAll()" class="remove-all-button" id="remove-all-button">Remove</button>
        </div>
        <button onclick="OrderRenderPayMent()" class="payment-button">Pay</button>
        </footer>
        </div>`;
    }
    updateCart();
    TotalPrice();
    if (basketOpen) {
        basketOpen.innerHTML = basket.innerHTML;
    }
    updateCart();

    if (menuContentRef) {
        let menuHTML = "";
        for (let i = 0; i < menu.length; i++) {
            menuHTML += `
                    <div class="${menu[i].name}Header">
                    <div class="line">
                        <img class="${menu[i].name}SmallImage" src="${imgAssetsPath}${menu[i].name}Icon.png" alt="${menu[i].name}Icon">
                        <h2>${menu[i].name}</h2>
                        </div>
                    </div>`;

            for (let j = 0; j < menu[i].items.length; j++) {
                menuHTML +=
                    `<div class="spacer">
                    <div class="menu-item">
                    <div class="overlay">
                    <img class="burger-content-image" src="${imgAssetsPath}${menu[i].items[j].image}" alt="${menu[i].items[j].name}">
                    <span>${menu[i].items[j].name}</span>
                    <span class="price"> € ${menu[i].items[j].price.toFixed(2)}</span>
                    </div>
                    <i class="description-text" id="description">${menu[i].items[j].Beschreibung || ''}</i>
                    <div class="button-container">
                    <button onclick="addToCart(${i}, ${j}, this)" class="add-to-cart-button">Add</button>
                    <button onclick ="removeFromCart(${menu[i].items[j].id})" class="remove-from-cart-button">&#128465;</button>
                    </div>
                    </div>
                </div>`;
            }
        }
        menuContentRef.innerHTML = menuHTML;
    }
}

function updateCart() {
    cartandbasketcount();
    let cartItems = document.getElementById('cart-items');
    if (!cartItems) return;
    removeAllBtn();
    checkCartEmpty();
    let itemMap = new Map();// Map um einzigartige Items und deren Anzahl zu speichern
    cart.forEach((item) => {
        if (itemMap.has(item.id)) {//.has checkt ob der key existiert
            itemMap.get(item.id).count += 1;//.get gibt den value des keys zurück
        } else {
            itemMap.set(item.id, { item: item, count: 1 });
        }
    });
    TotalPrice();
    if (cartItems) {
        let cartItemsHTML = '';
        itemMap.forEach((entry) => {
            cartItemsHTML +=
            `<div class="cartall">
            <button class="cart-item-remove" id="remove-one-item-${entry.item.id}" onclick="removeOneItem(${entry.item.id})">&#128465;</button>
            <p>${entry.item.name} - € ${entry.item.price.toFixed(2)}</p>

            <div class="cart-buttons">
            <button class="add-button" onclick="addCart(${entry.item.id})">&#x2795;</button>
                        <b class="cart-count">${entry.count}x</b>
            <button class="remove-button" onclick="removeFromCart(${entry.item.id})">&#x2796;</button>  
            </div></div>`;
        });
        cartItems.innerHTML = cartItemsHTML;
    }
}

function completeOrder() {
    let cartItemsElement = document.getElementById('cart-items');
    let cartEmptyElement = document.getElementById('cart_empty');
    let orderontheway = document.getElementById('order');

    if (orderontheway) {
        orderontheway.innerHTML = `<h2>Vielen Dank für Ihre Bestellung!</h2>
        <img class="thankyouimage" src="./assets/image/BestellungUnterwegs.png" alt="Thank You Image">
        <p>Ihre Zahlung wurde erfolgreich verarbeitet</p>
        <p>Ihre Bestellung ist unterwegs und wird in Kürze bei Ihnen eintreffen.</p>`;
        setTimeout(() => {
            cartItemsElement.style.display = 'block';
            orderontheway.style.display = 'none';
            cartEmptyElement.style.display = 'block';
            cartEmptyElement.innerHTML = 'Warenkorb ist leer';
        }, 5000);
        updateCart();
    }
}


