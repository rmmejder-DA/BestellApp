function foodStore() {
    const basket = document.getElementById("basket");
    basket.innerHTML += basketTemplate();
    const dialogContainer = document.getElementById("dialog");
    dialogContainer.innerHTML += dialogTemplate();
    const menuContainer = document.getElementById("menuContainer");
    menuContainer.innerHTML = "";
    foodStoreUpdate();
}

function foodStoreUpdate() {
    for (let i = 0; i < menu.length; i++) {
        const item = menu[i];
        if (item.category && item.Icon && item.id && !item.name) {
            menuContainer.innerHTML += categoryHeadlineTemplate(item.category, item.Icon);
        } else if (item.name) {
            menuContainer.innerHTML += menuItemTemplate(item, i);
        }
    }
    Update();
}

function Update() {
    setupStarRating();
    updateCartCount();
    closeBasket();
    updatePrice();
    dialogUpdate();
}

function pay() {
    cart = []; // Leeren des Warenkorbs
    const ThankYou = document.getElementById("ThankYou");
    if (ThankYou) {
        ThankYou.style.display = "block";
    }
    menu.filter(item => {// Alle Artikel im Menü durchgehen
        updateMenuCount(item.name);// Aktualisieren der Anzeige für jedes Menüelement
    });
    elementDialogNone();
    updateCartCount();
    updatePrice();
    dialogUpdate();
    closeBasket();
}

function plus(id) {
    let cartItem = cart.find(item => item.id === id);// Suchen des Artikels im Warenkorb anhand der ID
    if (cartItem) {
        cartItem.quantity += 1;
        if (cartItem.quantity <= 0) {
            cart = cart.filter(item => item.id !== id);
        }
    }
    updateMenuCount(menu[id].name);
    elementDialogNone();
    updateCartCount();
    updatePrice();
    dialogUpdate();
}

function minus(id) {
    let cartItem = cart.find(item => item.id === id);// Suchen des Artikels im Warenkorb anhand der ID
    if (cartItem) {
        cartItem.quantity -= 1;
        if (cartItem.quantity <= 0) {
            cart = cart.filter(item => item.id !== id);
        }
    }
    updateMenuCount(menu[id].name);
    elementDialogNone();
    updateCartCount();
    updatePrice();
    dialogUpdate();
}

function addToCart(index) {
    let item = menu[index];// Sucht das Menüelement basierend auf dem Index
    let cartItem = cart.find(cartItem => cartItem.name === item.name);
    if (cartItem) {
        cartItem.quantity += 1;
    } else {
        cart.push({ name: item.name, price: item.price, quantity: 1, id: index });
    }
    updateCartCount();
    updatePrice();
    dialogUpdate();
    updateMenuCount(item.name);
}

function updateCartCount() {
    let totalQuantity = 0;
    const cartCount = document.getElementById("basketCount");
    cart.filter(item => {
        totalQuantity += item.quantity;
    });
    if (cartCount == null) return;
    cartCount.textContent = totalQuantity;
    cartCount.style.display = totalQuantity > 0 ? "block" : "none";
}

function updateMenuCount(itemName) {
    const menuItem = menu.find(item => item.name === itemName);// Sucht das Menüelement basierend auf dem Namen
    if (!menuItem) return;// Wenn kein Menüelement gefunden wird, Funktion verlassen
    let menuIndex = menu.indexOf(menuItem);// Findet den Index des Menüelements im Menü-Array
    let menuCountElement = document.getElementById(`menuCount${menuIndex}`);//
    let cartItem = cart.find(cartItem => cartItem.name === itemName);// Sucht das entsprechende Element im Warenkorb basierend auf dem Namen
    if (menuCountElement) {
        //stackoverflow gefunden, um die Anzahl der Artikel im Menü anzuzeigen oder "ADD" wenn keine Artikel im Warenkorb sind //
        menuCountElement.textContent = `${cartItem ? cartItem.quantity : 'ADD'}`;
    }
}

function removeAll() {
    cart = []; // Leeren des Warenkorbs
    menu.filter(item => {
        updateMenuCount(item.name);// Aktualisieren der Anzeige für jedes Menüelement
    });
    updateCartCount();
    updatePrice();
    dialogUpdate();
}

function updatePrice() {
    let totalPriceElement = document.getElementById("total-price");
    let totalPrice = 0;
    cart.filter(item => {// Alle Artikel im Warenkorb durchgehen
        totalPrice += item.price * item.quantity;
    });
    elementCartNone();
    totalPriceElement.textContent = `Total ${totalPrice.toFixed(2)} €`;
}

function elementCartNone() {
    let cartItemsContainer = document.getElementById("cart-items");
    const cartEmptyMessage = document.getElementById("cart_empty");
    const removeAllButton = document.getElementById("remove-all-button");
    cartItemsContainer.innerHTML = "";
    if (cart.length === 0) {
        cartEmptyMessage.style.display = "block";
        removeAllButton.style.display = "none";
        document.getElementById("Payment").disabled = true;
        document.getElementById("Payment").style.cursor = "not-allowed";
    } else {
        ifElseBasket();
    }
}

function ifElseBasket() {
    const cartEmptyMessage = document.getElementById("cart_empty");
    const removeAllButton = document.getElementById("remove-all-button");
    let cartItemsContainer = document.getElementById("cart-items");
    cartEmptyMessage.style.display = "none";
    removeAllButton.style.display = "inline-block";
    document.getElementById("Payment").disabled = false;
    document.getElementById("Payment").style.cursor = "pointer";
    cart.findIndex(item => {
        cartItemsContainer.innerHTML += cartItemsTemplate(item);
    });
}

function dialogUpdate() {
    let totalPriceDialog = document.getElementById("total-price-dialog");
    let totalPrice = 0;
    cart.forEach(item => {// Alle Artikel im Warenkorb durchgehen
        totalPrice += item.price * item.quantity;
    });
    elementDialogNone();
    totalPriceDialog.textContent = `Total ${totalPrice.toFixed(2)} €`;
}

function elementDialogNone() {
    const cartItemsDialog = document.getElementById("cart-items-dialog");
    const cartEmptyDialog = document.getElementById("cart-empty-dialog");
    const removeAllDialog = document.getElementById("remove-all-button-dialog");
    cartItemsDialog.innerHTML = "";
    if (cart.length === 0) {
        cartEmptyDialog.style.display = "block";
        removeAllDialog.style.display = "none";
        document.getElementById("PayBtn-dialog").disabled = true;
        document.getElementById("PayBtn-dialog").style.cursor = "unset";
    }
    else {
        ifElseDialog();
    }
}

function ifElseDialog() {
    const cartEmptyDialog = document.getElementById("cart-empty-dialog");
    const removeAllDialog = document.getElementById("remove-all-button-dialog");
    let cartItemsDialog = document.getElementById("cart-items-dialog");
    cartEmptyDialog.style.display = "none";
    removeAllDialog.style.display = "inline-block";
    document.getElementById("PayBtn-dialog").disabled = false;
    document.getElementById("PayBtn-dialog").style.cursor = "pointer";
    cart.findIndex(item => {
        cartItemsDialog.innerHTML += cartItemsDialogTemplate(item);
    });
}
//Stars Bewertung im Internet gefunden
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

function ratingObjektID(rating) {
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

function thankYouclosed() {
    const ThankYou = document.getElementById("ThankYou");
    ThankYou.style.display = "none";
    dialogUpdate();
}

function closeBasket() {
    const basket = document.getElementById("dialog");
    if (basket && typeof basket.close === "function") {
        basket.close();
    }
    dialogUpdate();
}

function removeOneItem(itemId) {
    cart = cart.filter(item => item.id !== itemId);// Entfernt den Artikel mit der angegebenen ID aus dem Warenkorb
    updateMenuCount(menu[itemId].name);
    updateCartCount();
    updatePrice();
    dialogUpdate();
}