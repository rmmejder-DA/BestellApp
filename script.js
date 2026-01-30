
function openCart() {
    const popup = document.getElementById('basketOpen');
    const openBtn = document.getElementById('openBtn');
    let closePopupHandler;
    let closeOnEscapeHandler;
    if (popup) {
        popup.innerHTML = basket.innerHTML;
        updateCart();
    }
    // Öffnet das Popup
    openBtn.addEventListener('click', (event) => {
        popup.style.display = 'block';
        event.stopPropagation(); // Verhindert, dass der Klick sofort wieder schließt
    });

    // Klick außerhalb erkennen
    closePopupHandler = (event) => {
        if (!popup.contains(event.target)) {
            disappear(popup, 300, 0, 300);
        }
    };
    document.addEventListener('click', closePopupHandler);

    // Optional: ESC-Taste zum Schließen
    closeOnEscapeHandler = (event) => {
        if (event.key === 'Escape') {
            disappear(popup, 300, 0, 300);
        }
    };
    document.addEventListener('keydown', closeOnEscapeHandler);
    appear(popup, 300, 300, 0);
}

function disappear(element, duration, translateXStart, translateXEnd) {
    element.style.transition = `transform ${duration}ms ease-in, opacity ${duration}ms ease-in`;
    element.style.transform = `translateX(${translateXStart}px)`;
    element.style.opacity = '1';
    requestAnimationFrame(() => {
        element.style.transform = `translateX(${translateXEnd}px)`;
        element.style.opacity = '0';
    });
    setTimeout(() => {
        element.style.display = 'none';
    }, duration);
    updateCart();
}

function appear(element, duration, translateXStart, translateXEnd) {
    element.style.transition = `transform ${duration}ms ease-out, opacity ${duration}ms ease-out`;
    element.style.transform = `translateX(${translateXStart}px)`;
    element.style.opacity = '0';
    requestAnimationFrame(() => {
        element.style.transform = `translateX(${translateXEnd}px)`;
        element.style.opacity = '1';
    });
    updateCart();
}

function ratingDeineObjektID(rating) {
    let ratingElement = document.getElementById('rating');
    rating = Math.max(0, Math.min(5, rating));

    if (ratingElement) {
        let stars = '★'.repeat(rating) + '☆'.repeat(5 - rating);

        ratingElement.style.color = 'gold';
        ratingElement.textContent = stars;
        let rateDiv = document.createElement('div');
        rateDiv.className = 'Rate';
        rateDiv.textContent = `(${rating} von 5 Sternen)`;
        ratingElement.appendChild(rateDiv);
    }
}

function saveRate(rating) {
    localStorage.setItem('burgerHausRating', rating);
}

function checkCartEmpty() {// Warenkorb leer
    let cartEmptyElement = document.getElementById('cart_empty');

    if (!cartEmptyElement) return;

    cartEmptyElement.textContent = '';

    if (cart.length === 0) {
        cartEmptyElement.textContent = "Warenkorb ist leer";
        return;
    }
}

function Payment() {
    let orderontheway = document.getElementById('order');
    let cartEmptyElement = document.getElementById('cart_empty');
    
    if (cartEmptyElement) {
        cartEmptyElement.innerHTML = ``;
    }
    if (cart.length === 0) {
        if (cartEmptyElement) {
            cartEmptyElement.innerHTML = "Bitte fügen Sie Artikel hinzu, bevor Sie zur Kasse gehen.";
            setTimeout(() => {
                cartEmptyElement.innerHTML = 'Warenkorb ist leer';
            }, 5000);
        }
        return;
    }
    
    if (orderontheway) {
        cartEmptyElement.style.display = 'none';
        orderontheway.innerHTML = `<h2>Vielen Dank für Ihre Bestellung!</h2>
        <img class="thankyouimage" src="./assets/image/BestellungUnterwegs.png" alt="Thank You Image">
        <p>Ihre Zahlung wurde erfolgreich verarbeitet</p>
        <p>Ihre Bestellung ist unterwegs und wird in Kürze bei Ihnen eintreffen.</p>`;
        setTimeout(() => {
            orderontheway.innerHTML = '';
            cartEmptyElement.style.display = 'block';
            cartEmptyElement.innerHTML = 'Warenkorb ist leer';
        }, 3000);
        updateCart();
    }
    cart = [];

    let AddToCartButton = document.querySelectorAll('.add-to-cart-button');

    AddToCartButton.forEach(button => {
        button.textContent = "Add";
    });
    updateCart();
}

function removeAll() {// Entfernt alle Elemente aus dem Warenkorb
    cart = [];
    let AddToCartButton = document.querySelectorAll('.add-to-cart-button');

    AddToCartButton.forEach(button => {
        button.textContent = "Add";
    });
    updateCart();
}

function addToCart(categoryIndex, itemIndex, button) {// Fügt ein Element zum Warenkorb hinzu
    let selectedItem = menu[categoryIndex].items[itemIndex];

    let count = cart.filter(item => item.id === selectedItem.id).length + 1;

    if (button) {
        button.innerHTML = `<b class="cart-count">${count}x</b>`;
    }
    if (basketCount) {
        basketCount.innerHTML = `<b class="cart-count">${count}x</b>`;
    }
    if (selectedItem && selectedItem.id) {
        cart.push(selectedItem);
        updateCart();
    }
}

function addCart(itemId) {// Fügt ein Element zum Warenkorb basierend auf der ID hinzu
    let item = null;
    for (let i = 0; i < menu.length; i++) {// Durchläuft alle Kategorien im Menü
        for (let j = 0; j < menu[i].items.length; j++) {
            if (menu[i].items[j].id === itemId) {
                item = menu[i].items[j];
            }
        }
        if (item) break;// Wenn das Element gefunden wurde, breche die äußere Schleife ab
    }
    if (item) {// Wenn das Element gefunden wurde, füge es dem Warenkorb hinzu
        cart.push(item);
    }
    updateCart();
}

function removeFromCart(itemId) {// Entfernt ein Element aus dem Warenkorb basierend auf der ID
    let index = cart.findIndex(item => item.id === itemId);//
    let button = document.querySelector(`.add-to-cart-button[onclick="addToCart(${Math.floor((itemId - 1) / 4)}, ${(itemId - 1) % 4}, this)"]`);

    if (button) {
        let count = cart.filter(item => item.id === itemId).length - 1;
        if (count > 0) {
            button.innerHTML = `<b class="cart-count">${count}x</b>`;
        }
        else {
            button.textContent = "Add";
        }
    }
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

    if (!output || stars.length === 0) return;

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