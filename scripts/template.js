function openCart() {
    let cartSection = document.getElementById('shoppingcartsection');

    if (cartSection.style.display === 'none' || cartSection.style.display === '') {
        cartSection.style.display = 'block';
    } else {
        cartSection.style.display = 'none';
    }
}

function removeAll() {
    cart = [];
    let AddToCartButton = document.querySelectorAll('.add-to-cart-button');

    AddToCartButton.forEach(button => {
        button.textContent = "In den Warenkorb";
    });
    updateCart();
}

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
                    <b>Leckere Möglichkeiten zu entspannen</b>`
    shoppingCart.innerHTML =
        `<span class="basket_cart" id="cart-count">0</span>
        <img class="shoppingcartimage" src="./assets/image/shoppingcar.png" alt="Warenkorb Icon">
                `;

    cartSection.innerHTML =
        `<div class="basketPay">
        <header class="basket_header">
        <h2>Warenkorb</h2>
        </header>
        <div id="cart_empty" class="cart-empty"></div>
        <div id="cart-items" class="cart-items"></div>
        <footer class="basket_footer">
        <div class="total-removeall">
        <h3 id="total-price">Gesamtpreis: 0,00 €</h3>
        <button onclick="removeAll()" class="remove-all-button">Alles entfernen</button>
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

function setupStarRating() {
    let stars = document.querySelectorAll('.star');
    let output = document.getElementById('rating-output');
    let savedRating = localStorage.getItem('burgerHausRating');

    if (savedRating) {
        let rating = parseInt(savedRating);
        for (let i = 0; i < rating; i++) {
            stars[i].classList.add('active');
        }
        output.textContent = `Rating: ${rating}/5`;
    }

    stars.forEach((star, index) => {
        star.addEventListener('click', () => {
            // Reset all stars
            stars.forEach(s => s.classList.remove('active'));

            // Highlight selected stars
            for (let i = 0; i <= index; i++) {
                stars[i].classList.add('active');
            }

            // Update rating output
            const rating = index + 1;
            output.textContent = `Rating: ${rating}/5`;
            saveRate(rating);
        });
    });
}

function addToCart(categoryIndex, itemIndex, button) {
    let selectedItem = menu[categoryIndex].items[itemIndex];
    if (button) {
        button.textContent = "Hinzugefügt!";
    }
    if (selectedItem && selectedItem.id) {
        cart.push(selectedItem);
        updateCart();
    }
}
function addCart(itemId) {
    let item = cart.find(cartItem => cartItem.id === itemId);
    if (item) {
        cart.push(item);
        updateCart();
    }
}
function removeFromCart(itemId) {
    let index = cart.findIndex(item => item.id === itemId);
    if (index !== -1) {
        cart.splice(index, 1);
    }
    if (cart.length === 0) {
        let AddToCartButton = document.querySelectorAll('.add-to-cart-button');
        AddToCartButton.forEach(button => {
            button.textContent = "In den Warenkorb";
        });
    }
    updateCart();
}

function updateCart() {
    let cartEmpty = document.getElementById('cart_empty');
    if (cartEmpty) {
        if (cart.length === 0) {
            cartEmpty.innerHTML = `<b>Ihr Warenkorb ist leer</b>`;
        } else {
            cartEmpty.innerHTML = ``;
        }
    }
    let cartCount = document.getElementById('cart-count');
    cartCount.style.display = cart.length > 0 ? 'block' : 'none';
    if (cartCount) cartCount.textContent = cart.length;

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

    if (cartItems) {
        let cartItemsHTML = '';
        itemMap.forEach(entry => {
            cartItemsHTML += `<div class="cartall">

            <p>${entry.item.name} - € ${entry.item.price.toFixed(2)}</p>
            <div class="cart-buttons">
            <button class="remove-button" onclick="addCart(${entry.item.id})">+</button>
                        <b class="cart-count">${entry.count}x</b>
            <button class="remove-button" onclick="removeFromCart(${entry.item.id})">-</button>  
            </div>        
    
            </div>`;
        });
        cartItems.innerHTML = cartItemsHTML;
    }

    let totalPriceEl = document.getElementById('total-price');
    if (totalPriceEl) totalPriceEl.textContent = `Gesamtpreis: ${totalPrice.toFixed(2)} €`;
}

function Payment() {
    if (cart.length === 0) {
        alert("Ihr Warenkorb ist leer.");
        return;
    }
    alert("Vielen Dank für Ihre Bestellung! Ihre Zahlung wurde erfolgreich verarbeitet.");
    cart = [];
    updateCart();
}
function ratingDeineObjektID(rating) {
    let ratingElement = document.getElementById('rating');
    rating = Math.max(0, Math.min(5, rating));

    if (ratingElement) {
        let stars = '★'.repeat(rating) + '☆'.repeat(5 - rating);

        ratingElement.style.color = 'gold';
        ratingElement.innerHTML = `${stars} <div class='Rate'>(${rating} von 5 Sternen)</div>`;
    }
}

function saveRate(rating) {
    localStorage.setItem('burgerHausRating', rating);
}

window.onload = function () {
    render();
};

