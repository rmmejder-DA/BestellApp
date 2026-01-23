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

function Payment() {
    if (cart.length === 0) {
        alert("Ihr Warenkorb ist leer.");
        return;
    }
    alert("Vielen Dank für Ihre Bestellung! Ihre Zahlung wurde erfolgreich verarbeitet.");
    cart = [];
    updateCart();
    let AddToCartButton = document.querySelectorAll('.add-to-cart-button');

    AddToCartButton.forEach(button => {
        button.textContent = "In den Warenkorb";
    });
}

function removeAll() {
    cart = [];
    let AddToCartButton = document.querySelectorAll('.add-to-cart-button');

    AddToCartButton.forEach(button => {
        button.textContent = "In den Warenkorb";
    });
    updateCart();
}

function addToCart(categoryIndex, itemIndex, button) {
    let selectedItem = menu[categoryIndex].items[itemIndex];

    if (button) {
        button.textContent = "Hinzugefügt!";
    }
    if (selectedItem && selectedItem.id) {
        cart.push(selectedItem);
        updateCart();
    };
}

function addCart(itemId) {
    let item = null;
    for (let i = 0; i < menu.length; i++) {
        for (let j = 0; j < menu[i].items.length; j++) {
            if (menu[i].items[j].id === itemId) {
                item = menu[i].items[j];
            }
        }
        if (item) break;// Wenn das Element gefunden wurde, breche die äußere Schleife ab
    }
    if (item) {// Wenn das Element gefunden wurde, füge es dem Warenkorb hinzu
        cart.push(item);
        updateCart();
    }
}

function removeFromCart(itemId) {
    let index = cart.findIndex(item => item.id === itemId);//
    if (index !== -1) {
        cart.splice(index, 1);// Entferne das Element aus dem Warenkorb
    }
    if (cart.length === 0) {// Wenn der Warenkorb leer ist, setze alle "In den Warenkorb" Buttons zurück
        let AddToCartButton = document.querySelectorAll('.add-to-cart-button');
        AddToCartButton.forEach(button => {
            button.textContent = "In den Warenkorb";
        });
    }
    updateCart();
}

function openCart() {
    let cartSection = document.getElementById('shoppingcartsection');

    if (cartSection.style.display === 'none' || cartSection.style.display === '') {
        cartSection.style.display = 'block';
    } else {
        cartSection.style.display = 'none';
    }
    
    // Animationsfunktion für das Erscheinen des Warenkorbs
    let appear = (element, duration, translateXStart, translateXEnd) => {
        element.style.transition = `transform ${duration}ms ease-out, opacity ${duration}ms ease-out`;
        element.style.transform = `translateX(${translateXStart}px)`;
        element.style.opacity = '0';
        requestAnimationFrame(() => {
            element.style.transform = `translateX(${translateXEnd}px)`;
            element.style.opacity = '1';
        }
        );
    }
    appear(document.getElementById('shoppingcartsection'), 500, 1000, 0);// Beispielwerte für Dauer und Y-Translation
}

function closedCart() {
    let cartSection = document.getElementById('shoppingcartsection');
    cartSection.addEventListener('click', (event) => {
        if (event.target === cartSection) {
            cartSection.style.display = 'none';
        }

    });
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

function updateCart() {
    let cartEmpty = document.getElementById('cart_empty');// Warenkorb leer
    if (cartEmpty) {
        if (cart.length === 0) {
            cartEmpty.innerHTML = `<p class="cart-empty">Ihr Warenkorb ist leer</p>`;
        } else {
            cartEmpty.innerHTML = ``;
        }
    }
    let cartCount = document.getElementById('cart-count');// Warenkorb Anzahl
    if (cartCount) {
        cartCount.style.display = cart.length > 0 ? 'block' : 'none';
        cartCount.textContent = cart.length;
    }

    let cartItems = document.getElementById('cart-items');// Warenkorb Artikel
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
    let removeAllButton = document.getElementById('remove-all-button');// Alles entfernen Button
    if (removeAllButton) {
        if (cart.length === 0) {
            removeAllButton.style.display = 'none';
        } else {
            removeAllButton.style.display = 'block';
        }
    }

    if (cartItems) {// Warenkorb Artikel anzeigen
        BasketUpdate();
}

function BasketUpdate() {
        let cartItemsHTML = '';
        itemMap.forEach(entry => {
            cartItemsHTML += `<div class="cartall">
            <p>${entry.item.name} - € ${entry.item.price.toFixed(2)}</p>
            <div class="cart-buttons">
            <button class="add-button" onclick="addCart(${entry.item.id})">&#x2795;</button>
                        <b class="cart-count">${entry.count}x</b>
            <button class="remove-button" onclick="removeFromCart(${entry.item.id})">&#x2796;</button>  
            </div></div>`;});
        cartItems.innerHTML = cartItemsHTML;// Ende Warenkorb Artikel anzeigen
    }
    let totalPriceEl = document.getElementById('total-price');
    if (totalPriceEl) totalPriceEl.textContent = `Gesamtpreis: ${totalPrice.toFixed(2)} €`;
}


function openCart() {
    let cartSection = document.getElementById('shoppingcartsection');

    if (cartSection.style.display === 'none' || cartSection.style.display === '') {
        cartSection.style.display = 'block';
    } else {
        cartSection.style.display = 'none';
    }
    let appear = (element, duration, translateXStart, translateXEnd) => {    // Animationsfunktion für das Erscheinen des Warenkorbs
        element.style.transition = `transform ${duration}ms ease-out, opacity ${duration}ms ease-out`;
        element.style.transform = `translateX(${translateXStart}px)`;
        element.style.opacity = '0';
        requestAnimationFrame(() => {
            element.style.transform = `translateX(${translateXEnd}px)`;
            element.style.opacity = '1';});
    }
    appear(document.getElementById('shoppingcartsection'), 500, 1000, 0);// Beispielwerte für Dauer und Y-Translation
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
    stars.forEach((star, index) => {// Fügt jedem Stern einen Klick-Event-Listener hinzu
        star.addEventListener('click', () => {
            // Reset all stars
            stars.forEach(s => s.classList.remove('active'));
            for (let i = 0; i <= index; i++) {
                stars[i].classList.add('active');
            }
            const rating = index + 1;
            output.textContent = `Rating: ${rating}/5`;
            saveRate(rating);
        });
    });
}

function updateCart() {
    let cartEmpty = document.getElementById('cart_empty');// Warenkorb leer
    if (cartEmpty) {
        if (cart.length === 0) {
            cartEmpty.innerHTML = `<p class="cart-empty">Ihr Warenkorb ist leer</p>`;
        } else {
            cartEmpty.innerHTML = ``;
        }
    }
    let cartCount = document.getElementById('cart-count');// Warenkorb Anzahl
    if (cartCount) {
        cartCount.style.display = cart.length > 0 ? 'block' : 'none';
        cartCount.textContent = cart.length;
    }
    let cartItems = document.getElementById('cart-items');// Warenkorb Artikel
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
    removeAllBtn ();// Alles entfernen Button
    if (cartItems) {// Warenkorb Artikel anzeigen
        let cartItemsHTML = '';
        itemMap.forEach(entry => {
            cartItemsHTML += 
            `<div class="cartall">
            <p>${entry.item.name} - € ${entry.item.price.toFixed(2)}</p>
            <div class="cart-buttons">
            <button class="add-button" onclick="addCart(${entry.item.id})">&#x2795;</button>
                        <b class="cart-count">${entry.count}x</b>
            <button class="remove-button" onclick="removeFromCart(${entry.item.id})">&#x2796;</button>  
            </div></div>`;
        });
        cartItems.innerHTML = cartItemsHTML;// Ende Warenkorb Artikel anzeigen
    }
    let totalPriceEl = document.getElementById('total-price');
    if (totalPriceEl) totalPriceEl.textContent = `Gesamtpreis: ${totalPrice.toFixed(2)} €`;
}
function removeAllBtn() {
        let removeAllButton = document.getElementById('remove-all-button');// Alles entfernen Button
    if (removeAllButton) {
        if (cart.length === 0) {
            removeAllButton.style.display = 'none';
        } else {
            removeAllButton.style.display = 'block';
        }
    }
}