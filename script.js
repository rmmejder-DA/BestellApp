function openCart() {
    const popup = document.getElementById('basketOpen');
    const openBtn = document.getElementById('openBtn');
    if (popup) {
        popup.innerHTML = basket.innerHTML;
        updateCart();
    }
    openBtn.addEventListener('click', (event) => {
        popup.style.display = 'block';
        document.body.classList.add('noscroll');
        event.stopPropagation(); // Verhindert, dass der Klick sofort wieder schließt
    });
    Handler();
    appear(popup, 300, 300, 0);
}

function Handler() {
    let closePopupHandler;
    let clickOver;
    let popup = document.getElementById('basketOpen');
    closePopupHandler = (event) => {
        if (!popup.contains(event.target)) {
            disappear(popup, 300, 0, 300);
            document.body.classList.remove('noscroll'); // Scrollen wieder aktivieren
        }
    };
    document.addEventListener('click', closePopupHandler);
    clickOver = () => {
        if (popup.style.display === 'none') {
            document.removeEventListener('click', closePopupHandler);
            document.removeEventListener('click', clickOver);
        }
    };
    document.addEventListener('click', clickOver);
}

function closeBasket() {
    const popup = document.getElementById('basketOpen');
    popup.addEventListener('click', (event) => {
        event.stopPropagation(); // Verhindert, dass der Klick das Popup schließt
    }
    );
    document.body.classList.remove('noscroll'); // Scrollen wieder aktivieren
    disappear(popup, 300, 0, 300);
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

function checkCartEmpty() {
    let cartEmptyElement = document.getElementById('cart_empty');
    if (!cartEmptyElement) return;
    cartEmptyElement.textContent = '';
    if (cart.length === 0) {
        cartEmptyElement.textContent = "Warenkorb ist leer";
        return;
    }
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
    let selectedItem = menu[categoryIndex].items[itemIndex];// 
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

function addCart(itemId) {
    let item = null;
    for (let i = 0; i < menu.length; i++) {
        for (let j = 0; j < menu[i].items.length; j++) {
            if (menu[i].items[j].id === itemId) {
                item = menu[i].items[j];
            }
        }
        if (item) break;
    }
    if (item) {
        cart.push(item);
    }
    updateCart();
}

function removeFromCart(itemId) {
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
        cart.splice(index, 1);
    }
    if (cart.length === 0) {
        let AddToCartButton = document.querySelectorAll('.add-to-cart-button');
        AddToCartButton.forEach(button => {
            button.textContent = "Add";
        });
    }
    updateCart();
}

function removeAllBtn() {
    let removeAllButton = document.getElementById('remove-all-button');
    if (removeAllButton) {
        if (cart.length === 0) {
            removeAllButton.style.display = 'none';
        } else {
            removeAllButton.style.display = 'block';
        }
    }
}

function removeOneItem(itemId) {
    let removeButton = document.getElementById(`remove-one-item-${itemId}`);
    let AddToCartButton = document.querySelectorAll('.add-to-cart-button');
    cart = cart.filter(item => item.id !== itemId);
    if (removeButton) {
        removeButton.style.display = 'none';
    } else {
        AddToCartButton.forEach(button => {
            button.textContent = "Add";
        });
    }
    updateCart();
    removeFromCart(itemId);
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

function processOrder() {
    let orderontheway = document.getElementById('order');
    let cartEmptyElement = document.getElementById('cart_empty');
    let cartItemsElement = document.getElementById('cart-items');
    if (orderontheway && cartItemsElement && cartEmptyElement) {
        cartItemsElement.style.display = 'none';
        cartEmptyElement.style.display = 'none';
        orderontheway.style.display = 'flex';
        cartItemsElement.innerHTML = '';
    }
}

function BtnUpdate() {
    cart = [];
    let AddToCartButton = document.querySelectorAll('.add-to-cart-button');
    AddToCartButton.forEach(button => {
        button.textContent = "Add";
    });
    updateCart();
}

function OrderRenderPayMent() {
    let cartEmptyElement = document.getElementById('cart_empty');
    if (cartEmptyElement) {
        cartEmptyElement.innerHTML = ``;}
    if (cart.length === 0) {
        if (cartEmptyElement) {
            cartEmptyElement.innerHTML = "Bitte fügen Sie Artikel hinzu, bevor Sie zur Kasse gehen.";
            setTimeout(() => {
                cartEmptyElement.innerHTML = 'Warenkorb ist leer';
            }, 3000);
        }return;
    }
    processOrder();
    removeAllBtn();
    completeOrder();
    removeAll();
}

function cartandbasketcount() {
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
}

function TotalPrice() {
    let totalPriceEl = document.getElementById('total-price');
    let totalPrice = 0;

    cart.forEach(item => {
        totalPrice += item.price;
    });
    if (totalPriceEl) totalPriceEl.textContent = `Total ${totalPrice.toFixed(2)} €`;
}