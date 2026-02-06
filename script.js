function FoodStore() {
    let basket = document.getElementById("basket");
    basket.innerHTML += basketTemplate();

    let dialogContainer = document.getElementById("dialog");
    dialogContainer.innerHTML += dialogTemplate();

    let menuContainer = document.getElementById("menuContainer");
    menuContainer.innerHTML = "";
    for (let i = 0; i < menu.length; i++) {
        menuContainer.innerHTML += menuItemTemplate(menu[i], i);
    }
    setupStarRating();
}

function Pay() {
    cart = []; // Leeren des Warenkorbs
    let ThankYou = document.getElementById("ThankYou");
    if (ThankYou) {
        ThankYou.style.display = "block";
    }
    menu.filter(item => {// Alle Artikel im Menü durchgehen
        updateMenuCount(item.id);// Aktualisieren der Anzeige für jedes Menüelement
    });
    updateCartCount();
    closeBasket();
    updateCartUI();
    dialogUpdate();
}

function BtnUpdate(index) {
    let BtnUpdate = document.getElementById(`menuCount${index}`);
    if (cart.length === 0) {
        BtnUpdate.textContent = "";
    } else {
        BtnUpdate.textContent = "ADD";
    }
}

function plus(id) {
    let cartItem = cart.find(item => item.id === id);
    if (cartItem) {
        cartItem.quantity += 1;
        updateCartCount();
        updateCartUI();
        dialogUpdate();
        updateMenuCount(id);
    }
}

function minus(id) {
    let cartItem = cart.find(item => item.id === id);
    if (cartItem) {
        cartItem.quantity -= 1;
        if (cartItem.quantity <= 0) {
            cart = cart.filter(item => item.id !== id);
        }
        updateCartCount();
        updateCartUI();
        dialogUpdate();
        updateMenuCount(id);
    }
}

function addToCart(index) {
    let item = menu[index];
    let cartItem = cart.find(ci => ci.id === item.id);
    if (cartItem) {
        cartItem.quantity += 1;
    } else {
        cart.push({ ...item, quantity: 1 });
    }
    updateCartCount();
    updateCartUI();
    dialogUpdate();
    updateMenuCount(item.id);
}

function updateCartCount() {
    let totalQuantity = cart.reduce((total, item) => total + item.quantity, 0);
    let cartCount = document.getElementById("basketCount");
    if (cartCount) {
        cartCount.textContent = totalQuantity;
        cart.length > 0 ? cartCount.style.display = "block" : cartCount.style.display = "none";
    }
}

function updateMenuCount(id) {
    let menuItem = menu.find(item => item.id === id);
    if (!menuItem) return;
    let menuIndex = menu.indexOf(menuItem);
    let menuCountElement = document.getElementById(`menuCount${menuIndex}`);
    let cartItem = cart.find(ci => ci.id === id);
    if (menuCountElement) {
        menuCountElement.textContent = `${cartItem ? cartItem.quantity : ''}`;
    }
}

function removeAll() {
    cart = [];
    menu.forEach(item => {
        updateMenuCount(item.id);
    });
    updateCartCount();
    updateCartUI();
    dialogUpdate();
}

function updateCartUI() {
    let totalPriceElement = document.getElementById("total-price");
    let totalPrice = 0;
    cart.findIndex(item => {
        totalPrice += item.price * item.quantity;
    });
    ElementCartNone();
    totalPriceElement.textContent = `Total ${totalPrice.toFixed(2)} €`;
}

function ElementCartNone() {
    let cartItemsContainer = document.getElementById("cart-items");
    let cartEmptyMessage = document.getElementById("cart_empty");
    let removeAllButton = document.getElementById("remove-all-button");
    cartItemsContainer.innerHTML = "";
    if (cart.length === 0) {
        cartEmptyMessage.style.display = "block";
        removeAllButton.style.display = "none";
        document.getElementById("Payment").disabled = true;
        document.getElementById("Payment").style.cursor = "not-allowed";
    } else {
        cartEmptyMessage.style.display = "none";
        removeAllButton.style.display = "inline-block";
        document.getElementById("Payment").disabled = false;
        document.getElementById("Payment").style.cursor = "pointer";
        cart.forEach(item => {
            cartItemsContainer.innerHTML += cartItemsTemplate(item);
        });
    }
}

function dialogUpdate() {
    let totalPriceDialog = document.getElementById("total-price-dialog");
    let totalPrice = 0;
    cart.findIndex(item => {// Alle Artikel im Warenkorb durchgehen
        totalPrice += item.price * item.quantity;
    });
    ElementDialogNone();
    totalPriceDialog.textContent = `Total ${totalPrice.toFixed(2)} €`;
}

function ElementDialogNone() {
    let cartItemsDialog = document.getElementById("cart-items-dialog");
    let cartEmptyDialog = document.getElementById("cart-empty-dialog");
    let removeAllDialog = document.getElementById("remove-all-button-dialog");
    cartItemsDialog.innerHTML = "";
    if (cart.length === 0) {
        cartEmptyDialog.style.display = "block";
        removeAllDialog.style.display = "none";
        document.getElementById("PayBtn-dialog").disabled = true;
        document.getElementById("PayBtn-dialog").style.cursor = "unset";
    }
    else {
        cartEmptyDialog.style.display = "none";
        removeAllDialog.style.display = "inline-block";
        document.getElementById("PayBtn-dialog").disabled = false;
        document.getElementById("PayBtn-dialog").style.cursor = "pointer";
        cart.forEach(item => {
            cartItemsDialog.innerHTML += cartItemsDialogTemplate(item);
        });
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
    starsaktiv();
}

function starsaktiv() {
    let stars = document.querySelectorAll('.star');
    let output = document.getElementById('rating-output');
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
    rating = Math.max(0, Math.min(5, rating || 0));
    if (ratingElement) {
        let stars = '★'.repeat(rating) + '☆'.repeat(5 - rating);
        ratingElement.style.color = 'gold';
        ratingElement.textContent = stars + ` (${rating} von 5 Sternen)`;
    }
}

function saveRate(rating) {
    localStorage.setItem('burgerHausRating', rating);
}

function openDialog() {
    const dialog = document.getElementById("dialog");
    if (dialog && typeof dialog.showModal === "function") {
        dialog.showModal();
    }
    dialogUpdate();
}

function ThankYouclosed() {
    let ThankYou = document.getElementById("ThankYou");
    ThankYou.style.display = "none";
    updateCartUI();
    dialogUpdate();
}

function closeBasket() {
    let basket = document.getElementById("dialog");
    if (basket && typeof basket.close === "function") {
        basket.close();
    }
    dialogUpdate();
}