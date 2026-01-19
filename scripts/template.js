let burger = {
    "name": "Burger",
    "items": [
        { "id": 1, "image": "SmokeBurger.jpg", "name": "Classic Burger", "price": 5.99 },
        { "id": 2, "image": "CheeseBurger.jpg", "name": "Cheese Burger", "price": 6.49 },
        { "id": 3, "image": "BaconBurger.jpg", "name": "Bacon Burger", "price": 6.99 },
        { "id": 4, "image": "DoubleBurger.jpg", "name": "Double Burger", "price": 7.49 }
    ]
};

let pizza = {
    "name": "Pizza",
    "items": [
        { "id": 5, "image": "Margherita.png", "name": "Margherita", "price": 4.99 },
        { "id": 6, "image": "Pepperoni.png", "name": "Pepperoni", "price": 5.99 },
        { "id": 7, "image": "Vegetarian.png", "name": "Vegetarian", "price": 5.49 },
        { "id": 8, "image": "BBQChicken.png", "name": "BBQ Chicken", "price": 6.49 }
    ]
};

let salad = {
    "name": "Salad",
    "items": [
        { "id": 9, "image": "CaesarSalad.png", "name": "Caesar Salad", "price": 4.99 },
        { "id": 10, "image": "GreekSalad.png", "name": "Greek Salad", "price": 5.49 },
        { "id": 11, "image": "GardenSalad.png", "name": "Garden Salad", "price": 4.49 },
        { "id": 12, "image": "CobbSalad.png", "name": "Cobb Salad", "price": 6.99 }
    ]
};

let imgAssetsPath = "./assets/image/";

let menu = [burger, pizza, salad];

function render() {
    let menuContentRef = document.getElementById('MenuContent');
    if (menuContentRef) {
        menuContentRef.innerHTML = "";
        for (let i = 0; i < menu.length; i++) {
            menuContentRef.innerHTML += `<div class="${menu[i].name.toLowerCase()}">
                <div class="${menu[i].name.toLowerCase()}small">
                    <div class="maxwidth1440">
                        <img class="${menu[i].name.toLowerCase()}SmallImage" src="${imgAssetsPath}${menu[i].name}Icon.png" alt="${menu[i].name}Icon">
                        <h2>${menu[i].name}</h2>
                    </div>
                </div>
                <div id="${menu[i].name.toLowerCase()}-content">`;
            for (let j = 0; j < menu[i].items.length; j++) {
                menuContentRef.innerHTML += `<div class="menu-item">
                    <img class="burger-content-image" src="${imgAssetsPath}${menu[i].items[j].image}" alt="${menu[i].items[j].name}">
                    <span>${menu[i].items[j].name}</span>
                    <span>$${menu[i].items[j].price.toFixed(2)}</span>
                    <span onclick="addToCart(${i}, ${j})" class="add-to-cart-button">In den Warenkorb</span>
                </div>`;
            }
            menuContentRef.innerHTML += `</div></div>`;
        }
    }
}
let cart = [];

function addToCart(categoryIndex, itemIndex) {
    let selectedItem = menu[categoryIndex].items[itemIndex];
    cart.push(selectedItem);
    updateCart();
}
function removeFromCart(itemId) {
    let index = cart.findIndex(item => item.id === itemId);
    if (index !== -1) {
        cart.splice(index, 1);
    }
    updateCart();
}

function updateCart() {
    let cartItems = document.getElementById('cart-items');
    let shoppingCart = document.getElementById('shopping-cart');
    let totalPrice = 0;
    
    if (!cartItems && !shoppingCart) return;
    
    if (cart.length === 0) {
        if (cartItems) cartItems.innerHTML = '<p>Ihr Warenkorb ist leer.</p>';
        if (shoppingCart) shoppingCart.innerHTML = '';
        let totalPriceEl = document.getElementById('total-price');
        if (totalPriceEl) totalPriceEl.textContent = 'Gesamtpreis: 0,00 €';
        return;
    }
    
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
        cartItems.innerHTML = '<p>Guten Appetit</p>';
        itemMap.forEach(entry => {
            cartItems.innerHTML += `<div class="book-in-cart">
            <b>${entry.count}x</b>
            <p>${entry.item.name} - €${entry.item.price}</p>
            <button class="remove-button" onclick="removeFromCart(${entry.item.id})">x</button>
            </div>`;
        });
    }
    
    if (shoppingCart) {
        shoppingCart.innerHTML = '';
        itemMap.forEach(entry => {
            shoppingCart.innerHTML += `<div class="cart-item">
            <span>${entry.count}x ${entry.item.name}</span>
            <span>$${entry.item.price.toFixed(2)}</span>
            <span class="remove-from-cart-button" onclick="removeFromCart(${entry.item.id})">X</span>
            </div>`;
        });
    }
    
    let totalPriceEl = document.getElementById('total-price');
    if (totalPriceEl) totalPriceEl.textContent = `Gesamtpreis: ${totalPrice.toFixed(2)} €`;
}

function Payment() {
    
    alert("Vielen Dank für Ihre Bestellung! Ihre Zahlung wurde erfolgreich verarbeitet.");
    cart = [];
    updateCart();
}