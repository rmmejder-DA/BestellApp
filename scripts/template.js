
function render() {
    let menuContentRef = document.getElementById('MenuContent');
    let menuheader = document.getElementById('menu-header');
    let basket = document.getElementById('basket');
    let ratingElement = document.getElementById('rateStar');
    let basketOpen = document.getElementById('basketOpen');
    
    if (menuheader) {
        menuheader.innerHTML =
            `<span class="basket_cart"></span>
        <span class="basket_cart"></span>
        <span class="basket_cart"></span>`;
    }
    updateCart();
    if (ratingElement) {
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
    }
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
        <button onclick="Payment()" class="payment-button">Pay</button>
        </footer>
        </div>`;
    }
    updateCart();   
    if (basketOpen) {
        basketOpen.innerHTML = basket.innerHTML;
    }
        updateCart();

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
                    <div class="button-container">
                    <button onclick="addToCart(${i}, ${j}, this)" class="add-to-cart-button">Add</button>
                    <button onclick ="removeFromCart(${menu[i].items[j].id})" class="remove-from-cart-button">&#128465;</button>
                    </div>
                </div>`;
            }
            menuHTML += `</div></div>`;
        }
        menuContentRef.innerHTML = menuHTML;
    }
}

function updateCart() {
    let cartCount = document.getElementById('cart-count');
    let basketCount = document.getElementById('basketCount');
    
    if (cartCount) {
        cartCount.style.display = cart.length > 0 ? 'block' : 'none';
        cartCount.textContent = cart.length;
    }

    if (basketCount) {
        basketCount.style.display = cart.length > 0 ? 'block' : 'none';
        basketCount.textContent = cart.length;
    }

    let cartItems = document.getElementById('cart-items');
    let totalPrice = 0;
    if (!cartItems) return;
    let itemMap = new Map();
    cart.forEach(item => {
        if (itemMap.has(item.id)) {
            itemMap.get(item.id).count++;
        } else {
            itemMap.set(item.id, { item: item, count: 1 });
        }
        totalPrice += item.price;
    });
    removeAllBtn();
    checkCartEmpty();
    if (cartItems) {
        let cartItemsHTML = '';
        itemMap.forEach(entry => {
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
    let totalPriceEl = document.getElementById('total-price');
    if (totalPriceEl) totalPriceEl.textContent = `Total ${totalPrice.toFixed(2)} €`;
}
