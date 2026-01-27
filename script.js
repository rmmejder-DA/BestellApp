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
function checkCartEmpty() {// Warenkorb leer
    let cartEmptyElement = document.getElementById('cart_empty');

    cartEmptyElement.innerHTML = ``;
    if (cart.length === 0) {
        cartEmptyElement.innerHTML = "Warenkorb ist leer";
        return;
    }
}
function Payment() {
    let orderontheway = document.getElementById('order');
    let cartEmptyElement = document.getElementById('cart_empty');
    cartEmptyElement.innerHTML = ``;
    if (cart.length === 0) {
        cartEmptyElement.innerHTML = "Ihr Warenkorb ist leer. Bitte fügen Sie Artikel hinzu, bevor Sie zur Kasse gehen.";
        setTimeout(() => {
            cartEmptyElement.innerHTML = ``;
        }, 5000);
        return;
    }
    if (orderontheway) {
        orderontheway.innerHTML = `<h2>Vielen Dank für Ihre Bestellung!</h2>
        <img class="thankyouimage" src="./assets/image/BestellungUnterwegs.png" alt="Thank You Image">
        <p>Ihre Zahlung wurde erfolgreich verarbeitet</p>
        <p>Ihre Bestellung ist unterwegs und wird in Kürze bei Ihnen eintreffen.</p>`;
        setTimeout(() => {
            orderontheway.innerHTML = '';
        }, 3000);

    } 
    cart = [];

    let AddToCartButton = document.querySelectorAll('.add-to-cart-button');

    AddToCartButton.forEach(button => {
        button.textContent = "Add";
    });
    updateCart();
}
function updateCart() {
    let cartCount = document.getElementById('cart-count');
    if (cartCount) {
        cartCount.style.display = cart.length > 0 ? 'block' : 'none';
        cartCount.textContent = cart.length;
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
function removeAll() {
    cart = [];
    let AddToCartButton = document.querySelectorAll('.add-to-cart-button');

    AddToCartButton.forEach(button => {
        button.textContent = "Add";
    });
    updateCart();
}
function addToCart(categoryIndex, itemIndex, button) {
    let selectedItem = menu[categoryIndex].items[itemIndex];
    if (button) {
        button.innerHTML = `<p class="added">Added</p>`;
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
            button.textContent = "Add";
        });
    }
    updateCart();
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

